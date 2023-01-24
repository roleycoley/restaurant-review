import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();

  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  // STUDY
  const handleInputChange = (event) => {
    // set name and value variables to form's name and value variables
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    if (user.name !== "" && user.id !== "") {
      props.login(user);
      navigate("/");
    } else {
      alert("Please fill out all forms.");
    }
  };

  return (
    <div class="login-page">
      <div style={{ fontSize: "50px", letterSpacing: "2px", textAlign: "center" }}>
        <em>It's nice to meet you!</em>
      </div>

      <div>
        <label
          htmlFor="user"
          style={{ fontSize: "20px", letterSpacing: "1px" }}
        >
          Username
        </label>
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

      <div>
        <label htmlFor="id" style={{ fontSize: "20px", letterSpacing: "1px" }}>
          ID
        </label>
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

      <button
        onClick={login}
        style={{
          fontSize: "20px",
          padding: "6px 12px",
        }}
        className="white-button"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
