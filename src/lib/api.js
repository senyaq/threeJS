import axios from 'axios'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

class API {
  BASE_URL = 'https://jsonplaceholder.typicode.com' // for example

  constructor() {
    this.ctx = {}
  }

  setCTX(ctx = {}) {
    this.ctx = ctx
  }

  getToken() {
    const data = parseCookies(this.ctx)
    return data['token']
  }

  isLoggedIn() {
    const data = parseCookies(this.ctx)
    return data['token']
  }

  getUserPosts(idUser) {
    return this.fetch(`/posts?userId=${idUser}`, {
      method: 'GET',
    }).then(response => response.data)
  }

  fetch(url, options, token = null) {
    token = token || this.getToken(this.ctx)
    const headers = {}

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const http = axios.create({
      baseURL: this.BASE_URL,
      crossDomain: true,
      headers,
      withCredentials: false,
    })

    return http(url, options)
      .then(response => {
        return response
      })
      .catch(({ response }) => {
        if (response) {
          switch (response.data.error) {
            case 'Signature has expired':
            case 'Invalid segment encoding':
              // destroyCookie(this.ctx, 'token');
              break
            default:
              throw response
          }
        }
      })
  }
}
export default new API()
