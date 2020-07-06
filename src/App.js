import React, { useRef, useState } from 'react'
import response from './response.json'
import { ImageCompressor } from 'image-compressor'
import firebaseKey from './firebase-key'
import firebase from 'firebase'

import annotate from './textAnnotation'

const imageCompressor = new ImageCompressor()
const compressorSettings = {
  toWidth: 1024,
  toHeight: 1024,
  mimeType: 'image/png',
  mode: 'strict',
  quality: .9,
  grayScale: true,
  speed: 'low'
};
console.log('response', response.data.responses[0])

// // firebase

const app = firebase.initializeApp(firebaseKey)
// console.log('app', app)
const App = () => {
  const [confidence, setConfidence] = useState(0)
  const rawCanvas = useRef(null)
  const compressedCanvas = useRef(null)
  const handleFile = async (e) => {
    const file = e.target.files[0]
    const dataUrl = await toBase64(file)
    const compressedUrl = await compress(dataUrl)
    const data = await annotate(compressedUrl.replace(/[^.]*,/, ''), app.options.apiKey)
    let i = 1
    let _confidence = ''
    data.data.responses[0].fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words.forEach(word => {
      _confidence = _confidence + '\n' + word.confidence
    })
    setConfidence(_confidence)
    // console.log('data', response)

    const ctx2 = compressedCanvas.current.getContext('2d')
    const ctx = rawCanvas.current.getContext("2d")
    const img = new Image()
    const img2 = new Image()
    img.addEventListener("load", () => {
      rawCanvas.current.height = img.naturalHeight;
      rawCanvas.current.width = img.naturalWidth;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, 0, 0)
    })
    img2.addEventListener('load', () => {
      compressedCanvas.current.height = img2.naturalHeight
      compressedCanvas.current.width = img2.naturalWidth
      ctx2.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx2.drawImage(img2, 0, 0)
    })
    img2.src = compressedUrl
    img.src = dataUrl
  }
  // useEffect(() => {
  //   const data = response.data.responses[0]
  //   console.log('data', data)
  // })
  const doStuff = () => {

  }

  return (
    <>
      <div>{confidence}</div>
      <input type="file" onChange={handleFile}></input>
      <button onClick={doStuff}>button</button>
      <canvas ref={rawCanvas}></canvas>
      <canvas ref={compressedCanvas}></canvas>
    </>
  )
}

const compress = (dataUrl) => {
  return new Promise((resolve, reject) => {
    try {
      imageCompressor.run(dataUrl, compressorSettings, (compressedSrc) => {
        resolve(compressedSrc)
      })
    } catch (err) {
      reject(err)
    }
  })
}
export default App
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})