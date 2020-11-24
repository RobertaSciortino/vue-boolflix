var app = new Vue ({
  el: '#root',
  data: {
    userSearch: ''
  },
  methods: {
    //intercetto il click sul button o il keyup invio in input e salvo cio' che ha digitato l'utente
    search() {
      console.log(this.userSearch);
    }
  }
});
