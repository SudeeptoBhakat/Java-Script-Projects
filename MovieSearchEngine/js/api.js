const API_KEY = "a6cf816e";
const BASE_URL = `https://www.omdbapi.com/`;
export const fetchMovieData = async (movieName) =>{
    try{
        const res = await fetch(BASE_URL+'?apikey='+API_KEY+`&t=`+encodeURIComponent(movieName))
        const data = await res.json()
        return data
    }catch(error){
        console.error(error);
    }
};