import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'http://localhost:3000/api/admin/'
})

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
    return Promise.reject(error)
  }
)

export default http
