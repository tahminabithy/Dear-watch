import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    const { user, isLoading, isAdmin } = useAuth();
    if (isLoading) {
        return (
            <div className='d-flex justify-content-center'>
                <div class="spinner-border text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

        )
    }
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                    user?.email && isAdmin ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/home",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};

export default AdminRoute;