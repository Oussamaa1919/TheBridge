import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {getEvent,addEvent} from '../../actions/events';
import { useNavigate,Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const EventForm = ({ getEvent,addEvent, events:{event}}) => {
  
 
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: event && event.title,
    description: event && event.description,
    location: event && event.location,
    date: event && event.date
  });
    const {title,location,date} = formData;
 const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
 
 return (
    <div className='container-trainings'>
    <div className='mainevent'>
    <div className="detailsevent">
      
      <div className="table">
        <div className="Header">
          <h2>Add an Event</h2>
          <small>* = required field</small>
          <Link to='/events'>
  <button className='btn'  type="button">Events</button>  
  </Link>
        </div>
        <div className="eventform">
        <form
      className="form "
      onSubmit={(e) => {
        e.preventDefault();
        addEvent(formData, navigate);
      }}
          >
            <div className='form-group'>
         
         <input type="text"
          placeholder="* Title"
          name="title"
          value={title}
          onChange={onChange}
          required
          />
        </div>

       <div className='form-group'>
         <input 
         type="text" 
         placeholder="* Location"
         name="location"
          value={location}
          onChange={onChange}
          required
         />
      </div>
  
       <div className='form-group'> 
              <input
               type="date"
                placeholder="* Date"
                name="date"
               value={date}
               onChange={onChange}
               required
                />
            </div>
       <input type="submit" className="internshipBtn" value="ADD EVENT" />
      
     </form>
     </div>
   </div>
   </div>
 
</div>
</div>
)
}

EventForm.propTypes ={
  events: PropTypes.object.isRequired,
  getEvent:PropTypes.func.isRequired,
  addEvent:PropTypes.func.isRequired,
 }
 
 const mapStateToProps = (state) => ({
  events: state.events
 });
 export default connect(mapStateToProps, {getEvent,addEvent})(EventForm)
