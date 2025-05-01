import { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../usercontext/userContext';

import Navbar from '../navbar/navBar';
import styles from './login.module.css';

export default function Login() {
  const [action, setAction] = useState('Sign Up');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUsername: setGlobalUsername } = useUser();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = action === 'Sign Up' ? 'http://localhost:3000/signup' : 'http://localhost:3000/login';

    const body = { username, password };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`${action} failed!`);
      }
      const data = await res.json();
      window.alert('Your compliance is noted.');
      console.log(`${action} success!`, data);

      setGlobalUsername(username);
      navigate('/profile');
    } catch (err) {
      console.error(`Error in ${action}`, err);
    }
  }

  return (
    <div className={styles.login}>
      <Navbar />
      <h1>
        <span className={styles.titleWatch}>
          <img src="./watching.png" alt="watching tag" className={styles.watching} />
        </span>
        Welcome, valued Employee.
        <span className={styles.titleWatch}>
          <img src="./watching.png" alt="watching tag" className={styles.watching} />
        </span>
        <br />
        {action}
      </h1>
      {/*prettier-ignore */}
      <form onSubmit={handleSubmit}>
        <input className={styles.userName} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className={styles.password} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className={styles.btns}  type="submit">{action}</button>

        <div>
          {action === 'Sign Up' ? (
            <p className={styles.text}>
              Already have an account?{' '}
              <button className={styles.btns} type="button" onClick={() => setAction('Log In')}>
                Log In</button></p>) 
                : (<p className={styles.text}>New here?{' '}<button className={styles.btns} type="button" onClick={() => setAction('Sign Up')}>Sign Up</button></p>
          )}
        </div>
      </form>
    </div>
  );
}
