import React, { useState } from "react";
import axios from "axios";
const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:5000/login',data).then(res=>console.log(res)).catch(err=>console.log(err))
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={data.username} onChange={e=>setData({...data,username:e.target.value})}/>
      </label>
      <label>
        Password:
        <input type="password" value={data.password} onChange={e=>setData({...data,password:e.target.value})}/>
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
