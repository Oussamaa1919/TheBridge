
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
import Trainingform from './components/trainings/Trainingform';
import Internships from './components/internships/Internships';
import InternshipForm from './components/internships/InternshipForm';
import TrainingItem from './components/trainings/TrainingItem';
import Inscriptions from './components/trainings/Inscriptions';
import InternshipInscriptions from './components/internships/InternshipInscriptions'
import Internship from './components/internships/Internship';
import Companies from './components/companies/Companies';
import Events from './components/events/Events';
import EventFrom from './components/events/EventForm';
import InscriptionList from './components/events/InscriptionList';
import UpdateForm from './components/events/UpdateFrom';
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
      <Route path="training/:id" element={<TrainingItem />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<PrivateRoute component={Home} />} />
      <Route path="companies" element={<PrivateRoute component={Companies} />} />

      <Route path="trainings" element={<PrivateRoute component={Trainings} />} />
      <Route path="trainingform" element={<PrivateRoute component={Trainingform} />} />
      <Route path="internshipform" element={<PrivateRoute component={InternshipForm} />} />
      <Route path="internships/:id" element={<PrivateRoute component={Internship} />} />

      <Route path="trainings/:id" element={<PrivateRoute component={Training} />} />
      <Route path="inscriptions/:id" element={<PrivateRoute component={Inscriptions} />} />
      <Route path="internshipinscriptions/:id" element={<PrivateRoute component={InternshipInscriptions} />} />

      <Route path="internships" element={<PrivateRoute component={Internships} />} />
      
      <Route path="events" element={<PrivateRoute component={Events} />} />
            <Route path="participation/:id" element={<PrivateRoute component={InscriptionList} />} />
            <Route path="updateform/:id" element={<PrivateRoute component={UpdateForm} />} />
            <Route path="eventform" element={<PrivateRoute component={EventFrom} />} />
      </Routes>
    </Router>
  </Provider>
  );
};

export default App;
