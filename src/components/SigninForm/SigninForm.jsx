import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import styles from '../SignupForm/SignupForm.module.css' // Assuming you use the same styles

const SigninForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
      const user = await authService.signin(formData);
      setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main className={styles.container}>
      <div className={`${styles.formBox} ${styles.signupinBox}`}>
        <h1 className={styles.title}>Log In</h1>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="username">Username:</label>
            <input
              className={styles.input}
              type="text"
              id="username"
              value={formData.username}
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
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <button className={styles.button}>Log In</button>
            <Link to="/">
              <button className={styles.button}>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SigninForm;
