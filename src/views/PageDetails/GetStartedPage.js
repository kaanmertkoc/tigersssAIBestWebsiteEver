/* eslint-disable no-loop-func */
import React, { useEffect } from 'react';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  CustomInput,
} from 'reactstrap';
import Nouislider from 'nouislider-react';
// core components
import IndexNavbar from 'components/Navbars/IndexNavbar';
import { UncontrolledCarousel } from 'reactstrap';
import api from 'api';
import { storage, realStorage } from '../../firebase';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

let ps = null;

export default function GetStartedPage() {
  const [imgUrl, setImgUrl] = React.useState('');
  const [type, setType] = React.useState('');
  const [prompt, setPrompt] = React.useState('');
  const [neg_prompt, setNeg_Prompt] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [image, setImage] = React.useState([]);
  const [transformedImg, setTransformedImg] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [sliderVal, setSliderVal] = React.useState(40);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [transformedUrls, setTransformedUrls] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const { translate, getData, uploadPrompt } = api();
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on';
      document.documentElement.classList.remove('perfect-scrollbar-off');
      let tables = document.querySelectorAll('.table-responsive');
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle('profile-page');
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
        document.documentElement.className += ' perfect-scrollbar-off';
        document.documentElement.classList.remove('perfect-scrollbar-on');
      }
      document.body.classList.toggle('profile-page');
    };
  }, []);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, []);

  const Slider = () => (
    <Nouislider
      range={{ min: 1, max: 100 }} // normally 1-500 , 500 takes approximately 15-20 min to run in api so keep max 100 for now
      start={[sliderVal]}
      onChange={(e) => setSliderVal(e)}
    />
  );

  const uploadImage = async (imgAddress, arr) => {
    const storageRef = ref(storage, `files/${imgAddress?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgAddress);
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
          console.log('download', downloadURL);
          setImage([
            {
              src: downloadURL,
              altText: 'alt',
              caption: 'caption',
            },
            ...arr,
          ]);
          arr.push({
            src: downloadURL,
            altText: 'alt',
            caption: 'caption',
          });
        });
      }
    );
  };

  const onChange = (e) => {
    setType('img');
    const filesArray = []; // Initialize an array to store the file data
    for (const file of e.target.files) {
      filesArray.push(file); // Add the file data to the array
    }
    setSelectedFiles(filesArray);
  };

  const handleSetImage = async () => {
    if (type === 'img') {
      let arr = [];
      selectedFiles.forEach(async (element, index) => {
        await uploadImage(element, arr).then((res) => {});
      });
      //setImage(arr);
    } else if (type === 'url') {
      setImage([imgUrl]);
    }
  };

  const handleTransform = async () => {
    let finalTransformedArr = [];
    let processIndex = 0;
    console.log('checked', isChecked);
    if (isChecked) {
      let res = await translate(prompt);
      let neg_res = await translate(neg_prompt);
      for (const prop of image) {
        console.log('image', prop);
        await getData(
          prop.src ? prop.src : prop,
          res.translation.translatedText,
          title,
          neg_res.translation.translatedText,
          Math.round(sliderVal)
        ).then((resObj) => {
          const res = resObj.base64data;
          const blob = resObj.blob;

          const storageRef = ref(storage, `files/${Date.now()}`);
          uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!', snapshot);
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              console.log('download', downloadURL);
              setTransformedUrls([
                {
                  src: downloadURL,
                  altText: 'alt',
                  caption: 'caption',
                },
                ...transformedUrls,
              ]);
              if (user?.uid) {
                uploadPrompt(prompt, neg_prompt, image, downloadURL, user?.uid);
              }
            });
          });
          setTransformedImg([
            {
              src: res,
              altText: `output_${processIndex}`,
              caption: `O_caption_${processIndex}`,
            },
            ...finalTransformedArr,
          ]);
          finalTransformedArr.push({
            src: res,
            altText: `output_${processIndex}`,
            caption: `O_caption_${processIndex}`,
          });
          processIndex += 1;
        });
      }
    } else {
      for (const prop of image) {
        await getData(
          prop.src ? prop.src : prop,
          prompt,
          title,
          neg_prompt,
          Math.round(sliderVal)
        ).then((resObj) => {
          const res = resObj.base64data;
          const blob = resObj.blob;
          console.log('res', res, blob);
          console.log('finalTransformed', transformedImg);
          console.log('finalTransformed2', finalTransformedArr);
          //we can do firebase database push here 2
          const storageRef = ref(storage, `files/${Date.now()}`);
          uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!', snapshot);
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              console.log('download', downloadURL);
              setTransformedUrls([
                {
                  src: downloadURL,
                  altText: 'alt',
                  caption: 'caption',
                },
                ...transformedUrls,
              ]);
              if (user?.uid) {
                uploadPrompt(prompt, neg_prompt, image, downloadURL, user?.uid);
              }
            });
          });
          setTransformedImg([
            {
              src: res,
              altText: `output_${processIndex}`,
              caption: `O_caption_${processIndex}`,
            },
            ...finalTransformedArr,
          ]);
          finalTransformedArr.push({
            src: res,
            altText: `output_${processIndex}`,
            caption: `O_caption_${processIndex}`,
          });
          processIndex += 1;
        });
      }
    }
  };

  console.log('Image', image);
  return (
    <>
      <IndexNavbar />
      <div className='wrapper'>
        <div className='page-header'>
          <img
            alt='...'
            className='dots'
            src={require('assets/img/dots.png')}
          />
          <img
            alt='...'
            className='path'
            src={require('assets/img/path4.png')}
          />
          <Container className='align-items-center'>
            <Row>
              <Col lg='6' md='6'>
                <h1 className='profile-title text-left'>Image Upload</h1>
                <h5 className='text-on-back'>01</h5>
                <p className='profile-description'>
                  Get Started by uploading your image.
                </p>
                <FormGroup>
                  <CustomInput // multiline for labels needs to be added for long named multi picture file choose situtations
                    multiple
                    label='Pick a file'
                    type='file'
                    id='exampleCustomFileBrowser'
                    name='customFile'
                    onChange={onChange}
                  />
                </FormGroup>
                <p>or enter an image url.</p>
                <FormGroup>
                  <Input
                    type='url'
                    name='url'
                    placeholder='https://...'
                    onChange={(e) => {
                      setImgUrl(e.target.value);
                      setType('url');
                    }}
                  />
                  <Button
                    className='btn-simple mt-3'
                    color='info'
                    onClick={(e) => {
                      e.preventDefault();
                      handleSetImage();
                    }}
                  >
                    Set Image
                  </Button>
                </FormGroup>
              </Col>
              <Col className='ml-auto mr-auto' lg='4' md='6'>
                {image.length === selectedFiles.length && image.length > 1 ? (
                  <UncontrolledCarousel
                    key={`carousel_${image.length}`}
                    items={image}
                    autoPlay={false}
                    slide={false}
                  />
                ) : image.length === 1 ? (
                  <img
                    className='w-full my-6 rounded-xl'
                    src={image[0]?.src ? image[0]?.src : image[0]}
                    alt='input'
                  />
                ) : (
                  <img
                    className='w-full my-6 rounded-xl'
                    src={
                      'https://www.memecreator.org/static/images/memes/5331753.jpg'
                    }
                    alt='input'
                  />
                )}
              </Col>
            </Row>
          </Container>
        </div>
        <div className='section'>
          <Container>
            <Row className='justify-content-between'>
              <Col md='6' lg='4'>
                <Row className='justify-content-between align-items-center'>
                  {image.length === selectedFiles.length && image.length > 1 ? (
                    <UncontrolledCarousel
                      key={`carousel_${image.length}`}
                      items={image}
                      autoPlay={false}
                      slide={false}
                    />
                  ) : image.length === 1 ? (
                    <img
                      className='w-full my-6 rounded-xl'
                      src={image[0]?.src ? image[0]?.src : image[0]}
                      alt='input'
                    />
                  ) : (
                    <img
                      className='w-full my-6 rounded-xl'
                      src={
                        'https://www.memecreator.org/static/images/memes/5331753.jpg'
                      }
                      alt='input'
                    />
                  )}
                </Row>
              </Col>
              <Col md='5'>
                <h1 className='profile-title text-left'>Transform Image</h1>
                <h5 className='text-on-back'>02</h5>
                <div className='btn-wrapper pt-3'>
                  <FormGroup>
                    <div className='btn-wrapper'>
                      <Label className='mr-3'>
                        Enter your text instruction.
                      </Label>
                    </div>
                    <div className='btn-wrapper pb-3 pt-3'>
                      <CustomInput
                        type='switch'
                        id='switch-1'
                        label='Turkish Prompt'
                        checked={isChecked}
                        onChange={() => setIsChecked((prev) => !prev)}
                      />
                    </div>
                    <Input
                      placeholder={
                        isChecked
                          ? 'Fotoğraftaki çocuğa şapka ekle'
                          : 'Make image colors darker'
                      }
                      type='text'
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className='btn-wrapper pb-3 pt-3'>
                      <Input
                        placeholder={
                          isChecked
                            ? 'Negatif bilgi ekle (İsteğe Bağlı)'
                            : 'Negative Prompt (Optional)'
                        }
                        type='text'
                        onChange={(e) => setNeg_Prompt(e.target.value)}
                      />
                    </div>
                    <div className='btn-wrapper'>
                      <Label className='mr-3'>
                        Choose your precision for the generated image
                      </Label>
                    </div>
                    <div className='btn-wrapper pt-3'>
                      <div className='slider'>
                        <Slider />
                      </div>
                    </div>
                  </FormGroup>
                </div>
                <div className='btn-wrapper pt-3'>
                  <FormGroup>
                    <Label>Enter a title for your new image.</Label>
                    <Input
                      placeholder='My new generated image'
                      type='text'
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <Button
                  className='btn-simple mt-3'
                  color='info'
                  onClick={(e) => {
                    e.preventDefault();
                    handleTransform();
                  }}
                >
                  Transform Image
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
        <section className='section'>
          <Container>
            <Row>
              <Col md='6'>
                <Card className='card-plain'>
                  <CardHeader>
                    <h1 className='profile-title text-left'>Results</h1>
                    <h5 className='text-on-back'>03</h5>
                  </CardHeader>
                  <CardBody>
                    <div className='w-full my-6 rounded-xl'>
                      {transformedImg.map((data, index) => (
                        <img
                          key={`image_${index}`}
                          className='w-full my-6 rounded-xl pb-3 pt-3'
                          src={data.src ? data.src : data}
                          alt='input'
                          style={{ padding: '20px' }}
                        />
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}
