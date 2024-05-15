const form = document.querySelector('#form')

const inputName = document.querySelector('#from_name')
const inputEmail = document.querySelector('#email_id')
const inputMessage = document.querySelector('#message')

const header = document.querySelector('.header')

eventListener()
function eventListener () {
    form.addEventListener('submit', validateForm)
}

function validateForm (e){
    e.preventDefault();

    const elementosConError = document.querySelectorAll('.error');
    if(elementosConError.length > 0){
        return;
    }

    if([inputName.value, inputEmail.value, inputMessage.value].includes('')){
        const box = document.createElement('div')
        box.textContent = `Todos los campos son obligatorios`
        // box.classList.add('text-golden')
        box.classList.add('error')

        form.appendChild(box)
        return;
    }

    sendEmail()
}

function sendEmail(){

    const serviceID = 'service_tgj0m2f';
    const templateID = 'template_e4qtapm';
     
    emailjs.sendForm(serviceID, templateID, 'form')
    .then(() => {
        let timerInterval;
        Swal.fire({
        title: "Enviando Correo",
        html: "Responderemos los mas rapido posible",
        timer: 2000,
        timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            }
        })
    }, (err) => {
        alert(JSON.stringify(err));
    });
}