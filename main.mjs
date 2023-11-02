import { format } from 'date-fns'
import Cookies from 'js-cookie';

const footerForm = document.querySelector('.footer_form');
const footerButton = document.querySelector('.footer_button');

function add(event) {
    const input = document.querySelector('.footer_input');
    if (input.value !== '') {
        event.preventDefault()
        const main = document.querySelector('.main');
        const myMessage = document.getElementById('myMessage').content.cloneNode(true);
        let myText = myMessage.querySelector('.message_text');
        myText.textContent = input.value
        let myTime = myMessage.querySelector('.message_time');
        const time = format(new Date(), 'HH:mm');
        myTime.textContent = time;
    
        main.insertBefore(myMessage, main.firstChild);
        input.value = ''
    }
}

function addMessages(data) {
    const main = document.querySelector('.main');
    const myMessage = document.getElementById('message').content.cloneNode(true);
    let myName = myMessage.querySelector('.message_name');
    myName.textContent = data.user.name;
    let myText = myMessage.querySelector('.message_text');
    myText.textContent = data.text;
    let myTime = myMessage.querySelector('.message_time');

    const inputDate = new Date(data.createdAt);
    const formattedTime = format(inputDate, 'HH:mm');
    const time = formattedTime;
    myTime.textContent = time;

    main.appendChild(myMessage);
}

function getChat() {
    const url = 'https://edu.strada.one/api/messages/';
    const codeCookie = Cookies.get('code');
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${codeCookie}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        Object.values(data.messages).forEach(messages => {
            addMessages(messages);
        })
        console.log(data);
    })
}

footerForm.addEventListener('submit', add);
footerButton.addEventListener('click', add);

export { getChat }