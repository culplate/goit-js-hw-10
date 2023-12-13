import axios from "axios";
// auth api key
axios.defaults.headers.common["x-api-key"] = "live_bzX9zMlIdP0XbVHw6qcJXC7BqgocB40pbl5Xvb0eXAEI2Aqcx0CzHBkdhfHhppgr";

const loadingMes = document.querySelector('.loader');
const errorMes = document.querySelector('.error');
const dropdown = document.querySelector('.breed-select');
const contentCont = document.querySelector('.cat-info');
dropdown.addEventListener('change', handleSelect);

fetchBreeds()
    .then(res => {
        dropdown.insertAdjacentHTML('beforeend', addOptions(res.data));
    })
    .catch(err => {
        console.log(err.code) //handle error!!!!
    })

// markup for options
function addOptions(arr) {
    return arr.map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`
    }).join("");
}

function markupContent(arr) {

}

function handleSelect() {
    console.log(dropdown.value);
    fetchCatByBreed(dropdown.value)
        .then(res => console.log(res.data[0]))
        .catch(err => console.log(err.message)) // handle error!!!!
}


// move to and then import from cat-api.js
function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds");
}

function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
}