import React from 'react'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'
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
} from 'reactstrap'

// core components
import Footer from 'components/Footer/Footer.js'
import IndexNavbar from 'components/Navbars/IndexNavbar'
import api from 'api'

let ps = null

export default function GetStartedPage() {
  const [imgsSrc, setImgsSrc] = React.useState('')
  const [imgUrl, setImgUrl] = React.useState('')
  const [type, setType] = React.useState('')
  const [prompt, setPrompt] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [image, setImage] = React.useState('')
  const [transformedImg, setTransformedImg] = React.useState()

  const { uploadImage, transformImage, translate } = api()

  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on'
      document.documentElement.classList.remove('perfect-scrollbar-off')
      let tables = document.querySelectorAll('.table-responsive')
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i])
      }
    }
    document.body.classList.toggle('profile-page')
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
        document.documentElement.className += ' perfect-scrollbar-off'
        document.documentElement.classList.remove('perfect-scrollbar-on')
      }
      document.body.classList.toggle('profile-page')
    }
  }, [])
  const onChange = (e) => {
    setType('img')
    for (const file of e.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setImgsSrc(reader.result)
      }
      reader.onerror = () => {
        console.log(reader.error)
      }
    }
  }

  const handleSetImage = () => {
    if (type === 'img') {
      uploadImage(imgsSrc).then((res) => {
        setImage(res.image.src)
      })
    } else if (type === 'url') {
      setImage(imgUrl)
    }
  }

  const handleTransform = () => {
    translate(prompt).then((res) => {
      transformImage(image, res.translation.translatedText, title).then(
        (res) => {
          setTransformedImg(res.image)
        }
      )
    })
  }

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
                  <CustomInput
                    type='file'
                    id='exampleCustomFileBrowser'
                    name='customFile'
                    label='Yo, pick a file!'
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
                      setImgUrl(e.target.value)
                      setType('url')
                    }}
                  />
                  <Button
                    className='btn-simple mt-3'
                    color='info'
                    onClick={(e) => {
                      e.preventDefault()
                      handleSetImage()
                    }}
                  >
                    Set Image
                  </Button>
                </FormGroup>
              </Col>
              <Col className='ml-auto mr-auto' lg='4' md='6'>
                <img
                  className='w-full my-6 rounded-xl'
                  src={
                    image
                      ? image
                      : 'https://www.memecreator.org/static/images/memes/5331753.jpg'
                  }
                  alt='input'
                />
              </Col>
            </Row>
          </Container>
        </div>
        <div className='section'>
          <Container>
            <Row className='justify-content-between'>
              <Col md='6' lg='4'>
                <Row className='justify-content-between align-items-center'>
                  {image ? (
                    <img
                      className='w-full my-6 rounded-xl'
                      src={image}
                      alt='input'
                    />
                  ) : null}
                </Row>
              </Col>
              <Col md='5'>
                <h1 className='profile-title text-left'>Transform Image</h1>
                <h5 className='text-on-back'>02</h5>
                <div className='btn-wrapper pt-3'>
                  <FormGroup>
                    <Label>Enter your text instruction.</Label>
                    <Input
                      placeholder='Make image colors darker'
                      type='text'
                      onChange={(e) => setPrompt(e.target.value)}
                    />
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
                    e.preventDefault()
                    handleTransform()
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
                    {transformedImg ? (
                      <img
                        className='w-full my-6 rounded-xl'
                        src={transformedImg.src}
                        alt={transformedImg.alt}
                      />
                    ) : null}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    </>
  )
}
