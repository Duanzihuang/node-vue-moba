import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASEURL || '/api/admin/'
  // baseURL: 'http://localhost:3000/api/admin/'
})

http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = localStorage.token || ''
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: error.response.data.message
      })
    }
    if (error.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default http
