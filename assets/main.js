var app = new Vue ({
  el: '#root',
  data: {
    userSearch: 'batman',
    filmsList: [],
    maxVote: 5,
    seriesList: [],
    searching: false,
    languages: ['ch', 'de', 'en', 'es', 'fr', 'it', 'ja'],
    searchedTitle:'',
    castsFilms: [],
    castsSeries: [],
    filmsGenres: [],
    seriesGenres: []
  },
  methods: {
    search() {
      this.filmsList = [];
      this.seriesList = [];

      this.searchedTitle = this.userSearch;
     
      if(this.userSearch.trim() != ''){

        this.searching = true;
        //chiamata ajax film
        axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: 'f70b7a3263a4bd2bca0c361be3b2b3e3',
            query: this.userSearch
          }
        }).then((response) => {
          this.filmsList = response.data.results;
          console.log(this.filmsList);
          this.searching = false;
        }).then(() => {
          this.filmsList.forEach((film) => {
            axios.get('https://api.themoviedb.org/3/movie/' + film.id + '/credits', {
              params: {
                api_key: 'f70b7a3263a4bd2bca0c361be3b2b3e3',
                movie_id: film.id
              }
            }).then((response) => {
              this.castsFilms.push({
                id: response.data.id,
                cast: response.data.cast
              });
            });

          });
        }).then(() => {
          axios.get('https://api.themoviedb.org/3/genre/movie/list', {
            params: {
              api_key: 'f70b7a3263a4bd2bca0c361be3b2b3e3'
            }
          }).then((response) => {
              this.filmsGenres = response.data.genres;
            });
        });

        //chiamata ajax serieTV
        axios.get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: 'f70b7a3263a4bd2bca0c361be3b2b3e3',
            query: this.userSearch
          }
        }).then((response) => {
          this.seriesList = response.data.results;
          console.log(this.seriesList);
          this.searching = false;
        }).then(() => {
          this.seriesList.forEach((serie) => {
            axios.get('https://api.themoviedb.org/3/tv/' + serie.id + '/credits', {
              params: {
                api_key: 'f70b7a3263a4bd2bca0c361be3b2b3e3',
                tv_id: serie.id
              }
            }).then((response) => {
              this.castsSeries.push({
                id: response.data.id,
                cast: response.data.cast
              });
            });
          });
        }).then(() => {
          axios.get('https://api.themoviedb.org/3/genre/tv/list', {
            params: {
              api_key: 'f70b7a3263a4bd2bca0c361be3b2b3e3'
            }
          }).then((response) => {
              this.seriesGenres = response.data.genres;
            });
        });

      }

    },
    getVote(film){
      return Math.round(film.vote_average / 2);
    },
    isFlagVisible(film) {
      return this.languages.includes(film.original_language);
    },
    getCast(film, castsArray){
      for (var i = 0; i < castsArray.length; i++) {
        if(castsArray[i].id == film.id){
          if(castsArray[i].cast.length > 4){
            return castsArray[i].cast.slice(0, 5);
          } else{
            return castsArray[i].cast;
          }
        }
      }
    },
    getGenre(id, genresArray){
      let genre = genresArray.find((genre) => {
        return genre.id == id;
      });
      if (genre == undefined) {
        return '';
      } else {
        return genre.name;
      }
    },


  },
  mounted: function() {
    this.search();
  }


});
