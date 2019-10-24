let app = new Vue({
    el: '#app',
    data: {
        searchInput: ''
    },
    methods: {
        async search() {
            const response = await axios.get("https://www.rijksmuseum.nl/api/en/collection?q=Q&key=btZpg4ag&format=json".replace("Q", searchInput));
            
            
        }
    }
})