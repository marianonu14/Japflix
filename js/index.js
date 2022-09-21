const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('lista');
const offCanvas = document.getElementById('offcanvasTop');
let moviesArray;

const rating = {
    1: '<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>',
    2: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>',
    3: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>',
    4: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>',
    5: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>'
}

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

    const filterArray = moviesArray.filter(({title, tagline, overview, genres}) => 
        (title, tagline, overview).toLowerCase().includes(search) || 
        genres.find(elem => elem.name.toLowerCase().includes(search))
    )

    showMovies(filterArray);
})

function showMovies(movies){
    contenedor.innerHTML = ``

    if(!movies.length) return contenedor.innerHTML = `<p class="text-white text-center fs-5">No Se Encontraron Peliculas, Intenta con Otra Busqueda</p>`;

    for(let movie of movies) {
        const { title , tagline, vote_average, id } = movie

        const rate = Math.floor(vote_average/2)

        contenedor.innerHTML += `
        <li onClick={showCanvas(${id})} class="d-flex justify-content-between mb-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
            <div>
                <h2 class="text-white">${title}</h2>
                <p class="text-secondary">${tagline}</p>
            </div>
            <p class="text-white">${rating[rate]}</p>
        </li>`
    }
}

function showCanvas(id){

    offCanvas.innerHTML = ``;

    const movie = moviesArray.filter(movie => movie.id === id);

    const { title, overview, genres } = movie[0];

    offCanvas.innerHTML += `
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasTopLabel">${title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <p class="text-secondary">${overview}</p>
    </div>
    <hr>
    <div class="d-flex text-secondary p-3 gap-3" id="genres-container"></div>`

    for(let genre of genres){
        document.getElementById('genres-container').innerHTML += `<p class="text-secondary">${genre.name}</p>`
    }
}