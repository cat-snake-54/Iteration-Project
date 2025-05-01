import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navBar.module.css';

const Navbar: React.FC = () => {
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.navRight}>
          {/* prettier-ignore */}
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/report">Report</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
