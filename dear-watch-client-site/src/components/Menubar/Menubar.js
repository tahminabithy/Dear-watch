import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import icon from '../../../src/image/icon.png'
import './Menubar.css'
const Menubar = () => {
    const { user, logOut } = useAuth();
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="#home" className='icon text-info'><img src={icon} alt="" srcset="" /> Dear Watch</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link as={Link} to="/home" className='text-style'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/allwatches' className='text-style'>Collections</Nav.Link>
                        {
                            user?.email && <Nav.Link as={Link} to="/dashboard" className='text-style'>DashBoard</Nav.Link>
                        }
                        <Navbar.Text>
                            <span className='text-style ms-2'>{user?.displayName}</span>
                            {
                                user.email ? <Link to='/login'> <button onClick={logOut} className='btn btn-outline-info ms-3'><i class="fas fa-sign-out-alt me-2"></i>Log out</button></Link> : <Link to="/login"><button type="button" className="btn btn-outline-info ms-4"><i class="fas fa-sign-in-alt me-2"></i>Log In</button></Link>
                            }
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Menubar;