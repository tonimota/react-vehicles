import vehicles from './http'

// export const getAllCars = (id) => {
//   return vehicles.get(`/carros/marcas/${id}/modelos`)
// }
export const getByType = (type) => {
  return vehicles.get(`/${type}/marcas`)
}
export const getByBrand = (type, id) => {
  return vehicles.get(`/${type}/marcas/${id}/modelos`)
}
export const getYearByModel = (type, id, model) => {
  return vehicles.get(`/${type}/marcas/${id}/modelos/${model}/anos`)
}
export const getPrice = (type, id, model, year) => {
  return vehicles.get(`/${type}/marcas/${id}/modelos/${model}/anos/${year}`)
}