const api = () => {
  const baseURL = 'http://127.0.0.1:8000'
  const uploadImage = (imgAddress) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: imgAddress }),
    }
    return fetch(`${baseURL}/img-upload`, requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
  }
  const transformImage = (imgURL, prompt, title) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: imgURL, prompt: prompt, title: title }),
    }
    return fetch(`${baseURL}/image-process`, requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log('data', data)
        return data
      })
  }
  const translate = (text) => {
    return fetch(`${baseURL}/translation?input_text=${text}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log('data', data)
        return data
      })
  }
  return {
    uploadImage,
    transformImage,
    translate,
  }
}

export default api
