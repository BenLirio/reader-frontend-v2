import React, { useState } from 'react'
import classes from './App.module.css'
const App = () => {
  const [filename, setFilename] = useState('')
  const handleFilenameChange = (e) => {
    const { value } = e.target
    setFilename(value)
  }
  const fileSubmit = () => {

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