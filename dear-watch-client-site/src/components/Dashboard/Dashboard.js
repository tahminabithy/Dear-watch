import { dividerClasses } from '@mui/material';
import React from 'react';
import { Container, Form, FormControl, Nav, Navbar, NavDropdown, Offcanvas, Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import useAuth from '../../Hooks/useAuth';
import AddProducts from '../addProducts/AddProducts';
import AdminRoute from '../AdminRoute/AdminRoute';
import DashboardHome from '../DashboardHome/DashboardHome';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import ManageOrders from '../ManageOrders/ManageOrders';
import ManageProducts from '../ManageProducts/ManageProducts';
import MyOrder from '../MyOrder/MyOrder';
import Payment from '../Payment/Payment';
import Review from '../Review/Review';
import icon from '../../../src/image/icon.png'
import './Dashboard.css'


const Dashboard = () => {
    const { user, logOut, isAdmin } = useAuth();
    let { path, url } = useRouteMatch();
    return (
        <div>
            <Navbar bg="dark" expand={false}>
                <Container fluid>
                    <Navbar.Brand className='text-style icon text-info' href="#"><img src={icon} alt="" srcset="" />Dear Watch</Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" className='bg-secondary text-info' />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                        className='bg-dark'
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className='text-info text-style ' id="offcanvasNavbarLabel">Dear Watch</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link as={Link} to={`${url}`} className='text-style ms-3'>Dashboard</Nav.Link>
                                <Nav.Link as={Link} to="/home" className='text-style ms-3'>Home</Nav.Link>
                                {
                                    isAdmin ? <div>
                                        <Nav.Link as={Link} to={`${url}/manageorders`} className='text-style ms-3'>Manage All Orders</Nav.Link>
                                        <Nav.Link as={Link} to={`${url}/addproducts`} className='text-style ms-3'>Add Products</Nav.Link>
                                        <Nav.Link as={Link} to={`${url}/manageproducts`} className='text-style ms-3'>Manage Products</Nav.Link>
                                        <Nav.Link as={Link} to={`${url}/makeAdmin`} className='text-style ms-3'>Make Admin</Nav.Link>

                                    </div> : <div>
                                        <Nav.Link as={Link} to={`${url}/myOrder`} className='text-style ms-3'>My Orders</Nav.Link>
                                        <Nav.Link as={Link} to={`${url}/review`} className='text-style ms-3'>Reviews</Nav.Link>
                                        {/* <Nav.Link as={Link} to={`${url}/pay`} className='text-style ms-3'>Payment</Nav.Link> */}
                                    </div>
                                }
                                <Link to='/login'> <button onClick={logOut} className='btn btn-outline-info mt-3 ms-3'><i class="fas fa-sign-out-alt me-2"></i>Log out</button></Link>

                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>

            </Navbar>
            <div>
                <Switch>
                    <Route exact path={path}>
                        <DashboardHome></DashboardHome>
                    </Route>
                    <AdminRoute exact path={`${path}/makeAdmin`}>
                        <MakeAdmin></MakeAdmin>
                    </AdminRoute>
                    <AdminRoute exact path={`${path}/manageproducts`}>
                        <ManageProducts></ManageProducts>
                    </AdminRoute>
                    <AdminRoute exact path={`${path}/addproducts`}>
                        <AddProducts></AddProducts>
                    </AdminRoute>
                    <AdminRoute exact path={`${path}/manageorders`}>
                        <ManageOrders></ManageOrders>
                    </AdminRoute>
                    <Route exact path={`${path}/myOrder`}>
                        <MyOrder></MyOrder>
                    </Route>
                    <Route exact path={`${path}/review`}>
                        <Review></Review>
                    </Route>
                    <Route path={`${path}/pay/:id`}>
                        <Payment></Payment>
                    </Route>
                </Switch>
            </div>

        </div>

    );
};

export default Dashboard;