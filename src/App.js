import React, { useState } from 'react'
import classes from './App.module.css'
import config from './config'
import axios from 'axios'

// firebase
import firebaseKey from './firebase-key'

import firebase from 'firebase'

const app = firebase.initializeApp(firebaseKey)


const App = () => {
  const [filename, setFilename] = useState('')
  const handleFilenameChange = (e) => {
    const { value } = e.target
    setFilename(value)
  }
  const fileSubmit = async () => {
    const { data } = await axios({
      method: "POST",
      url: `${config.apiUrl}/analyze`,
      data: { filename }
    })
  }
  return (
    <>
      <div className={classes.root}>
        <h1>Enter file name</h1>
        <form>
          <input onChange={handleFilenameChange} value={filename} type="text" placeholder="filename" />
          <input type="button" value="go" onClick={fileSubmit} />
        </form>
      </div>
    </>
  )
}

export default App