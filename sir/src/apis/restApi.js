import axios from 'axios'
const CancelToken = axios.CancelToken

export const loginCall = (user, password) => {
  const config = {
    url: '/api/login',
    method: 'post',
    data: {username: user, password: password},
    headers: { 'Content-Type': 'application/json' }
  }

  return axios.request(config)
    .catch(error => {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      }
      throw error
    })
}

export const apiCall = (url, kargs = {}, source = CancelToken.source()) => {
  const config = {
    url: url,
    method: 'post',
    data: JSON.stringify({ kargs: kargs }),
    headers: { 'Content-Type': 'application/json' }
  }

  return axios.request(config)
    .catch(error => {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      }

      throw error
    })
}

export default {
  loginCall,
  apiCall
}
