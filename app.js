const baseUrl = `https://api.lyrics.ovh/suggest`; //infomation api
const lyricsApi = `https://api.lyrics.ovh/v1` //get lyrice api

// get input value
document.getElementById('search-btn').addEventListener('click',()=>{
    const searchValue = document.getElementById('searchBox').value;
    console.log(searchValue);
    getDataFromApi(searchValue)
    
})

// get data from api
function getDataFromApi(title){
    fetch(`${baseUrl}/${title}`)
    .then(res => res.json())
    .then(result => showData(result))
    .catch(e=> alert("Song title not found."))
}

// show data

function showData(result) {
    const list = document.getElementById('search-result');
    list.innerHTML =
    result.data.filter((song ,index) => index<10)
    .map(lyrics =>  
        `
        <div class="single-result row align-items-center my-3 p-3">
               <div class="col-md-6">
                   <h3 id="lyrics-name">${lyrics.title}</h3>
                   <p class="author lead">Album by <span id="artist-name">${lyrics.artist.name}</span></p>
                   <p class="author lead">Album Title - <span >${lyrics.album.title}</span></p>
               </div>
               <div class="col-md-3">
                   <a target="_blank" href="${lyrics.link}"  class="btn btn-outline-success nav-link text-center">Listen song</a>
               </div>
               <div class="col-md-3 text-md-right text-center">
                   <button  class="btn btn-success" id="get-lyrics-btn" onclick="getLyricsInfo(${lyrics.id})">Get Lyrics</button>
               </div>
       </div>
   
   `).join('')

}

// Get lyrics information
function getLyricsInfo(id) {
    // console.log(id)
    const searchValue = document.getElementById('searchBox').value;
    fetch(`${baseUrl}/${searchValue}`)
    .then(res => res.json())
    .then(result => {
        result.data.map(data => {
           if (data.id === id) {
            const lyricsTitle = data.title;
            const artistName = data.artist.name;
            getLyrics(artistName, lyricsTitle)
        }
        })
        
    })
    .catch(e=>alert("please put lyrics title."))
}


// get lyrics from lyrics api
function getLyrics(name, title){
    fetch(`${lyricsApi}/${name}/${title}`)
    .then(res => res.json())
    .then(data => showLyrics(data,name, title))
    .catch(e=> alert("Lyrics not found."))
}

// show lyrics
function showLyrics(lyricsData, name ,title) {
    const lyrics = document.getElementById('lyrics-result');
    lyrics.innerHTML = 
                `
                <button class="btn go-back">&lsaquo;</button>
                <h2 class="text-success mb-4">${name} - ${title}</h2>
                <pre class="lyric text-white">
                    ${lyricsData.lyrics}
                </pre>
               `
}

