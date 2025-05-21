import axios from 'axios'

export const api = axios.create({
  baseURL: 'localhttp://localhost:3000',
})
