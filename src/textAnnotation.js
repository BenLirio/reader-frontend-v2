import axios from 'axios'
const annotate = async (file, apiKey) => {
  const content = await toBase64(file)
  const request = {
    image: {
      content: content,
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
  const res = await axios({
    method: "POST",
    url: `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
    data: {
      requests: [request]
    },
  })
  return res
}

export default annotate
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result.replace(/[^.]*,/, ''))
  reader.onerror = error => reject(error)
})