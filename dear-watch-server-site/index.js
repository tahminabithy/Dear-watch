const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const { query } = require('express');
const port = process.env.PORT || 5000

//middle ware
app.use(cors());
app.use(express.json())

const stripe = require('stripe')(process.env.STRIPE_KEY)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0wvo3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('db connected');
        const database = client.db("DearWatch");
        const userCollection = database.collection("user");
        const productCollection = database.collection("watch")
        const orderCollection = database.collection("order")
        const reviewCollection = database.collection("reviews")
        //store watch data in database
        app.post("/watch", async (req, res) => {
            const service = req.body;
            console.log("hit the post api", service);
            const result = await productCollection.insertOne(service);
            console.log(result);
            res.json(result);
        });
        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user)
            res.json(result);

        });
        app.post('/review', async (req, res) => {
            const user = req.body;
            const result = await reviewCollection.insertOne(user)
            res.json(result);

        });
        app.get("/review", async (req, res) => {
            const result = await reviewCollection.find({}).toArray();
            res.send(result)
        })
        app.post('/order', async (req, res) => {
            const info = req.body;
            console.log(info);
            const result = await orderCollection.insertOne(info);
            console.log(result);
            res.send(result);
        })
        app.get("/order", async (req, res) => {
            const result = await orderCollection.find({}).toArray();
            res.send(result)
        })
        app.delete("/order/:id", async (req, res) => {
            id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        })
        app.delete("/watch/:id", async (req, res) => {
            id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await productCollection.deleteOne(query);
            res.send(result);
        })
        app.put('/user', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const doc = { $set: { role: 'admin' } }
            const result = await userCollection.updateOne(filter, doc)
            console.log('user updated');
            res.json(result);
        })
        app.get("/orderinfo/:email", async (req, res) => {
            const result = await orderCollection.find({ email: req.params.email }).toArray();
            console.log(result);
            res.send(result)
        })
        app.put('/order/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const updatedValue = req.body;
            const query = { _id: ObjectId(id) };
            const option = { upsert: true };
            const updateDoc = {
                $set: {
                    status: updatedValue.status
                }
            }
            const result = await orderCollection.updateOne(query, updateDoc, option)
            res.send(result)
            // console.log(updatedValue);
        })



        app.get("/user/:email", async (req, res) => {
            const result = await userCollection.findOne({ email: req.params.email })
            console.log(result);
            let isAdmin = false;
            if (result?.role === "admin") {
                isAdmin = true;
            }
            res.json({ Admin: isAdmin })
        })

        app.get("/watches", async (req, res) => {
            const result = await productCollection.find({}).toArray();
            res.send(result)
        })
        app.get('/watches/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.findOne(query);
            res.send(result)
        })
        app.get('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.findOne(query);
            res.send(result)
        })

        //payment gateway
        app.post('/create-payment-intent', async (req, res) => {
            const paymentInfo = req.body;
            const amount = paymentInfo.price * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'usd',
                amount: amount,
                payment_method_types: ['card']
            })
            res.send({
                clientSecret: paymentIntent.client_secret,
            })
        })

        //update payment info in order database
        app.put('/order/payment/:id', async (req, res) => {
            const id = req.params.id;
            const payment = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    payment: payment
                }
            }
            const result = await orderCollection.updateOne(filter, updateDoc);
            res.json(result);
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World DEAR WATCH!')
})

app.listen(port, () => {
    console.log(`DEAR WATCH listening at http://localhost:${port}`)
})
//dearWatchDbUser  7FtG5fg0EDWiyMCJ