import React from 'react'
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Participate } from '../../actions/event';


const EventItem = ({Participate, event:{_id,title,location,date}}) => {
  return (
    <div >
      
        <a >{title}&middot;{location}</a>
        <span>Comming in {formatDate(date)}&middot;
        
        
         <button className="btn-participate" onClick={()=>Participate(_id)}>Participate</button>  
     
         
         
         </span>
    </div>
  )
}

EventItem.propTypes = {
  Participate: PropTypes.func.isRequired,
 
};




export default connect(null, {Participate})(EventItem)
