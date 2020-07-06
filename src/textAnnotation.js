import axios from 'axios'
import { ImageCompressor } from 'image-compressor'
import key from './firebase-key'
const textAnnotation = async (file) => {
  const dataURL = await fileToDataURL(file)
  const compressedDataURL = await compressDataURL(dataURL)
  const formatedDataURL = await formatDataURL(compressedDataURL)
  const res = await textAnnotationRequest(formatedDataURL)
  return getFirestResponse(res)
}

export default textAnnotation

// take in a file return a dataURL
const fileToDataURL = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject(error)
})


// take in dataURL compress dataURL
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
const compressDataURL = dataURL => new Promise((resolve, reject) => {
  try {
    imageCompressor.run(dataURL, compressorSettings, (compressedSrc) => {
      resolve(compressedSrc)
    })
  } catch (err) {
    reject(err)
  }
})

// take in dataURL clean
const formatDataURL = dataURL => {
  return dataURL.replace(/[^.]*,/, '')
}

// take in clean dataURL return promise of the response data
const textAnnotationRequest = async (cleanDataUrl) => {
  let res
  const request = {
    image: {
      content: cleanDataUrl,
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
  try {
    res = await axios({
      method: "POST",
      url: `https://vision.googleapis.com/v1/images:annotate?key=${key.apiKey}`,
      data: {
        requests: [request]
      },
    })
  } catch (err) {
    console.log('err', err)
  }
  return res
}

// get result
const getFirestResponse = (res) => {
  return res.data.responses[0]
}