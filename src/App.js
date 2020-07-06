import React, { useState } from 'react'
import classes from './App.module.css'
import config from './config'
import axios from 'axios'
import { ImageAnnotatorClient } from '@google-cloud/vision'

// firebase
import firebaseKey from './firebase-key'
import firebase from 'firebase'

import { base64 } from 'rfc4648'
// const json = {
//   inputConfig: {
//     INPUT_CONFIG
//   },
//   features: [
//     FEATURE
//   ],
//   imageContext: {
//     IMAGE CONTEXT
//   },
//   pages: [
//     number
//   ]
// }
let start
let end
console.log('base64.stringify([1,2,3])', base64.stringify([1, 2, 3]))
const app = firebase.initializeApp(firebaseKey)
console.log('app', app)
const vision = new ImageAnnotatorClient({ auth: app.options.apiKey, fallback: true })
console.log('vision', vision)
const App = () => {
  const handleFile = async (e) => {
    start = new Date()
    const content = await toBase64(e.target.files[0])
    console.log(content.replace(/[^.]*,/, ''))
    const request = {
      image: {
        content: content.replace(/[^.]*,/, ''),
      },
      features: [
        {
          type: 'DOCUMENT_TEXT_DETECTION',
          model: 'builtin/latest'
        }
      ],
      imageContext: {

      }
    }
    axios({
      method: "POST",
      url: `https://vision.googleapis.com/v1/images:annotate?key=${app.options.apiKey}`,
      data: {
        requests: [request]
      },
    }).then((res) => {
      console.log('res', res)
      end = new Date()
      console.log(end - start)
    })
    // vision.textDetection('gs://reader-images-v2/sample.png')
  }

  return (
    <>
      <input type="file" onChange={handleFile}></input>
    </>
  )
}

export default App

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})