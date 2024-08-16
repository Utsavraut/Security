import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    
    headers:{
        "Content-Type": "multipart/form-data",
    }
})

// make seperate header for authorization
const token = localStorage.getItem('token')

const config = {
    headers:{
        'authorization' : `Bearer ${token}`
    }
}

export const createUserApi = (data)=> Api.post('api/users/create',data)
export const loginUserApi = (data)=> Api.post('api/users/login',data)

export const createDestinationApi = (data)=> Api.post('api/admin/createDestination',data)
export const getDestinationApi = (data) => Api.get('/api/admin/getDestination',data)

export const getDestinationByIdApi = (id) => Api.get(`api/admin/destination/getById/${id}`)

export const getYouMayLikeDataApi = (id) => Api.get(`api/admin/destination/youMayLike/${id}`)
export const createBookingApi = (data)=> Api.post('api/users/create_booking',data)
export const getBookingApi = (data)=> Api.get('api/users/get_booking',data)
export const getUserBookingApi = (id)=> Api.get(`api/users/get_userBooking/${id}`)

export const updateDestinationApi = (id, data)=> Api.put(`api/admin/update_destination/${id}`,data,config)

export const deleteDestinationApi = (id)=> Api.delete(`api/admin/delete_destination/${id}`,config)
export const contactUsApi = (data)=> Api.post('api/users/contact_us',data)
export const getContactApi = (data) => Api.get('/api/admin/getContact',data)
export const updatePasswordApi = (id, data)=> Api.put(`api/users/update_user/${id}`,data)

// export const updateUserApi = (id, data) => Api.put(`/api/user/update_user/${id}`, data);
// export const getSingleUserApi = (id) => Api.get(`/api/user/get_user/${id}`)
// export const forgetPasswordAPI = (data)=> Api.post('/api/user/forgetpassword', data)`