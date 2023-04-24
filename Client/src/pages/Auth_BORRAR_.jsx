import React, { useState, useEffect } from "react";
import axios from "axios";
const BACK_URL = "`${url}";

const Auth_BORRAR_ = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [register, setRegister] = useState({});
  const [data, setData] = useState({});

  function handleInputs(type, e) {
    if (type === "login") {
      setLogin({ ...login, [e.name]: e.value });
    }
  }

  function handleSubmit(type, data) {
    if (type === "login") {
      axios.post(`${BACK_URL}/auth/login`, data);
    }
  }

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${BACK_URL}/auth/token/${token}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <h2>login</h2>
        <div>
          <input
            type="text"
            name="email"
            value={login.email}
            onChange={(e) => handleInputs("login", e.target)}
          />
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={(e) => handleInputs("login", e.target)}
          />
          <button onClick={() => handleSubmit("login", login)}>enter</button>
          <br />
          <a href={`${BACK_URL}/auth/google`}>ingresar con google</a>
        </div>
      </div>
      <div>
        <h2>info</h2>
        {
          data &&
          <div>{data[0]?.email}</div>
        }
      </div>
    </>
  );
};

export default Auth_BORRAR_;
