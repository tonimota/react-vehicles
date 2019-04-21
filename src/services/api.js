import vehicles from './http'

// export const getAllCars = (id) => {
//   return vehicles.get(`/carros/marcas/${id}/modelos`)
// }
export const getAllBrand = (type) => {
  return vehicles.get(`/${type}/marcas`)
}
export const getAllBike = (id) => {
  return vehicles.get(`/motos/marcas/${id}/modelos`)
}
export const getAllTrucks = (id) => {
  return vehicles.get(`/caminhoes/marcas/${id}/modelos`)
}

// export const getFindindVehicles = (search) => {
//   return vehicles.get(`/vehicles?${search}`)
// }