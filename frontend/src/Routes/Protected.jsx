import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function Protected({ children }) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status); // Assuming 'status' indicates login status
  console.log(isLoggedIn)
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn]); // Dependency array for useEffect
  return isLoggedIn ? children : null;
}

export default Protected;
