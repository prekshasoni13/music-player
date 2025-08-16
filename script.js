const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volumeControl = document.getElementById('volume');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playlistEl = document.getElementById('playlist');

let isPlaying = false;
let currentSongIndex = 0;

const songs = [
    { title: "Song One", artist: "Artist One", album: "Album One", src: "song1.mp3" },
    { title: "Song Two", artist: "Artist Two", album: "Album Two", src: "song2.mp3" },
    { title: "Song Three", artist: "Artist Three", album: "Album Three", src: "song3.mp3" },
    { title: "Song Four", artist: "Artist Four", album: "Album Four", src: "song4.mp3" },
    { title: "Song Five", artist: "Artist Five", album: "Album Five", src: "song5.mp3" }
];

// Load song
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = `${song.artist} - ${song.album}`;
    audio.src = song.src;
    updatePlaylistUI();
}

// Play / Pause
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = '▶';
    } else {
        audio.play();
        playBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
}

// Next & Previous
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playBtn.textContent = '⏸';
    isPlaying = true;
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playBtn.textContent = '⏸';
    isPlaying = true;
}

// Update progress bar
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
});

// Seek functionality
progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Update Playlist UI for active song
function updatePlaylistUI() {
    const items = document.querySelectorAll('#playlist li');
    items.forEach((item, index) => {
        item.classList.toggle('active', index === currentSongIndex);
    });
}

// Render Playlist
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(song);
        audio.play();
        playBtn.textContent = '⏸';
        isPlaying = true;
    });
    playlistEl.appendChild(li);
});

// When song ends, play next
audio.addEventListener('ended', nextSong);

// Event listeners
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Initialize
loadSong(songs[currentSongIndex]);
