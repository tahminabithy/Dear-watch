import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseInit from "../firebase/firebase.init";
firebaseInit();

const useFirebase = () => {
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    //google sign in 
    const loginUsingGoogle = () => {
        setIsLoading(true)
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setError('');
                console.log(user);
                setUser(user);
            }).catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            })
            .finally(() => setIsLoading(false));
    }
    //create user
    const registerUser = (email, password, displayName, location, history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password, displayName)
            .then((result) => {
                const user = result.user;
                const destination = location?.state?.from || '/home'
                history.push(destination)
                setError('');
                updateUser(displayName);
                setUser(user)
                saveToDb(email, displayName);
                console.log(user);

            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            }).finally(() => setIsLoading(false))

    }

    //log in
    const login = (email, password, location, history) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const destination = location?.state?.from || '/home'
                history.push(destination)
                setError('')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            })
            .finally(() => setIsLoading(false))

    }
    const saveToDb = (email, displayName) => {
        const userInfo = { email, displayName }
        fetch('https://obscure-lowlands-73351.herokuapp.com/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('success')
                }
            })
    }
    const updateUser = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
        })
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({});
            }
            setIsLoading(false)
        });
    }, [])

    useEffect(() => {
        fetch(`https://obscure-lowlands-73351.herokuapp.com/user/${user?.email}`)
            .then(res => res.json())
            .then(data => setIsAdmin(data.Admin))
    }, [user?.email])
    //signout
    const logOut = () => {
        setIsLoading(true)
        signOut(auth).then(() => {
            setUser({});
        }).catch((error) => {
            // An error happened.
        }).finally(() => setIsLoading(false));
    }
    return {
        user,
        isAdmin,
        isLoading,
        setIsLoading,
        error,
        login,
        setError,
        loginUsingGoogle,
        logOut,
        registerUser
    }
}
export default useFirebase;