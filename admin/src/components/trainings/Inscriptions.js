import React, { useEffect,Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTraining } from '../../actions/training';
import Spinner from '../layout/Spinner';
import InscriptionItem from './InscriptionItem'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Inscriptions = ({getTraining, training:{training, loading}}) => {
  const { id } = useParams();

  useEffect(() => {
    getTraining(id);
  }, [getTraining ,id]);
  
  
  return loading || training === null ? (
    <Spinner />
  ) : (
    <Fragment >
            <div className='container-trainings'>
            <div className='main'>
          <div className='detailsinscriptions'>       
          <div className='table'>
          <div className='Header'>
        <h2>Trainings</h2>
        <Link to='/trainings'>
        <button className='btn'>Trainings</button>
        </Link>
        </div>
        {training.inscriptions.map((inscription) => (
          <InscriptionItem key={inscription._id} inscription={inscription}  />
        ))}
        </div>
       </div>
       </div>
       </div>
 

    </Fragment>
  )
}

Inscriptions.propTypes ={
 training: PropTypes.object.isRequired,
 getTraining: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  training: state.training
});
export default connect(mapStateToProps, {getTraining})(Inscriptions)
