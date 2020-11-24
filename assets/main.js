var app = new Vue ({
  el: '#root',
  data: {
    userSearch: '',
    filmsList: []
  },
  methods: {
    //intercetto il click sul button o il keyup invio in input e salvo cio' che ha digitato l'utente
    search() {
      console.log(this.userSearch);

      //chiamata ajax
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'f70b7a3263a4bd2bca0c361be3b2b3e3',
          query: 'joker'
        }
      }).then((response) => {
        this.filmsList = response.data.results;
        console.log(response.data.results);
      }); 
    }
  }
});
