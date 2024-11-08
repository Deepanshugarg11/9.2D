
import React, { useState } from 'react';
import Input from './Input';
import { Link } from 'react-router-dom';
import './App.css'; // Ensure this file is imported for centering
import './Signup.css';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from './utils/firebase';

const Signup = (props) => {
  const [contact, setContact] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '' 
  });


  const { displayName, email, password, confirmPassword } = contact;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((preValue) => ({
      ...preValue,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocFromAuth(user, { displayName });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('email already in use');
      } else {
        console.log('error in creating ', error.message);
      }
    }
  };

  return (
    <div className="main-content"> {/* Centers the signup box */}
      <div className="header-divv">
        <div className="input-group">
          <label htmlFor="displayName">Name</label>
          <Input
            name='displayName'
            type='text'
            placeholder='display name'
            onChange={handleChange}
            value={contact.displayName}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <Input
            name='email'
            type='email'
            placeholder='UserEmailInput'
            onChange={handleChange}
            value={contact.email}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <Input
            name='password'
            type='password'
            placeholder='password'
            onChange={handleChange}
            value={contact.password}
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input
            name='confirmPassword'
            type='password'
            placeholder='confirm password'
            onChange={handleChange}
            value={contact.confirmPassword}
          />
        </div>
        <button onClick={handleSubmit}>
          Create
        </button>
        <br />
        <br />
        <div className='login-link'> 
        <Link to='/login'>
          Login
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
