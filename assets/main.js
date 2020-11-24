var app = new Vue ({
  el: '#root',
  data: {
    userSearch: '',
    filmsList: [],
    maxVote: 5,
    seriesList: []
  },
  methods: {
    search() {
      //intercetto il click sul button o il keyup invio in input e salvo cio' che ha digitato l'utente
      console.log(this.userSearch);
      //chiamata ajax film
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'f70b7a3263a4bd2bca0c361be3b2b3e3',
          query: this.userSearch
        }
      }).then((response) => {
        this.filmsList = response.data.results;
        console.log(this.filmsList);
        //assegno al voto il valore numerico su base 5 corrispondente
        this.filmsList.forEach((film) => {
          film.vote_average = Math.round(film.vote_average / 2);
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
        //assegno al voto il valore numerico su base 5 corrispondente
        this.seriesList.forEach((serie) => {
          serie.vote_average = Math.round(serie.vote_average / 2);
        });
      });

    }
  }


});
