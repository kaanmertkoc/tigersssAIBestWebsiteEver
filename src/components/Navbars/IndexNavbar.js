import React from 'react'
import { Link } from 'react-router-dom'
// reactstrap components
import {
  Button,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
} from 'reactstrap'

export default function IndexNavbar() {
  const [color, setColor] = React.useState('navbar-transparent')
  const [user, setUser] = React.useState(null)
  console.log(user?.photoURL);
  React.useEffect(() => {
    window.addEventListener('scroll', changeColor)
    const userLocal = window.localStorage.getItem('user')
    if (userLocal) {
      setUser(JSON.parse(userLocal))
    }
    return function cleanup() {
      window.removeEventListener('scroll', changeColor)
    }
  }, [])
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor('bg-info')
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor('navbar-transparent')
    }
  }
  return (
    <Navbar className={'fixed-top ' + color} color-on-scroll='100' expand='lg'>
      <Container>
        <div className='navbar-translate'>
          <NavbarBrand to='/' tag={Link} id='navbar-brand'>
            <span>ADK• </span>
            TextualVision
          </NavbarBrand>
        </div>
        <Nav navbar>
          <NavItem>
            <Button
              className='nav-link d-none d-lg-block'
              color='primary'
              href='/get-started'
            >
              <i className='tim-icons icon-spaceship' /> Get Started
            </Button>
          </NavItem>
          {user ? (
            <NavItem>
              <Button
                className='nav-link d-none d-lg-block'
                color='secondary'
                href='/profile-page'
              >
                <img
                  alt='user profile'
                  width='24px'
                  height='24px'
                  referrerPolicy='no-referrer'
                  src={user?.photoURL}
                />
              </Button>
            </NavItem>
          ) : (
            <NavItem>
              <Button
                className='nav-link d-none d-lg-block'
                color='secondary'
                href='/register'
              >
                Sign In
              </Button>
            </NavItem>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
