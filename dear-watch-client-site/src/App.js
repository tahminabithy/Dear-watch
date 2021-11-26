import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Menubar from './components/Menubar/Menubar';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import Dashboard from './components/Dashboard/Dashboard';
import AuthProvider from './context/AuthProvider';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AllWatches from './components/AllWatches/AllWatches';
import WatchDetails from './components/WatchDetails/WatchDetails';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route exact path='/home'>
            <Home></Home>
          </Route>
          <Route path='/dashboard'>
            <Dashboard></Dashboard>
          </Route>
          <Route path='/allwatches'>
            <AllWatches></AllWatches>
          </Route>
          <PrivateRoute path='/watchDetail/:id'>
            <WatchDetails></WatchDetails>
          </PrivateRoute>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/register'>
            <Register></Register>
          </Route>
          <Route exact path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
        <Footer></Footer>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
