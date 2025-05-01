import { FormEvent } from 'react';
import Navbar from '../navbar/navBar';
import styles from './report.module.css';

function Report() {
  //make post request

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = 'http://localhost:3000/employee';
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    console.log('formObject:', formObject);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formObject),
      });
      if (!res.ok) {
        throw new Error('Report submission failed!');
      }
      //* This line will clear the fields if the form is successful
      console.log(`🙈can you see this reset?`);
      event.currentTarget.reset();
    } catch (err) {
      console.error('Error in Report.handleSubmit', err);
    }
  }

  return (
    <>
      <Navbar />
      <div className={styles.reportContainer}>
        <img className={styles.logo} src="src/assets/catsnake.png" alt="dark cat snake logo" />
        <h2>Great Compliance, Valued Employee!</h2>
        <div className={styles.instructBox}>
          <p className={styles.directions}>
            We appreciate your willingness to share information on your colleagues and ensure your strict anonymity.
            <br /> Please use the key below to help fill out the form below. <br />
            <br />
          </p>
        </div>

        <table className={styles.legendTable}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Selectors</th>
              <th>Description</th>
            </tr>
          </thead>
          {/* prettier-ignore */}
          <tbody>
            <tr>
              <td><img src = "/leak.png" alt="InfoLeak" className={styles.image}></img></td>
              <td>Too Social</td>
              <td>This person talks too much and is a potential leak of information.</td>
            </tr>
            <tr>
            <td><img src = "/topsecret.png" alt="top secret" className={styles.image}></img></td>
              <td>Top Secret</td>
              <td>This person is too quiet and keeps to themself.<br /> They might have a secret agenda.</td>
            </tr>
            <tr>
            <td><img src = "/propoganda.png" alt="propaganda" className={styles.image}></img></td>
              <td>Propaganda</td>
              <td>
                This person is always spreading information to <br/>justify the cause regardless of validity of sources.
              </td>
            </tr>
          </tbody>
        </table>

        <p className={styles.directions1}>
          Type one of the Selections for Offense and rate the Severity beteween 1 - 10.
        </p>

        <form onSubmit={handleSubmit} className={styles.createForm}>
          <input className={styles.inputBox} type="text" placeholder="Reporter's Name" name="firstName" />
          <input className={styles.inputBox} type="text" placeholder="Offender's Name" name="lastName" />
          <input className={styles.inputBox} type="text" placeholder="Offense" name="role" />
          <input className={styles.inputBox} type="text" placeholder="Severity" name="age" />
          <button type="submit">Submit Colleague for Processing</button>
        </form>
      </div>
    </>
  );
}

export default Report;
