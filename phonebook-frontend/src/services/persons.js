import axios from 'axios'
const baseUrl = `/api/persons`

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


const addName = (nameObject) => {
    const request = axios.post(baseUrl, nameObject)
    return request.then(response => response.data)
}

const updateName = (nameObject) => {
    const request = axios.put(`${baseUrl}/${nameObject.id}`, nameObject)
    return request.then(response => response.data)
}

const deleteName = (personId) => {
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response.data)
}


export default {
    getAll, addName, updateName, deleteName
} 
