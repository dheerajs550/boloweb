import React, { useState } from 'react'
import styles from '../styles/Contact.module.css'

const contact = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [desc, setdesc] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, phone, desc) 
    const data = { name, email, phone, desc};

    fetch('http://localhost:3000/api/postcontact', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert("Thanks for contacting us")
        setphone("")
        setemail("")
        setname("")
        setdesc("")
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleChange = (e) => {
    if (e.target.name == 'phone') {
      setphone(e.target.value)
    }
    else if (e.target.name == 'email') {
      setemail(e.target.value)
    }
    else if (e.target.name == 'desc') {
      setdesc(e.target.value)
    }
    else if (e.target.name == 'name') {
      setname(e.target.value)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formlabel}>Enter your name </label>
          <input type="text" value={name} onChange={handleChange} className="form-control" id="name" name="name" aria-describedby="emailHelp" />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formlabel}> Email address</label>
          <input type="email" value={email} onChange={handleChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We well never share your email with anyone else.</div>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formlabel}>Phone</label>
          <input type="phone" value={phone} onChange={handleChange} className="form-control" id="phone" name="phone" />
        </div>
        <div class={styles.mb3}>
          <label htmlFor="desc">Elaborate your concern</label>
          <textarea className="form-control" value={desc} name="desc" onChange={handleChange} placeholder="Write your concern here" id="desc" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default contact