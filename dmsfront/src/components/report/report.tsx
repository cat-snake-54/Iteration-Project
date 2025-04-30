import {FormEvent} from 'react'

import styles from './report.module.css'

function Report() {
//make post request

 async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const url = 'http://localhost:3000/employee';
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    console.log('formObject:', formObject);

    try{
      const res = await fetch(url, {
      method:'POST',
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(formObject)
      })
      if(!res.ok){
        throw new Error('Report submission failed!')
      }
    }
    catch(err){
      console.error('Error in Report.handleSubmit', err)
    }
  }
  

  return (
    <>
    <div className={styles.createForm}>
      <img className={styles.logo} src="src/assets/catsnake.png" alt="dark cat snake logo"/>
      <h2>Great Compliance, Valued Employee!</h2>
      <form onSubmit={handleSubmit} className='createForm'>
        <input type='text' placeholder='First Name' name = 'firstName'/>
        <input type='text' placeholder='Last Name' name = 'lastName'/>
        <input type='text' placeholder='Role' name = 'role'/>
        <input type='text' placeholder='Your Name' name = 'age'/>
        <button type='submit'>Submit Colleague for Processing</button>
      </form>
    </div>
    </>
  )
}

export default Report;