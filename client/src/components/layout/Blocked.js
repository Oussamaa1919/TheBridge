import React from 'react';

const Blocked = () => {
  return (
    <section className="container">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" /> Blocked User
      </h1>
      <p className="large">Sorry, this user is blocked now!</p>
    </section>
  );
};

export default Blocked;
