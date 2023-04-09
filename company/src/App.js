import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import { LOGOUT } from './actions/types';
import Home from './components/layout/home/Home'
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import SideBar from './components/layout/SideBar';
import Register from './components/auth/Register';
import ProfileForm from './components/layout/home/ProfileForm'
import Internships from './components/internships/Internships';
import InscriptionList from './components/internships/InscriptionList';
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
    <Navbar />
      <Alert />
      <SideBar />

      
      <Routes>
      
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route
          path="home"
          element={<PrivateRoute component={Home} />}
        />
      <Route
          path="create-profile"
          element={<PrivateRoute component={ProfileForm} />}
        />
        <Route
          path="edit-profile"
          element={<PrivateRoute component={ProfileForm} />}
        />
            <Route path="internships" element={<PrivateRoute component={Internships} />} />
            <Route path="internshipinscriptions/:id" element={<PrivateRoute component={InscriptionList} />} />
      </Routes>
    </Router>
  </Provider>
  );
};

export default App;
