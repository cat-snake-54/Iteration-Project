import {FormEvent} from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

export default function Login() {
  const [action, setAction] = useState('Sign Up');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
      console.log(`${action} success!`, data);

      navigate('/');
    } catch (err) {
      console.error(`Error in ${action}`, err);
    }
  }

  return (
    <div className={styles.login}>
      <h1>
        Welcome, valued Employee. <br />
        {action}
      </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">{action}</button>

        <div>
          {action === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <button type="button" onClick={() => setAction('Log In')}>
                Log In
              </button>
            </p>
          ) : (
            <p>
              New here?{' '}
              <button type="button" onClick={() => setAction('Sign Up')}>
                Sign Up
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
