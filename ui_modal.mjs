// import { checkCookie } from "./main.mjs";
import { post, cookie, setting } from "./modal.mjs";
import { getChat } from "./main.mjs";
// import { reload } from "./main.mjs";
import Cookies from 'js-cookie';

const settings = document.querySelector('.header_settings');

function showModal(set) {
    let modalButton;
    let close;
    let closeImg
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    const block = document.createElement('div');
    block.classList.add('modal_block');
    
    const modalNameText = document.createElement('div');
    if (set === 'window') {
        modalNameText.innerText = 'Авторизация';
    } else if (set === 'set') {
        modalNameText.innerText = 'Настройки';
    } else {
        modalNameText.innerText = 'Подтверждение';
    }
    modalNameText.classList.add('modal_name_text');
    
    if (set === 'set') {
        close = document.createElement('div');
        closeImg = document.createElement('img');
        closeImg.setAttribute('src', "pic/close.png");
        closeImg.classList.add('close_img');
    }
    
    const nameInput = document.createElement('div');
    nameInput.classList.add('name_input');
    if (set === 'window') {
        nameInput.innerText = 'Почта';
    } else if (set === 'set') {
        nameInput.innerText = 'Имя в чате';
    } else {
        nameInput.innerText = 'Код';
    }
    
    const modalForm = document.createElement('form');
    modalForm.classList.add('modal_form')
    const modalInput = document.createElement('input');
    modalInput.classList.add('modal_input');
    if (set === 'window') {
        modalButton = document.createElement('div');
        modalButton.classList.add('modal_button');
        modalButton.innerText = 'Получить код';
        modalButton.addEventListener('click', post);
        modalButton.addEventListener('click', (event) => {
            event.target.closest('.modal').remove();
            showModal('code');
        })
    } else if (set === 'set') {
        modalButton = document.createElement('div');
        modalButton.classList.add('modal_button');
        modalButton.addEventListener('click', setting);
        modalButton.innerText = 'Сохранить';
        modalButton.addEventListener('click', (event) => {
            event.target.closest('.modal').remove()
        });
    } else {
        modalButton = document.createElement('div');
        modalButton.classList.add('modal_button');
        modalButton.innerText = 'Войти';
        modalButton.addEventListener('click', cookie);
        modalButton.addEventListener('click', (event) => {
            event.target.closest('.modal').remove()
        });
    }

    if (set === 'set') {
        close.classList.add('modal_close');
        close.addEventListener('click', (event) => {
            event.target.closest('.modal').remove();
        });

        close.append(closeImg);
        block.append(close);
    }
    
    block.append(modalNameText);
    block.append(nameInput);
    block.append(modalForm);
    modalForm.append(modalInput);
    modalForm.append(modalButton);
    modal.append(block);
    document.body.append(modal);
}

settings.addEventListener('click', () => {
    showModal('set')
});

console.log(Cookies.get('userName'))

window.onload = function() {
    getChat();
    console.log(Cookies.get('userName'));
    function reload() {
        return Cookies.get('userName') !== undefined;
    }

    if (reload()) {
        const userName = document.querySelector('.header_userName');
        userName.innerText = Cookies.get('userName');
    } else {
        showModal('window');
    }
};

function exit() {
    console.log(Cookies.get());
    Cookies.remove('code');
    Cookies.remove('userName')
    console.log(Cookies.get());
    window.location.reload();
}

const exitButton = document.querySelector('.header_exit');
exitButton.addEventListener('click', exit);
