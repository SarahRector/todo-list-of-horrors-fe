import request from 'superagent';

const URL = process.env.REACT_APP_API_URL || "https://fathomless-eyrie-12706.herokuapp.com/";

export function signUp(userData) {
    try {
        return request.post(`${URL}/auth/signup`, userData);
    } catch(e) {
        return { error: e.message }
    }
}

export function signIn(userData) {
    try {
        return request.post(`${URL}/auth/signin`, userData);
    } catch(e) {
        return { error: e.message }
    }
}

export function fetchToDos() {
    const token = localStorage.getItem('token');

    try{
        return request
            .get(`${URL}/api/monster_to_do`)
            .set('Authorization', token);
    } catch(e) {
        return { error: e.message }
    }
}

export function fetchToDo(id) {
    const token = localStorage.getItem('token');

    return request.get(`${URL}/api/monster_to_do/${id}`)
        .set('Authorization', token);
}

export function updateToDo(id, updatedToDo) {
    const token = localStorage.getItem('token');

    return request.put(`${URL}/api/monster_to_do/${id}`, updatedToDo)
        .set('Authorization', token);
}

export function createToDo(toDoData) {
    const token = localStorage.getItem('token');

    return request.post(`${URL}/api/monster_to_do`, toDoData)
        .set('Authorization', token);
}

