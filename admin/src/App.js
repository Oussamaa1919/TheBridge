
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import { LOGOUT } from './actions/types';
import Home from './components/layout/Home';
import SideBar from './components/layout/SideBar'
import Navbar from './components/layout/Navbar';
import Trainings from './components/trainings/Trainings';
import Training from './components/trainings/Training';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';




const App = () => {
  
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  
  return (
    <Provider store={store}>
    <Router>
      
      <Alert />
      <SideBar />
      <Navbar />
      <Routes>
       
      <Route path="login" element={<Login />} />
      <Route
          path="home"
          element={<PrivateRoute component={Home} />}
        />
      <Route path="trainings" element={<PrivateRoute component={Trainings} />} />
      <Route path="posts/:id" element={<PrivateRoute component={Training} />} />
      
      </Routes>
    </Router>
  </Provider>
  );
};

export default App;
