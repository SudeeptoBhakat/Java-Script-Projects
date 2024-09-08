import Movie from './movie.js';
import { fetchMovieData } from './api.js';

document.getElementById('search-btn').addEventListener('click', async()=>{
    const movieName = document.getElementById('search-input').value
    const movieData = await fetchMovieData(movieName)
    console.log(movieData)

    const {Tital, Year, Poster, Plot} = movieData
    const movie = new Movie(Tital, Year, Poster, Plot)
    document.getElementById('movie-details').innerHTML = movie.displayDetails()
})