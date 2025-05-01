import React from 'react';
import styles from './home.module.css';
import { Link } from 'react-router-dom'; //* used Link over <a href> tag for cleaner context for navigation. (could also use Navigate onclick)

const Home: React.FC = () => {
  return (
    <div className={styles.page}>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Not-a-Dystopian-Society-Social-Credit-Score-App</h1>
        <Link to="/login">
          <img className={styles.logo} src="src/assets/catsnake_kind.png" alt="cat snake logo" />
        </Link>
        <p className={styles.tagLine}>We're pretty sure this a flawless idea with no consequences</p>
      </main>
    </div>
  );
};

export default Home;
