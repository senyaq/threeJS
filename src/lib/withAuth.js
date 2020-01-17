import React from 'react'
import api from './api'
import { Redirect } from 'react-router-dom'

export default function withAuth(AuthComponent) {
  const Authenticated = props => {
    return api.isLoggedIn() ? <AuthComponent {...props} /> : <Redirect to="/sign_In" />
  }

  return Authenticated
}
