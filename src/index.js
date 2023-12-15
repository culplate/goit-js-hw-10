import axios from "axios";
import Notiflix from "notiflix";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js"
import SlimSelect from "slim-select";
// auth cat api key
axios.defaults.headers.common["x-api-key"] = "live_bzX9zMlIdP0XbVHw6qcJXC7BqgocB40pbl5Xvb0eXAEI2Aqcx0CzHBkdhfHhppgr";

// TO DO:
// 4. add custom dropdown (not required)

const loadingMes = document.querySelector('.loader');
const dropdown = document.querySelector('.breed-select');
const contentCont = document.querySelector('.cat-info');

function addOptions(arr) {
    return arr.map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`
    }).join("");
}

function markupContent(obj) {
    const { url, breeds: { 0: { name, description, origin, life_span, temperament, wikipedia_url } } } = obj;
        return `
            <img class="image" src="${url}" alt="${name}">
            <div class="content-wrapper">
                <h1 class="main-title">${name}</h1>
                <p class="description">${description}</p>
                <ul class="list">
                    <li class="list-item"><strong>Origin:</strong> ${origin}</li>
                    <li class="list-item"><strong>Lifespan:</strong> ${life_span}</li>
                    <li class="list-item"><strong>Temperament:</strong> ${temperament}</li>
                </ul>
                <a class="link" href="${wikipedia_url}" target="_blank">Read more</a>
            </div>
        `
}

function handleSelect() {
    showElement(loadingMes);
    contentCont.innerHTML = '';
    fetchCatByBreed(dropdown.value)
        .then(res => {
            contentCont.innerHTML = markupContent(res.data['0'])
        })
        .catch(err => {
            console.log(err.message)
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
        })
        .finally(() => hideElement(loadingMes))
}

function hideElement(elem) {
    elem.classList.add('is-hidden');
}

function showElement(elem) {
    elem.classList.remove('is-hidden');
}

dropdown.addEventListener('change', handleSelect);
// fetches breeds collection and add them as options to select element

fetchBreeds()
    .then(res => {
        dropdown.insertAdjacentHTML('beforeend', addOptions(res.data));
        showElement(dropdown);
        new SlimSelect({
            select: '#select',
        })
    })
    .catch(err => {
        console.log(err.message)
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
    })
    .finally(() => hideElement(loadingMes))

