import React from "react";

const PrivateRoute = ({ user, children }) => {
  if (user && user.auth === false) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Not Access!</h4>
        <p>You don't have permission to access this route !</p>
        <hr />
        <p className="mb-0">Please log in to see more !</p>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
