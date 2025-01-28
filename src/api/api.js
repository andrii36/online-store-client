import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    //baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const api = {
    getProductsList: (pageNumber) => {
        return instance.get('/products-by-page', { params: { page: pageNumber } })
    },
    getProducts: (pageNumber, config) => {
        return instance.post('/get-products', { config }, { params: { page: pageNumber } })
    },
    getSearchProducts(config, pageNumber) {
        return instance.post('/products/search-by-page', { config }, { params: { page: pageNumber } })
    },
    getAdvancedSearchProducts(formArr, pageNumber) {
        return instance.post('/products/filter-by-page', { formArr }, { params: { page: pageNumber } })
    },
    getProductDetails: (id) => {
        return instance.get('/products/details', { params: { id } })
    },
    deleteProduct: (id) => {
        return instance.post('/products/delete', { id }, { headers: { authtoken: localStorage.getItem('authtoken') } })
    },
    addProduct: (formData) => {
        return instance.post('/products/add', { formData }, { headers: { authtoken: localStorage.getItem('authtoken') } })
    },
    updateProduct: (formData, id) => {
        return instance.put('/products/update', { formData }, {
            headers: { authtoken: localStorage.getItem('authtoken') },
            params: { id }
        })
    },
    purchaseProduct: (id) => {
        return instance.post('/purchase', {}, {
            params: { id },
            headers: { authtoken: localStorage.getItem('authtoken') }
        })
    },
    login: ({ email, password }) => {
        return instance.post('/login', { email, password })
    },
    createUser: ({ userName, email, password }) => {
        console.log({ userName, email, password })
        //users.push({id: users.length+1, name, email, password, role: 'user'})
        return instance.post('/registration', { email, password, userName })
    },
    authme: () => {
        return instance.post('/authme', {}, { headers: { authtoken: localStorage.getItem('authtoken') } })
    },
    getAllUsers: (company) => {
        return instance.post('/users', { company }, { headers: { authtoken: localStorage.getItem('authtoken') } })
    },
    updateUser: (user) => {
        return instance.put(
            '/user/update',
            user,
            {
                headers: { authtoken: localStorage.getItem('authtoken') },
                params: { id: user._id }
            }
        )
    },
    getAllFleet: (company) => {
        return instance.post('/fleet', { company }, { headers: { authtoken: localStorage.getItem('authtoken') } })
    },
    updateVehicleServiceHistory: (serviceHistory, id) => {
        return instance.put(
            '/fleet/service-history',
            serviceHistory,
            {
                headers: { authtoken: localStorage.getItem('authtoken') },
                params: { id }
            }
        )
    },
    getAllAnnouncementsByCompany: (companyId) => {
        return instance.get(
            '/announcements',
            {
                headers: { authtoken: localStorage.getItem('authtoken') },
                params: { companyId }
            }
        )
    },
    addAnnouncement: (announcement) => {
        return instance.post(
            '/announcement/create',
            announcement,
            { headers: { authtoken: localStorage.getItem('authtoken') } }
        )
    },
    updateAnnouncement: (announcement) => {
        return instance.put(
            '/announcement/update',
            announcement,
            { 
                headers: { authtoken: localStorage.getItem('authtoken') },
                params: { id: announcement._id }
            }
        )
    },
    removeAnnouncement: (id) => {
        return instance.delete(
            '/announcement/remove',
            { 
                headers: { authtoken: localStorage.getItem('authtoken') },
                params: { id }
            }
        )
    },

    getConstants: (type) => {
        return instance.get(`/${type}`)
    }
}