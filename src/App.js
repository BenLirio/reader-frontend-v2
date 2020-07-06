import React from 'react'
import response from './response.json'
console.log('response', response.data.responses[0])
// // firebase
// import firebaseKey from './firebase-key'
// import firebase from 'firebase'

// import annotate from './textAnnotation'

// const app = firebase.initializeApp(firebaseKey)
// console.log('app', app)
const App = () => {
  const handleFile = async (e) => {
    // const data = await annotate(e.target.files[0], app.options.apiKey)
    // console.log('data', response)
  }
  // useEffect(() => {
  //   const data = response.data.responses[0]
  //   console.log('data', data)
  // })

  return (
    <>
      <input type="file" onChange={handleFile}></input>
    </>
  )
}

export default App