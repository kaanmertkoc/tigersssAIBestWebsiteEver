import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';

const api = () => {
  const baseURL = 'http://127.0.0.1:8000';
  const uploadImage = async (imgAddress, setImage) => {
    console.log('🚀 ~ file: api.js:7 ~ uploadImage ~ imgAddress:', imgAddress);
    const storageRef = ref(storage, `files/${imgAddress?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgAddress);
    let returnUrl;
    const a = uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };
  const transformImage = (imgURL, prompt, title) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: imgURL, prompt: prompt, title: title }),
    };
    return fetch(`${baseURL}/image-process`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
        return data;
      });
  };
  const translate = (text) => {
    return fetch(`${baseURL}/translation?input_text=${text}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
        return data;
      });
  };
  return {
    uploadImage,
    transformImage,
    translate,
  };
};

export default api;
