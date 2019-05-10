import axios from 'axios'
import router from '../router'

const domain = 'http://localhost:3000'
const Unauthorized = 401
const onUnauthorized = () => {
    router.push('/login')
}

const request = {
    get(path) {
        return axios.get(path)
            .catch(({response}) => {
                const {status} = response
                if (status === Unauthorized) {
                    return onUnauthorized()
                }
                throw Error(response)
            })
    },
    post(path, data, headers) {
        return axios.post(path, data, headers)
    },
    delete(path) {
        return axios.delete(path)
    },
    put(path, data) {
        return axios.put(path, data)
    }
}

export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

export const auth = {
    login(email, password) {
        const form = new FormData()
        form.append('grant_type', 'password')
        form.append('username', email)
        form.append('password', password)

        return request.post(`${domain}/oauth/token`, form, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic Y2xpZW50OnBhc3M='
            }
        })
            .then(({data}) => data);
    },
    singup(account) {
        return request.post(`${domain}/api/accounts`, account, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export const board = {
    fetch(id) {
        if (id) {
            return request.get(`${domain}/api/boards/${id}`).then(({data}) => data)
        }
        return request.get(`${domain}/api/boards`).then(({data}) => data)
    },
    create(board) {
        return request.post(`${domain}/api/boards`, board, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(({data}) => data)
    },
    update(id, title, content) {
        return request.put(`${domain}/api/boards/${id}`, {title, content}).then(({data}) => data)
    },
    destroy(id) {
        return request.delete(`/api/boards/${id}`)
    }
}
