import React, { useState } from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import julie from "../../assets/img/julie.jpeg";
import james from "../../assets/img/james.jpg";

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
} from "reactstrap";

// core components
import Footer from "components/Footer/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar";

const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States",
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States",
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States",
  },
];

let ps = null;

export default function ProfilePage() {
  const [tabs, setTabs] = React.useState(1);
  const [images, setImages] = React.useState([
    {
      image: julie,
      propmt: "Gotum gibi kız yap",
      negativePrompt: "gotum gibi",
    },
    {
      image: james,
      propmt: "Gotum gibi kız yap",
      negativePrompt: "gotum gibi",
    },
  ]);

  const [modal, setModal] = React.useState({ bool: false, image: null });

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  }, []);

  const [user, setUser] = useState();

  React.useEffect(() => {
    const currentUser = window.localStorage.getItem("user");
    setUser(JSON.parse(currentUser));
  }, []);

  const ImageCard = ({ image }) => {
    return (
      <div className="card">
        <img src={image} height={"100%"} width={"100%"}></img>

        <Button className="btn-neutral" color="primary">
          >Download
        </Button>
        <Button color="danger">Delete</Button>
      </div>
    );
  };

  return (
    <>
      <IndexNavbar />{" "}
      <Modal
        isOpen={modal.bool}
        toggle={() => {
          setModal({ image: null, bool: false });
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            TextaulVision
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-hidden="true"
            onClick={() => {
              setModal({ image: null, bool: false });
            }}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
        <ModalBody>
          <img src={modal.image} height={"100%"} width={"100%"}></img>{" "}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setModal({ image: null, bool: false });
            }}
          >
            Download
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModal({ image: null, bool: false });
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png")}
          />
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png")}
          />
          <Container className="align-items-center">
            <Row>
              <Col lg="6" md="6">
                <h1 className="profile-title text-left">{user?.displayName}</h1>
                <h5 className="text-on-back">01</h5>
                <p className="profile-description">
                  This is your profile page. You can see your entire journey on
                  TextualVision from here! Scroll down to see the masterpieces
                  you have created!
                </p>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                {/*  <Card className='card-coin card-plain'>
                  <CardHeader>
                    {user?.photoURL && (
                      <img
                        alt='...'
                        className='img-center img-fluid rounded-circle'
                        src={user?.photoURL}
                      />
                    )}
                    <h4 className='title'>Transactions</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className='nav-tabs-primary justify-content-center'
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault()
                            setTabs(1)
                          }}
                          href='#pablo'
                        >
                          Wallet
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault()
                            setTabs(2)
                          }}
                          href='#pablo'
                        >
                          Send
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault()
                            setTabs(3)
                          }}
                          href='#pablo'
                        >
                          News
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent
                      className='tab-subcategories'
                      activeTab={'tab' + tabs}
                    >
                      <TabPane tabId='tab1'>
                        <Table className='tablesorter' responsive>
                          <thead className='text-primary'>
                            <tr>
                              <th className='header'>COIN</th>
                              <th className='header'>AMOUNT</th>
                              <th className='header'>VALUE</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>BTC</td>
                              <td>7.342</td>
                              <td>48,870.75 USD</td>
                            </tr>
                            <tr>
                              <td>ETH</td>
                              <td>30.737</td>
                              <td>64,53.30 USD</td>
                            </tr>
                            <tr>
                              <td>XRP</td>
                              <td>19.242</td>
                              <td>18,354.96 USD</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId='tab2'>
                        <Row>
                          <Label sm='3'>Pay to</Label>
                          <Col sm='9'>
                            <FormGroup>
                              <Input
                                placeholder='e.g. 1Nasd92348hU984353hfid'
                                type='text'
                              />
                              <FormText color='default' tag='span'>
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm='3'>Amount</Label>
                          <Col sm='9'>
                            <FormGroup>
                              <Input placeholder='1.587' type='text' />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className='btn-simple btn-icon btn-round float-right'
                          color='primary'
                          type='submit'
                        >
                          <i className='tim-icons icon-send' />
                        </Button>
                      </TabPane>
                      <TabPane tabId='tab3'>
                        <Table className='tablesorter' responsive>
                          <thead className='text-primary'>
                            <tr>
                              <th className='header'>Latest Crypto News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card> */}
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section">
          <Container>
            <Table>
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th>Image</th>
                  <th>Prompt</th>
                  <th>Negative Prompt</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {images.map((data, index) => (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <img
                        src={data.image}
                        height={250}
                        width={250}
                        onClick={() => {
                          setModal({ image: data.image, bool: true });
                        }}
                      ></img>
                    </td>
                    <td>{data.propmt}</td>
                    <td>{data.negativePrompt}</td>
                    <td className="text-right">
                      <Button className="btn-icon" color="info" size="sm">
                        <i className="tim-icons icon-upload"></i>
                      </Button>
                      <Button className="btn-icon" color="danger" size="sm">
                        <i className="tim-icons icon-trash-simple"></i>
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
