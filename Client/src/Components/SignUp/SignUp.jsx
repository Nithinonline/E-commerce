import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from '../../styles/styles';
import { Link, useNavigate } from "react-router-dom"
import { RxAvatar } from "react-icons/rx"
import { server } from '../../server';
import axios from "axios"
import { toast } from 'react-toastify';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null)
    const navigate=useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const config={
            headers:{"Content-Type":"multipart/form-data"}
        };
        const newForm=new FormData();
        newForm.append('file',avatar);
        newForm.append('name',name);
        newForm.append('email',email);
        newForm.append('password',password);
        console.log(newForm)

        axios
        .post(`${server}/create-user`, newForm, config)
        .then((res)=>{
           toast.success(res.data.message)
           setName("")
           setPassword("")
           setEmail("")
           setAvatar()
        })
        .catch((err)=>{
            toast.error(err.response.data.message)

        });
    };


    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        setAvatar(file)
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register as a New User
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label 
                                id='name'
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    placeholder="Full Name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className="appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                            id='email'
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                           
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    placeholder="Password"
                                    type={visible?"text":"password"}
                                    name="password"
                                    autoComplete="current-password"
                                    required
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

                        <div>
                            <label htmlFor="avatar" className='block text-sm font-medium text-gray-700'>
                                Upload photo
                            </label>
                            <div className='mt-2 flex items-center'>
                                <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                                    {avatar ? (
                                        <img src={URL.createObjectURL(avatar)} alt="avatar"
                                            className='h-full w-full object-cover rounded-full' />
                                    ) : (
                                        <RxAvatar className='h-8 w-8' />
                                    )

                                    }
                                </span>
                                <label htmlFor="file-input" className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-md text-sm font-medium text-gray-750 bg-white hover:bg-gray-50'>
                                    <span>Upload a File</span>
                                    <input type="file" name='avatar' id='file-input' accept='.jpg, .jpeg, .png' onChange={handleFileInputChange} className='sr-only'/>
                                </label>
                            </div>
                        </div>


                        <div>
                            <button
                                type="submit"
                                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border bg-blue-500 text-white"
                            >
                                Submit
                            </button>
                        </div>

                        <div className={`${styles.normalFlex} w-full`}>
                            <h4>Already have an Account? </h4>
                            <Link to="/login" className="text-blue-600 pl-2">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;