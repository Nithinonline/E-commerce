import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useActionData, useParams } from 'react-router-dom';
import { server } from '../server';

const ActivationPage = () => {

  const { activation_token } = useParams();
  const [error, setError] = useState(false)

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div 
    style={{
      width: "100%",
      height:"100vh",
      display:'flex',
      justifyContent:"center",
      alignItems:"center",
    }}>
      {error ? (
        <p>Your Token is Expired</p>
      ) : (
        <p>Your account has been created successfully</p>
      )}
    </div>
  )
}

export default ActivationPage