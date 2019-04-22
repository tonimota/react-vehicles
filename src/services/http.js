import axios from 'axios'

const vehicles = axios.create({
  baseURL: 'https://parallelum.com.br/fipe/api/v1',
  timeout: 2000
})

export default vehicles