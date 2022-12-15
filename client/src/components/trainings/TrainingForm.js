import React from 'react'
import { Link } from 'react-router-dom';
const TrainingForm = () => {
  return (
    <section className='container'>
      <h1 className='large text-primary'>Let's get some information</h1>
      <small>* = required field</small>
      <form className='form'>
      <div className="form-group">
          <input
            type="text"
            placeholder="* Name & LastName"
            name="Name & LastName"           
          /> 
    </div>
          <div className="form-group">
          <input
            type="text"
            placeholder="* Email"
            name="Email"           
          />                   
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Phone"
            name="Phone"           
          />                   
        </div>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="* University"
            name="University"           
          />                   
        </div>


        <div className="form-group">
          <input
            type="text"
            placeholder="* Location"
            name="Location"           
          />                   
        </div>

        <div className="form-group">
          <select name="type" >
            <option>* Select a Training</option>
            <option value="Web Full stack JS (Node React)">Web Full stack JS (Node React)</option>
            <option value="Web Full stack(Spring Boot Angular)">Web Full stack(Spring Boot Angular)</option>
            <option value="Mobile Flutter">Mobile Flutter</option>
            
          </select>
        </div>

        <div className="form-group">
          <select name="type" >
            <option>* Select an option</option>
            <option value="Remote">Remote</option>
            <option value="Face To Face">Face To Face</option>
            
          </select>
        </div>

        <input type="submit" className="btn btn-primary my-1" />  
        <Link className="btn btn-primary my-1" to="/trainings">
          Go Back
        </Link>


      </form>
    </section>
  )
}

export default TrainingForm
