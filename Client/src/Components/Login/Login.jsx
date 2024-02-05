import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from '../../styles/styles';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  console.log(password, email);

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post(`${server}/login-user`, {
      email: email,
      password: password
    },{
      withCredentials:true
    }
   
    )
      .then((res) => {
        console.log(res);
        toast.success("Login successful")
        navigate("/")
      })
      .catch((err) => {
        toast.error('Login Failed')
      });
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to Your Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                  name='email'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  placeholder="Password"
                  type={visible ? `text` : `password`}
                  autoComplete="current-password"
                  required
                  name='password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember Me
                </label>
              </div>

              <div className="text-sm">
                <a className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot Your Password
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border bg-blue-500 text-white"
              >
                Submit
              </button>
            </div>

            <div className={`${styles.normalFlex} w-full`}>
              <h4>Don't have an Account? </h4>
              <Link to="/signUp" className="text-blue-600 pl-2">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login