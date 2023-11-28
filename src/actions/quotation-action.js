
import axios from '../config/axios'

export const startAddQuotation = (formData) => {
   return async (dispatch) => {
      try {
         const response = await axios.post('/api/quotation/create', formData, {
            headers: {
               Authorization: localStorage.getItem('token')
            }
         })
         dispatch(addQuotation(response.data))
      } catch (e) {
         console.log(e)
         dispatch(serverErrors(e.response.data.errors))
      }
   }
}
export const addQuotation = (data) => {
   return ({ type: 'ADD_QUOTATION', payload: data })
}

export const clearServer = ([]) => {
   return ({ type: 'CLEAR', payload: [] })
}

export const startSetQuotation = () => {
   return async (dispatch) => {
      try {
         const response = await axios.get('/api/quotations/list', {
            headers: {
               Authorization: localStorage.getItem('token')
            }
         })
         dispatch(setQuotation(response.data))
         console.log(response.data)
      } catch (e) {
         console.log(e)
      }
   }
}
export const setQuotation = (data) => {
   return ({ type: 'SET_QUOTATION', payload: data })
}
const serverErrors = (msg) => {
   return ({ type: 'SET_SERVER_ERRORS', payload: msg })
}