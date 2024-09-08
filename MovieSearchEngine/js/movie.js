export default class Movie{
    constructor(tital, year, poster, plot){
        this.tital = tital
        this.year = year
        this.poster = poster
        this.plot = plot
    }

    displayDetails(){
        return`
        <div class="movie">
        <h2>${this.title} (${this.year})</h2>
                <img src="${this.poster}" alt="${this.title} poster" />
            <p>${this.plot}</p>
        </div>
        `;
    }
}