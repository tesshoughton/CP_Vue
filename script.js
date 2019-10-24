/*global Vue*/
/*global axios*/
let app = new Vue({
    el: '#app',
    data: {
        searchInput: '',
        rows: [],
        columns: []
    },
    methods: {
        async search() {
            this.columns = ['Title', 'Work', 'Artist'];
            this.rows = [];
            const response = await axios.get("https://www.rijksmuseum.nl/api/en/collection?q=Q&key=btZpg4ag&format=json".replace("Q", this.searchInput));
            for(let i = 0; i < response.data.artObjects.length; i++) {
                let title = '';
                let work = '';
                let artist = '';
                let title_link = '';
                let work_link = '';
                let artist_link = '';
                
                if(response.data.artObjects[i].title != '') {
                    title = response.data.artObjects[i].title;
                    title_link = 'https://www.rijksmuseum.nl/nl/zoeken/objecten?q=' + response.data.artObjects[i].title;
                } else {
                    title = "Unknown Title";
                    title_link = "https://www.rijksmuseum.nl/en/search?p=1&ps=12&f.objectTypes.sort=unknown&st=Objects&ii=6";
                }
                if(response.data.artObjects[i].hasImage === false) {
                    work = '';
                    work_link = "https://www.rijksmuseum.nl/en";
                } else {
                    work = response.data.artObjects[i].webImage.url.replace("s0", "s256");
                    work_link = work;
                }
                if(response.data.artObjects[i].artist === "") {
                    artist = "Unknown Artist";
                    artist_link = "https://www.rijksmuseum.nl/en/search?s=artist&p=1&ps=12&f.principalMakers.name.sort=unknown&st=Objects&ii=0";
                } else {
                    artist = response.data.artObjects[i].principalOrFirstMaker;
                    artist_link = 'https://www.rijksmuseum.nl/nl/zoeken/objecten?q=' + response.data.artObjects[i].principalOrFirstMaker;
                }
                this.rows.push({title: title, work: work, artist: artist, title_link: title_link, work_link: work_link, artist_link: artist_link});
                
            }
        }
    }
})