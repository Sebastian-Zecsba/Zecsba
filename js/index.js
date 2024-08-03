const form = document.querySelector('#form')

const inputName = document.querySelector('#from_name')
const inputEmail = document.querySelector('#email_id')
const inputMessage = document.querySelector('#message')

const header = document.querySelector('.header')

const boxProjects = document.querySelector('#proyects')

eventListener()
function eventListener () {
    document.addEventListener('DOMContentLoaded', () => {
        fetchData().then(data => {
            useData(data)
        })
        initializeSwiper()
    })
    form.addEventListener('submit', validateForm)
}

async function fetchData(){

    let data = []

    try {
        const response = await fetch('./data/dataProjects.json')
        const dataFetch = await response.json()
        data = dataFetch
    } catch (error) {
        console.log(error)
    }

    return data;
}

function useData(data){
    console.log(data)

    data.forEach(data => {

        const { image, nameProject, description, linkCode, linkProject } = data

        const projectElement = document.createElement('div')
        projectElement.classList.add('swiper-slide');
        projectElement.innerHTML = `
            <div class="box_proyects">
                <div class="box_proyects_img">
                    <img src=${image} alt="Zecsba proyect">
                </div>
                <div class="box_proyects_text">
                    <h2 class="text-golden">${nameProject}</h2>
                    <p class="box_proyect_text">${description}</p>

                    <nav class="box_proyects_nav">
                        <a href=${linkCode} target="_blank">Ver Código</a>
                        <a href=${linkProject} target="_blank">Ver Proyecto</a>
                    </nav>
                </div>
            </div>
        `
        boxProjects.appendChild(projectElement)
    });
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

function initializeSwiper() {
    new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
        },
    });
}