import React, { useRef, useState } from 'react'
import response from './response.json'
import { ImageCompressor } from 'image-compressor'
import firebaseKey from './firebase-key'
import firebase from 'firebase'

import annotate from './textAnnotation'
import textAnnotation from './textAnnotation'

const imageCompressor = new ImageCompressor()
const compressorSettings = {
  toWidth: 1024,
  toHeight: 1024,
  mimeType: 'image/png',
  mode: 'strict',
  quality: .8,
  grayScale: true,
  speed: 'low'
};
console.log('response', response.data.responses[0])

// // firebase

const app = firebase.initializeApp(firebaseKey)
// console.log('app', app)
const App = () => {

  const handleFile = async (e) => {
    const file = e.target.files[0]

    const res = await textAnnotation(file)
    console.log('res', res)


    // const ctx = rawCanvas.current.getContext("2d")
    // const img = new Image()
    // img.addEventListener("load", () => {
    //   rawCanvas.current.height = img.naturalHeight;
    //   rawCanvas.current.width = img.naturalWidth;
    //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //   ctx.drawImage(img, 0, 0)
    // })
    // img.src = dataUrl
  }
  const doStuff = () => {

  }

  return (
    <>
      <input type="file" onChange={handleFile}></input>
    </>
  )
}


export default App
