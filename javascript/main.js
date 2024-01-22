
const gamesSection = document.querySelector('.games');
const detailsSection = document.querySelector('.details');

document.getElementById('gameData').addEventListener("click", function (e) {
    const targetCard = e.target.closest('.card');
    if (targetCard) {
        const gameLink = targetCard.getAttribute('data-id');
        detailsData(gameLink);
        console.log(gameLink);

        gamesSection.classList.add('d-none');
        detailsSection.classList.remove('d-none');
    }
});

document.getElementById('btnClose').addEventListener('click', function () {
    gamesSection.classList.remove('d-none');
    detailsSection.classList.add('d-none');
});


async function detailsData(x) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8aaf588b15msh99494f73864cb91p1fae51jsnd198e4adf65b',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${x}`, options);
        const result = await response.json();
        displayDetails(result);
    } catch (error) {
        console.error(error);
    }
}

async function getGames(term) {
    const options = {
        method: "GET",
        headers: {
            'X-RapidAPI-Key': '8aaf588b15msh99494f73864cb91p1fae51jsnd198e4adf65b',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${term}`, options)
    const response = await api.json();
    displayData(response);
}

function displayData(Arr) {
    let cartona = ``;
    for (let i = 0; i < Arr.length; i++) {
        cartona += `<div class="col">
            <div data-id="${Arr[i].id}" class="card h-100 bg-transparent" role="button">
                <div class="card-body">
                    <figure class="position-relative">
                        <img class="card-img-top object-fit-cover h-100" src="${Arr[i].thumbnail}">
                    </figure>
                    <figcaption>
                        <div class="hstack justify-content-between">
                            <h3 class="h6 small">${Arr[i].title}</h3>
                            <span class="badge  p-2">Free</span>
                        </div>
                        <p class="card-text small text-center opacity-80">${Arr[i].short_description}</p>
                    </figcaption>
                </div>
                <footer class="card-footer small hstack justify-content-between">
                    <span class="badge badge-color">${Arr[i].genre}</span>
                    <span class="badge badge-color">${Arr[i].platform}</span>
                </footer>
            </div>
        </div>`;
    }

    document.getElementById('gameData').innerHTML = cartona;
}

function displayDetails(data) {
    const content = `
        <div data-id="${data.id}" class="col-md-4">
            <img src="${data.thumbnail}" class="w-100" alt="image details" />
        </div>
        <div class="col-md-8">
            <h3>Title: ${data.title}</h3>
            <p>Category: <span class="badge text-bg-info"> ${data.genre}</span> </p>
            <p>Platform: <span class="badge text-bg-info"> ${data.platform}</span> </p>
            <p>Status: <span class="badge text-bg-info"> ${data.status}</span> </p>
            <p class="small">${data.description}</p>
            <a class="btn btn-outline-warning" target="_blank" href="${data.game_url}">Show Game</a>
        </div>`;

    document.getElementById("detailsContent").innerHTML = content;
}

function toggleMenu() {
    var navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

window.onload = () => {
    getGames('shooter');
};

document.getElementById("mmorpg").addEventListener('click', (event) => {
    event.preventDefault();
    getGames("mmorpg");
});

document.getElementById("shooter").addEventListener('click', () => {
    getGames("shooter");
});

document.getElementById("sailing").addEventListener('click', () => {
    getGames("sailing");
});

document.getElementById("permadeath").addEventListener('click', () => {
    getGames("permadeath");
});

document.getElementById("superhero").addEventListener('click', () => {
    getGames("superhero");
});

document.getElementById("pixel").addEventListener('click', () => {
    getGames("pixel");
});
