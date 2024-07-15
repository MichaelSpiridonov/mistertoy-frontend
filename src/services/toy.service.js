import { httpService } from "./http.service.js";

// const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

// _createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, {filterBy})
  }
  
  function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
  }
  
  function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
  }
  
  async function save(toy) {
    if (toy._id) {
      return httpService.put(BASE_URL + toy._id, toy)
    } else {
      return httpService.post(BASE_URL, toy)
    }
  }

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}

function getDefaultFilter() {
    return {
        name: '',
        price: 0,
        inStock: '',
        labels: [],
        sort: {type: "", desc: 1},
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))

// function _createToys() {
//     let toys = utilService.loadFromStorage(STORAGE_KEY)
//     if (!toys || !toys.length) {
//         toys = []
//         for (let i = 0; i < 20; i++) {
//             const toy = {
//                 _id: utilService.makeId(10),
//                 name: utilService.makeLorem(2),
//                 price: utilService.getRandomIntInclusive(200, 999),
//                 labels: ['Doll', 'Puzzle'],
//                 createdAt: Date.now(),
//                 inStock: Math.random() > 0.3,
//             }
//             toys.push(toy)
//         }
//         utilService.saveToStorage(STORAGE_KEY, toys)
//         console.log('toys', toys)
//     }
// }