const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
let moviesArray;

window.addEventListener('DOMContentLoaded', getData);

async function getData() {
    const URL = 'https://japceibal.github.io/japflix_api/movies-data.json';

    try {
        const response = await fetch(URL);
        const result = await response.json();
    
        moviesArray = result;

    } catch (error) {
        console.log(error);
    }
}

btnBuscar.addEventListener('click', () => {
    if(!inputBuscar.value) return;

    const search = inputBuscar.value.toLowerCase();

    const filterArray = moviesArray.filter( ({title, tagline, overview, genres}) => 
        (title, tagline, overview).toLowerCase().includes(search) || 
        genres.find(elem => elem.name.toLowerCase().includes(search))
    )

    showMovies(filterArray);
})

function showMovies(movies){
    console.log(movies)
}