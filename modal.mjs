import Cookies from 'js-cookie';
import { getChat } from './main.mjs';

function post() {
    const email = document.querySelector('.modal_input').value;
    if (email.trim() !== '') {
        
        const url = 'https://edu.strada.one/api/user';
    
        const data = {
            email: email
        };
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Ошибка сети');
        })
        .then(data => {
            console.log('Запрос успешно отправлен!');
            console.log(data);

            Cookies.set('mail', email)
            Cookies.set('userName', data.name)
        })
        .catch(error => {
            console.error('Ошибка запроса:', error);
            Cookies.remove('userName')
            window.location.reload();
        });
        
    }
}

function getUserName() {
    const codeCookie = Cookies.get('code');
    const url = 'https://edu.strada.one/api/user/me';
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${codeCookie}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Ошибка при запросе');
        }
    })
    .then(data => {
        getChat()
        console.log(data);
        Cookies.set('userName', data.name);
        console.log(Cookies.set('userName', data.name));

        const userName = document.querySelector('.header_userName');
        userName.innerText = Cookies.get('userName');
    })
    .catch(error => {
        console.log(error);
        Cookies.remove('code');
        Cookies.remove('userName')
        window.location.reload();
    })
}

function cookie() {
    const code = document.querySelector('.modal_input').value;
    if (code === '') {
        return
    }
    Cookies.set('code', code, { expires: 1 });

    getUserName();
}


function setting() {

    const newName = document.querySelector('.modal_input').value;
    if (newName === '') {
        return
    }
    if (newName.length <= 2) {
        alert ('Ник слишком короткий')
        return
    }

    const userName = document.querySelector('.header_userName');
    Cookies.set('userName', newName);
    userName.innerText = Cookies.get('userName');

    const codeCookie = Cookies.get('code');

    
    const url = 'https://edu.strada.one/api/user';
    const name = {
        name: newName
    };

    fetch (url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${codeCookie}`
        },
        body: JSON.stringify(name)
    })
    .then(response => {
        return response.json();
    })
    .then(data => console.log(data))
}

export { post, cookie, setting, getUserName }