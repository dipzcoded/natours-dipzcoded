import axios from 'axios';
const sethAuthToken = (token) => {

    if(token)
    {
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    }else
    {
        delete axios.defaults.headers.common['authorization'];
    }

}

export default sethAuthToken;
