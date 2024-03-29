import './App.css';
import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import { LOGOUT } from './actions/types';
import Events from './components/events/Events'
import Trainings from './components/trainings/Trainings';
import Internships from './components/internships/Internships';
import Internship from './components/internships/Internship'
import AppliedInternships from './components/internships/AppliedInternships';
import TrainingInscriptions from './components/trainings/TrainingInscriptions';
import Blocked from './components/layout/Blocked';
import EventsList from './components/events/EventsList'
import PasswordForm from './components/auth/PasswordForm'
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Training from './components/trainings/Training';



const  App = () => {
  
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
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route
          path="profile/:id"
          element={<PrivateRoute component={Profile} />} />
          <Route 
          path="passwordform"
          element={<PrivateRoute component={PasswordForm}/>} />

        <Route 
          path="events"
          element={<PrivateRoute component={Events}/>} />
        <Route
          path="trainings"
          element={<PrivateRoute component={Trainings} />} />
          <Route
          path="internships"
          element={<PrivateRoute component={Internships} />} />
        <Route 
          path="profiles" 
          element={<PrivateRoute component={Profiles} />}
          />
        <Route
          path="dashboard"
          element={<PrivateRoute component={Dashboard} />}
        />
        <Route
          path="create-profile"
          element={<PrivateRoute component={ProfileForm} />}
        />
        <Route
          path="edit-profile"
          element={<PrivateRoute component={ProfileForm} />}
        />
        <Route
          path="add-experience"
          element={<PrivateRoute component={AddExperience} />}
        />
        <Route
          path="add-education"
          element={<PrivateRoute component={AddEducation} />}
        />
        <Route path="traininginscriptions/:id" element={<PrivateRoute component={TrainingInscriptions} />} />
        <Route path="eventslist/:id" element={<PrivateRoute component={EventsList} />} />

        <Route path="appliedinternships/:id" element={<PrivateRoute component={AppliedInternships} />} />
        <Route path="posts" element={<PrivateRoute component={Posts} />} />
        <Route path="posts/:id" element={<PrivateRoute component={Post} />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="blocked" element={<Blocked />} />

        <Route path="trainings/:id" element={<PrivateRoute component={Training} />} />
        <Route path="internships/:id" element={<PrivateRoute component={Internship} />} />
      </Routes>
      
    </Router>
  </Provider>
);
};


  
  


export default App;
