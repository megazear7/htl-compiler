class MoviesUseModel {
  constructor(context) {
    this.movies = context.movies.map(movie => new MovieUseModel(movie));
  }
}

class MovieUseModel {
  constructor(context) {
    this.name = context.name;
    this.releaseDate = context.releaseDate;
    this._releaseDate = new Date(context.releaseDate);
  }

  formattedReleaseDate() {
    // TODO NOT WORKING
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = this._releaseDate.getDate();
    var monthIndex = this._releaseDate.getMonth();
    var year = this._releaseDate.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
}

export default { MoviesUseModel, MovieUseModel };
