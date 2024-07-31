import axios, { AxiosResponse } from 'axios'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.delete['Access-Control-Allow-Origin'] = '*'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_NOTI_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const setupAxiosClient = () => {
  axiosClient.interceptors.request.use(
    async (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data
    },
    async (err) => {
      return Promise.reject(err.response)
    }
  )
}

export { axiosClient, setupAxiosClient }
