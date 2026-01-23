import axios from "axios"
import cookies from 'js-cookie'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
})
axiosInstance.interceptors.request.use((config) => {
    const accessToken = cookies.get('access_token')
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
},
    (error) => {
        console.log('Request Error : ', error)
        return Promise.reject(error)
    }
)
axiosInstance.interceptors.response.use((response) => { return response },
    async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.error("Response error :: ", error.response);

            cookies.remove('access_token')
            cookies.remove('refresh_token')

            window.location.href='/login'

            // try {
            //     const refreshTokenUrl = 'http://localhost:5000auth/refresh-token'

            //     const res = await axios.post(refreshTokenUrl, {
            //         refresh_token: localStorage.getItem('refresh_token') //get new access token from refresh token
            //     })
            //     const newAccesToken = res.data;

            //     // localStorage.setItem("access", newAccesToken)
            // } catch {

            // }
        }
        return Promise.reject(error)
    })

export { axiosInstance }