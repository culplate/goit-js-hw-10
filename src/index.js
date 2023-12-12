import axios from "axios";
// auth api key
axios.defaults.headers.common["x-api-key"] = "live_bzX9zMlIdP0XbVHw6qcJXC7BqgocB40pbl5Xvb0eXAEI2Aqcx0CzHBkdhfHhppgr";

const dropdown = document.querySelector('.breed-select');

fetchBreeds()
    .then(res => {
        console.log(res); // remove later
        dropdown.insertAdjacentHTML('beforeend', createOptions(res.data));
        })
    .catch(err => console.log(err.code))

// markup for options
function createOptions(arr) {
    return arr.map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`
    }).join("");
}

// move to and then import from cat-api.js
function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .then(resp => {
            if (!resp.status === 200) throw new Error(error);
            return resp;
        })
}
