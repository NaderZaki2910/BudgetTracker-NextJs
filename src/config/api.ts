import Axios from "axios";

let urls = {
    test: `http://localhost:3001/`,
    development: 'http://localhost:3001/',
    production: 'https://your-production-url.com/'
}

const api = (token: string) => {return Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})};

export { api };