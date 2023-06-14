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

  const getData = (imgURL, prompt, title, neg_prompt, num_inference_steps) => {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: imgURL,
          prompt: prompt,
          title: title,
          neg_prompt: neg_prompt,
          num_inference_steps: num_inference_steps,
        }),
      }
      return fetch(`${baseURL}/image-process`, requestOptions)
        .then((response) => {
          console.log('response', response.body)
          return response.blob()
        })
        .then((blob) => {
          var reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = function () {
            var base64data = reader.result
            resolve(base64data)
          }
        })
    })
  }

  const translate = (text) => {
    return new Promise((resolve, reject) => {
      return fetch(`${baseURL}/translation?input_text=${text}`)
        .then((response) => {
          resolve(response.json())
        })
        .then((data) => {
          console.log('data', data)
          resolve(data)
        })
    })
  }

  return {
    uploadImage,
    translate,
    getData,
  }
}

export default api
