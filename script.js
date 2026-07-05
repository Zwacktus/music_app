// ==========================
// Songs
// ==========================

const songs = [
{
    title: "Wahre Begebenheiten",
    artist: "feat. AK Ausserkontrolle",
    file: "songs/Wahre Begebenheiten (feat. AK Ausserkontrolle).mp3",
    cover: "img/song.jpg"
},
{
    title: "FMFL 2.0",
    artist: "feat. AK Ausserkontrolle",
    file: "songs/FMFL 2.0 - 18 Karat.mp3",
    cover: "img/song.jpg"
}
];

// ==========================
// Elemente
// ==========================

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");

const title = document.querySelector(".song-info h3");
const artist = document.querySelector(".song-info span");
const cover = document.querySelector(".song-info img");

const playButtons = document.querySelectorAll(".big-play i,.play-btn i");

let currentSong = 0;
let playing = false;

// ==========================
// Song laden
// ==========================

function loadSong(index){

    audio.src = songs[index].file;

    title.textContent = songs[index].title;

    artist.textContent = songs[index].artist;

    cover.src = songs[index].cover;

}

loadSong(currentSong);

// ==========================
// Play / Pause
// ==========================

function playSong(){

    if(playing){

        audio.pause();

        playButtons.forEach(btn=>{
            btn.className="fa-solid fa-play";
        });

        playing=false;

    }else{

        audio.play();

        playButtons.forEach(btn=>{
            btn.className="fa-solid fa-pause";
        });

        playing=true;

    }

}

// ==========================
// Vorheriger Song
// ==========================

function previousSong(){

    currentSong--;

    if(currentSong<0){

        currentSong=songs.length-1;

    }

    loadSong(currentSong);

    audio.play();

    playing=true;

}

// ==========================
// Nächster Song
// ==========================

function nextSong(){

    currentSong++;

    if(currentSong>=songs.length){

        currentSong=0;

    }

    loadSong(currentSong);

    audio.play();

    playing=true;

}

// Song zu Ende

audio.addEventListener("ended",nextSong);

// ==========================
// Fortschritt
// ==========================

audio.addEventListener("timeupdate",()=>{

    progress.max=audio.duration||0;

    progress.value=audio.currentTime;

    currentTimeText.textContent=format(audio.currentTime);

    durationText.textContent=format(audio.duration);

});

progress.addEventListener("input",()=>{

    audio.currentTime=progress.value;

});

// ==========================
// Lautstärke
// ==========================

volume.addEventListener("input",()=>{

    audio.volume=volume.value;

});

// ==========================
// Zeit formatieren
// ==========================

function format(sec){

    if(isNaN(sec)) return "0:00";

    const m=Math.floor(sec/60);

    const s=Math.floor(sec%60);

    return m+":"+(s<10?"0"+s:s);

}

// ==========================
// Suche
// ==========================

const search=document.getElementById("search");

search.addEventListener("keyup",()=>{

    const value=search.value.toLowerCase();

    document.querySelectorAll(".music-card").forEach(card=>{

        const text=card.innerText.toLowerCase();

        if(text.includes(value)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

});

// ==========================
// Leertaste = Play/Pause
// ==========================

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        playSong();

    }

});

// ==========================
// Taste ← →
 // ==========================

document.addEventListener("keydown",(e)=>{

    if(e.code==="ArrowRight"){

        nextSong();

    }

    if(e.code==="ArrowLeft"){

        previousSong();

    }

});