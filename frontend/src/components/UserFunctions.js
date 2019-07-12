import axios from 'axios';

export const register = newUser => {
    return axios.post('users/register', {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password
    })
    .then(res => {
        console.log('Registrado!');
    })
    .catch(err => {
        let obj = JSON.parse(JSON.stringify(err.response.data));
        alert('Erro ' + err.response.status + ' - ' + obj.error);
    })
}

export function validEmail(email){
    return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
}

export const login = user => {
    return axios.post('users/login', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('utoken', res.data);
        return res.data;
    })
    .catch(err => {
        console.log(err);
        let obj = JSON.parse(JSON.stringify(err.response.data));
        alert('Erro ' + err.response.status + ' - ' + obj.error);
    })
}
