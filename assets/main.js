var app = new Vue ({
  el: '#root',
  data: {
    userSearch: '',
    filmsList: [],
    maxVote: 5,
    seriesList: [],
    searching: false,
    languages: ['ch', 'de', 'en', 'es', 'fr', 'it', 'ja'],
    searchedTitle:'',
  },
  methods: {
    search() {
      this.filmsList = [];
      this.seriesList = [];

      let text = this.userSearch;
      this.searchedTitle = text;
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
        });

      }
    },
    getVote(film){
      return Math.round(film.vote_average / 2);
    },
    isFlagVisible(film) {
      return this.languages.includes(film.original_language);
    }
  }


});
