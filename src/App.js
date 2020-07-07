import React from 'react'
import response from './response.json'

import textAnnotation from './textAnnotation'


console.log('response', response.data.responses[0])


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

  return (
    <>
      <input type="file" onChange={handleFile}></input>
    </>
  )
}


export default App
