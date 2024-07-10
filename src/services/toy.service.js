import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.price) {
                toys = toys.filter(toy => toy.price >= filterBy.price)
            }
            if (filterBy.inStock) {
                toys = toys.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
            }
            if (filterBy.labels) {
                const labelsToFilter = filterBy.labels
                toys = toys.filter(toy =>
                    labelsToFilter.every(label => toy.labels.includes(label))
                )
            }
            if (filterBy.sort.type) {
                toys.sort((toy1, toy2) => {
                  const sortDirection = +filterBy.sort.desc
                  if (filterBy.sort.type === 'name') {
                    return toy1.name.localeCompare(toy2.name) * sortDirection
                  } else if (filterBy.sort.type === 'price' || filterBy.sort.type === 'createdAt') {
                    return (toy1[filterBy.sort.type] - toy2[filterBy.sort.type]) * sortDirection
                  }
                })
              }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
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

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 20; i++) {
            const toy = {
                _id: utilService.makeId(10),
                name: utilService.makeLorem(2),
                price: utilService.getRandomIntInclusive(200, 999),
                labels: ['Doll', 'Puzzle'],
                createdAt: Date.now(),
                inStock: Math.random() > 0.3,
            }
            toys.push(toy)
        }
        utilService.saveToStorage(STORAGE_KEY, toys)
        console.log('toys', toys)
    }
}