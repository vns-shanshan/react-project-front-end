import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import styles from './SignupForm.module.css';


const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };


  return (
    <main className={styles.container}>
      <div className={styles.formBox}>
        <h1 className={styles.title}>Sign Up</h1>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="username">Username:</label>
            <input
              className={styles.input}
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password:</label>
            <input
              className={styles.input}
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="confirm">Confirm Password:</label>
            <input
              className={styles.input}
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <button className={styles.button} disabled={isFormInvalid()}>Sign Up</button>
            <Link to="/">
              <button className={styles.button}>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};


export default SignupForm;
