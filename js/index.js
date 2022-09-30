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
        title.toLowerCase().includes(search) || 
        tagline.toLowerCase().includes(search) || 
        overview.toLowerCase().includes(search) || 
        genres.some(({name}) => name.toLowerCase().includes(search))
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

    const { title, overview, genres, budget, revenue, runtime, release_date } = movie[0];

    offCanvas.innerHTML += `
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasTopLabel">${title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <p class="text-secondary">${overview}</p>
    </div>
    <hr>
    <div class="d-flex justify-content-between px-5">
        <div class="d-flex text-secondary gap-3" id="genres-container"></div>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                More
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li class="d-flex justify-content-between px-2 py-1"><span>Year:</span> ${new Date(release_date).getFullYear()}</li>
                <li class="d-flex justify-content-between px-2 py-1"><span>Runtime:</span> ${runtime} mins</li>
                <li class="d-flex justify-content-between px-2 py-1"><span>Budget:</span> $${budget}</li>
                <li class="d-flex justify-content-between px-2 py-1 gap-1"><span>Revenue:</span> $${revenue}</li>
            </ul>
        </div>
    </div>
    `

    for(let genre of genres){
        document.getElementById('genres-container').innerHTML += `<p class="text-secondary">${genre.name}</p>`
    }
}