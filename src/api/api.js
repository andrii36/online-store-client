import axios from 'axios'
 
const instance = axios.create({
    baseURL: 'http://aonlinestore.herokuapp.com/api',
    //baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const api = {
    getProductsList: () => {
        return instance.get('/products')
    },
    // getSearchProducts(value){
    //     return instance.get('/products/search', {params: {value}})
    // },
    getSearchProducts(config){
        return instance.post('/products/search', {config})
    },
    getAdvancedSearchProducts(formArr){
        return instance.post('/products/filter', {formArr})
    },
    getProductDetails: (id) => {
        return instance.get('/products/details', {params: {id}})
    },
    deleteProduct: (id) => {
        return instance.post('/products/delete', {id}, {headers: {authtoken: localStorage.getItem('authtoken')}})
    },
    addProduct: (formData) => {
        return instance.post('/products/add', {formData}, {headers: {authtoken: localStorage.getItem('authtoken')}})
    },
    updateProduct: (formData, id) => {
        return instance.put('/products/update', {formData}, {headers: {authtoken: localStorage.getItem('authtoken')},
            params: {id}})
    },
    login: ({email, password}) => {
        return instance.post('/login', {email, password})
    },
    createUser: ({name, email, password}) => {
        //users.push({id: users.length+1, name, email, password, role: 'user'})
    },
    authme: () => {
        return instance.post('/authme', {}, {headers: {authtoken: localStorage.getItem('authtoken')}})
    }
}