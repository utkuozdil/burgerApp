import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-59a3c.firebaseio.com/'
});

export default instance;