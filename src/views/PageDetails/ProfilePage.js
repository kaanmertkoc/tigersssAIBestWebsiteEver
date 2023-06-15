/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import classnames from 'classnames';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
// reactstrap components
import julie from '../../assets/img/julie.jpeg';
import james from '../../assets/img/james.jpg';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '../../firebase';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

// core components
import Footer from 'components/Footer/Footer.js';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import api from '../../api';

const carouselItems = [
  {
    src: require('assets/img/denys.jpg'),
    altText: 'Slide 1',
    caption: 'Big City Life, United States',
  },
  {
    src: require('assets/img/fabien-bazanegue.jpg'),
    altText: 'Slide 2',
    caption: 'Somewhere Beyond, United States',
  },
  {
    src: require('assets/img/mark-finn.jpg'),
    altText: 'Slide 3',
    caption: 'Stocks, United States',
  },
];

let ps = null;

export default function ProfilePage() {
  const [tabs, setTabs] = React.useState(1);
  const [images, setImages] = React.useState([]);
  const { getPrompts } = api();

  const [modal, setModal] = React.useState({ bool: false, image: null });

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

  const [user, setUser] = useState();

  React.useEffect(() => {
    const currentUser = window.localStorage.getItem('user');
    setUser(JSON.parse(currentUser));
  }, []);

  const fetchPrompts = async () => {
    const res = await getPrompts(user?.uid);
    console.log('res', res);
  };

  React.useEffect(() => {
    if (user?.uid) {
      fetchPrompts();
    }
  }, [user]);

  const ImageCard = ({ image }) => {
    return (
      <div className='card'>
        <img src={image} height={'100%'} width={'100%'}></img>

        <Button className='btn-neutral' color='primary'>
          Download
        </Button>
        <Button color='danger'>Delete</Button>
      </div>
    );
  };

  return (
    <>
      <IndexNavbar />{' '}
      <Modal
        isOpen={modal.bool}
        toggle={() => {
          setModal({ image: null, bool: false });
        }}
      >
        <div className='modal-header'>
          <h5 className='modal-title' id='exampleModalLabel'>
            TextaulVision
          </h5>
          <button
            type='button'
            className='close'
            data-dismiss='modal'
            aria-hidden='true'
            onClick={() => {
              setModal({ image: null, bool: false });
            }}
          >
            <i className='tim-icons icon-simple-remove' />
          </button>
        </div>
        <ModalBody>
          <img src={modal.image} height={'100%'} width={'100%'}></img>{' '}
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={() => {
              setModal({ image: null, bool: false });
            }}
          >
            Download
          </Button>
          <Button
            color='secondary'
            onClick={() => {
              setModal({ image: null, bool: false });
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
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
                <h1 className='profile-title text-left'>{user?.displayName}</h1>
                <h5 className='text-on-back'>01</h5>
                <p className='profile-description'>
                  This is your profile page. You can see your entire journey on
                  TextualVision from here! Scroll down to see the masterpieces
                  you have created!
                </p>
              </Col>
              <Col className='ml-auto mr-auto' lg='4' md='6'></Col>
            </Row>
          </Container>
        </div>

        <div className='section'>
          <Container>
            <Table>
              <thead>
                <tr>
                  <th className='text-center'>#</th>
                  <th>Image</th>
                  <th>Prompt</th>
                  <th>Negative Prompt</th>
                  <th className='text-right'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {images?.map((data, index) => (
                  <tr>
                    <td className='text-center'>{index + 1}</td>
                    <td>
                      <img
                        src={data.imageUrl}
                        height={250}
                        width={250}
                        onClick={() => {
                          setModal({ image: data.imageUrl, bool: true });
                        }}
                      ></img>
                    </td>
                    <td>{data.propmt}</td>
                    <td>{data.negativePrompt}</td>
                    <td className='text-right'>
                      <Button className='btn-icon' color='info' size='sm'>
                        <i className='tim-icons icon-upload'></i>
                      </Button>
                      <Button className='btn-icon' color='danger' size='sm'>
                        <i className='tim-icons icon-trash-simple'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}
