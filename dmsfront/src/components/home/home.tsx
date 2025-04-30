import React from 'react';
import styles from './home.module.css';


function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Not-a-Dystopian-Society-Social-Credit-Score-App</h1>
        <a href="/report">
        <img className={styles.logo} src="src/assets/catsnake_kind.png" alt="cat snake logo"/>
        </a>
        <p className={styles.tagLine}>We're pretty sure this a flawless idea with no consequences</p>
      </main>
    </div>
  );
}

export default Home;