import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import './FancyRoute.css'

function FancyRoute(props) {
  useEffect(() => {
    const send = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function() {
      nprogress.start()
      this.addEventListener('load', function() {
        nprogress.done()
      })
      return send.apply(this, arguments)
    }
  })

  return <Route {...props} />
}

export default FancyRoute
