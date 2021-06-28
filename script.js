const bgImage = document.getElementsByClassName('bg-image');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');

// Change background according to the song
function changeBackground(song) {
    let imageUrl = `img/${song.name}.jpg`;
    bgImage[0].style.background = `url(${imageUrl})`;
    bgImage[0].style.backgroundSize = 'cover';
    bgImage[0].style.filter = 'blur(20px)';
}

// Repeat song
let repeatOn = false;
repeatBtn.addEventListener('click', function() {
    repeatBtn.classList.toggle('on-repeat');
    repeatOn = !repeatOn;
});

// Musics 
const songs = [
    {
        name: 'taylor-1',
        displayName: 'Blank Space',
        artist: 'Taylor Swift'
    },
    {
        name: 'taylor-2',
        displayName: 'Love Story',
        artist: 'Taylor Swift'
    },
    {
        name: 'marsh',
        displayName: 'Alone',
        artist: 'Marshmello'
    },
];

// Check if Playing 
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener 
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
    changeBackground(song);
}

// Current Song 
let songIndex = 0;

// Prev Song 
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song 
function nextSong() {
    if(repeatOn) {
        songIndex--;
    }
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select Fisrt Song
loadSong(songs[songIndex]);

// On Shuffle - Select a random song
shuffleBtn.addEventListener('click', function() {
    let randomIndex = Math.floor(Math.random() * 3);
    loadSong(songs[randomIndex]);
    playSong();
});

// Update Progress Bar & Time 
function updateProgressBar(e) {
    if( isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration 
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current 
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    // console.log(e);
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);