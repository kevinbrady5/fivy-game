let movies = [];
let currentOrder;

class Movie {
    constructor(name, yearReleased, yearTakesPlace, imgFile) {
        this.name = name;
        this.yearReleased = yearReleased;
        this.yearTakesPlace = yearTakesPlace;
        this.imgFile = imgFile;
    }
}
  
let ironMan = new Movie("Iron Man", "2008-05-02", 2010, "img/ironman_cover_photo.jpg");
let incredibleHulk = new Movie("The Incredible Hulk", "2008-06-13", 2011, "img/hulk_cover_photo.jpg");
let ironMan2 = new Movie("Iron Man 2", "2010-05-07", 2010, "img/ironman2_cover_photo.jpg");
let thor = new Movie("Thor", "2011-05-06", 2011, "img/thor_cover_photo.jpg");
let captainAmerica = new Movie("Captain America", "2011-07-22", 1942, "img/captain_america_cover_photo.jpg");
let avengers = new Movie("Avengers", "2012-05-04", 2012, "img/avengers_cover_photo.jpg");
let ironMan3 = new Movie("Iron Man 3", "2013-05-03", 2013, "img/ironman3_cover_photo.jpg");
let thorDarkWorld = new Movie("Thor: The Dark World", "2013-11-08", 2013, "img/thor_dark_world_cover_photo.jpg");
let captainAmericaWinterSoldier = new Movie("Captain America: The Winter Soldier", "2014-04-04", 2014, "img/captain_america_winter_soldier_cover_photo.jpg");
let guardians = new Movie("Guardians of the Galaxy", "2014-08-01", 2014, "img/guardians_cover_photo.jpg");
let avengersUltron = new Movie("Avengers: Age of Ultron", "2015-05-01", 2015, "img/avengers_ultron_cover_photo.jpg");
let antMan = new Movie("Ant-Man", "2015-07-17", 2015, "img/antman_cover_photo.jpg");
let captainAmericaCivilWar = new Movie("Captain America: Civil War", "2016-05-06", 2016, "img/captain_america_civil_war_cover_photo.jpg");
let doctorStrange = new Movie("Doctor Strange", "2016-11-04", 2016, "img/doctor_strange_cover_photo.jpg");
let guardians2 = new Movie("Guardians of the Galaxy: Vol. 2", "2017-05-05", 2014, "img/guardians2_cover_photo.jpg");

movies.push(ironMan, incredibleHulk, ironMan2, thor, captainAmerica, avengers, ironMan3, thorDarkWorld, captainAmericaWinterSoldier, guardians, avengersUltron, antMan, captainAmericaCivilWar, doctorStrange, guardians2);

const movieCovers = document.querySelector(".movieCovers");
const toggle = document.getElementById('toggle');

sortMoviesByYeaReleased();

toggle.addEventListener('click', () => {
    if(currentOrder == "release") {
        sortMoviesByYearTakesPlace();
    } else {
        sortMoviesByYeaReleased();
    }
});

function displayMovies() {
    movies.forEach(movie => {
        let link = document.createElement("a");
        link.classList = "movieCovers__item";
        img = document.createElement("img");
        img.classList = "movieCovers__img";
        img.src = movie.imgFile;
        movieCovers.appendChild(link);
        link.appendChild(img);
    });
}

function sortMoviesByYeaReleased() {
    currentOrder = "release";
    toggle.innerHTML = "Switch to Chronological Order";
    movieCovers.innerHTML = "";

    movies.sort(function(a, b){
        const date1 = new Date(a.yearReleased)
        const date2 = new Date(b.yearReleased)
        
        return date1 - date2;
    })

    displayMovies();
}

function sortMoviesByYearTakesPlace() {
    toggle.innerHTML = "Switch to Release Order";
    currentOrder = "chronological";
    movieCovers.innerHTML = "";
    
    movies.sort(function(a, b){
        const date1 = new Date(a.yearTakesPlace)
        const date2 = new Date(b.yearTakesPlace)
        
        return date1 - date2;
    })
    
    displayMovies();
}