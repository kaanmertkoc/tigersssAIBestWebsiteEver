/*!

=========================================================
* BLK Design System React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import classnames from "classnames";
import React from 'react';
// reactstrap components
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from 'firebase/auth';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import { auth, firestore } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

// core components
import Footer from 'components/Footer/Footer.js';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import { useHistory } from 'react-router-dom';

export default function RegisterPage() {
  const [squares1to6, setSquares1to6] = React.useState('');
  const [squares7and8, setSquares7and8] = React.useState('');
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [user, setUser] = React.useState(null);
  let history = useHistory();

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider);
  };

  React.useEffect(() => {
    document.body.classList.toggle('register-page');
    document.documentElement.addEventListener('mousemove', followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle('register-page');
      document.documentElement.removeEventListener('mousemove', followCursor);
    };
  }, []);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser);
      const docRef = await addDoc(collection(firestore, 'users'), {
        uid: currentUser.uid,
        email: currentUser.email,
        fullName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        displayName: currentUser.displayName,
      });
      console.log('🚀 ~ file: RegisterPage.js:84 ~ docRef ~ docRef:', docRef);

      window.localStorage.setItem('user', JSON.stringify(currentUser));
      history.push('/get-started');
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      'perspective(500px) rotateY(' +
        posX * 0.05 +
        'deg) rotateX(' +
        posY * -0.05 +
        'deg)'
    );
    setSquares7and8(
      'perspective(500px) rotateY(' +
        posX * 0.02 +
        'deg) rotateX(' +
        posY * -0.02 +
        'deg)'
    );
  };
  return (
    <>
      <IndexNavbar />
      <div className='wrapper'>
        <div className='page-header'>
          <div className='page-header-image' />
          <div className='content'>
            <Container>
              <Row>
                <Col className='offset-lg-0 offset-md-3' lg='5' md='6'>
                  <div
                    className='square square-7'
                    id='square7'
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className='square square-8'
                    id='square8'
                    style={{ transform: squares7and8 }}
                  />
                  <Card className='card-register'>
                    <CardHeader>
                      <CardImg
                        alt='...'
                        src={require('assets/img/square-purple-1.png')}
                      />
                      <CardTitle tag='h4'>Register</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className='form'>
                        <InputGroup
                          className={classnames({
                            'input-group-focus': fullNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='tim-icons icon-single-02' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder='Full Name'
                            type='text'
                            onFocus={(e) => setFullNameFocus(true)}
                            onBlur={(e) => setFullNameFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            'input-group-focus': emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='tim-icons icon-email-85' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder='Email'
                            type='text'
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            'input-group-focus': passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='tim-icons icon-lock-circle' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder='Password'
                            type='text'
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                          />
                        </InputGroup>
                      </Form>
                    </CardBody>

                    <div
                      style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 20,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Button className='btn-round' color='primary' size='lg'>
                        Continue
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSignIn();
                        }}
                        className='btn-round'
                        color='secondary'
                        size='lg'
                      >
                        Sign In With Google
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
              <div className='register-bg' />
              <div
                className='square square-1'
                id='square1'
                style={{ transform: squares1to6 }}
              />
              <div
                className='square square-2'
                id='square2'
                style={{ transform: squares1to6 }}
              />
              <div
                className='square square-3'
                id='square3'
                style={{ transform: squares1to6 }}
              />
              <div
                className='square square-4'
                id='square4'
                style={{ transform: squares1to6 }}
              />
              <div
                className='square square-5'
                id='square5'
                style={{ transform: squares1to6 }}
              />
              <div
                className='square square-6'
                id='square6'
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
