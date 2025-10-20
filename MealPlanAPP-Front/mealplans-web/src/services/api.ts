import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err?.response?.data?.message ?? 'Erro de comunicação com a API'
    return Promise.reject({ ...err, message })
  }
)