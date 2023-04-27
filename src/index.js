import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'assets/css/nucleo-icons.css'
import 'assets/scss/blk-design-system-react.scss'
import 'assets/demo/demo.css'

import Index from 'views/Index.js'
import GetStartedPage from 'views/PageDetails/GetStartedPage'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Switch>
      <Route
        path='/get-started'
        render={(props) => <GetStartedPage {...props} />}
      />
      <Route path='/' render={(props) => <Index {...props} />} />
    </Switch>
  </BrowserRouter>
)
