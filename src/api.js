import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { firestore } from './firebase'

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

  const getData = (
    imgURL,
    prompt,
    title,
    neg_prompt,
    num_inference_steps,
    cloud
  ) => {
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
          cloud: cloud,
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
            resolve({ base64data, blob })
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
  const deletePrompt = async (id) => {
    await deleteDoc(doc(firestore, 'prompts', id))
  }
  const uploadPrompt = async (
    prompt,
    negativePrompt,
    imageUrl,
    outputUrl,
    userId
  ) => {
    console.log('prompt', prompt, negativePrompt, imageUrl, outputUrl)

    await addDoc(collection(firestore, 'prompts'), {
      prompt: prompt,
      negativePrompt: negativePrompt,
      imageUrl: imageUrl?.src ? imageUrl?.src : imageUrl,
      outputUrl: outputUrl,
      userId: userId,
    })
  }

  const getPrompts = async (userId) => {
    const colRef = collection(firestore, 'prompts')
    const q = query(colRef, where('userId', '==', userId))

    try {
      const querySnapshot = await getDocs(q)
      let books = []

      querySnapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
      })

      console.log(books)
      return books
    } catch (error) {
      console.error('Error fetching books:', error)
      throw error
    }
  }

  return {
    uploadImage,
    translate,
    getData,
    uploadPrompt,
    getPrompts,
    deletePrompt,
  }
}

export default api
