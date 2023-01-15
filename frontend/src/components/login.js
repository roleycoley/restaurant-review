import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = props => {
  let navigate = useNavigate();

  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  // STUDY
  const handleInputChange = event => {
    // set name and value variables to form's name and value variables
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    if (user.name !== "" && user.id !== "")
    {
      props.login(user)
      navigate('/');
    }
    else
    {
      alert("Please fill out all forms.");
    }

  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group w-25">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group w-25">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

          <button onClick={login} className="btn btn-success">
            Login
          </button>

      </div>
    </div>
  );
};

export default Login;