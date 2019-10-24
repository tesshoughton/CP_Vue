let app = new Vue({
    el: '#app',
    data: {
        searchInput: '',
        rows: [],
        columns: ['Title', 'Work', 'Artist']
    },
    methods: {
        async search() {
            this.rows = [];
            const response = await axios.get("https://www.rijksmuseum.nl/api/en/collection?q=Q&key=btZpg4ag&format=json".replace("Q", this.searchInput));
            for(let i = 0; i < response.data.artObjects.length; i++) {
                let title = '';
                let work = '';
                let artist = '';
                
                if(response.data.artObjects[i].title != '') {
                    title = response.data.artObjects[i].title;
                } else {
                    title = "Unknown Title";
                }
                if(response.data.artObjects[i].hasImage === false) {
                    work = '';
                } else {
                    work = response.data.artObjects[i].webImage.url.replace("s0", "s256");
                }
                if(response.data.artObjects[i].artist === "") {
                    artist = "Unknown Artist";
                } else {
                    artist = response.data.artObjects[i].principalOrFirstMaker;
                }
                this.rows.push({title: title, work: work, artist: artist});
                
            }
        }
    }
})