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
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'assets/css/nucleo-icons.css'
import 'assets/scss/blk-design-system-react.scss'
import 'assets/demo/demo.css'

import Index from 'views/Index.js'
import LandingPage from 'views/PageDetails/LandingPage.js'
import RegisterPage from 'views/PageDetails/RegisterPage.js'
import ProfilePage from 'views/PageDetails/ProfilePage.js'
import GetStartedPage from 'views/PageDetails/GetStartedPage'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Switch>
      <Route
        path='/landing-page'
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path='/profile-page'
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path='/get-started'
        render={(props) => <GetStartedPage {...props} />}
      />
      <Route path='/' render={(props) => <Index {...props} />} />
    </Switch>
  </BrowserRouter>
)
