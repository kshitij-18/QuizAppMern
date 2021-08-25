import axios from 'axios'
import { useDispatch } from 'react-redux'
import setAuthToken from '../utils/setAuthToken'


const userLoaded = () => async dispatch => {
    const tokenFromStorage = localStorage.getItem('token')

    if (tokenFromStorage) {
        setAuthToken(tokenFromStorage)
    }
}