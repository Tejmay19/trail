// DOM Elements
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const volumeSlider = document.getElementById('volumeSlider');
const volumePercent = document.getElementById('volumePercent');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('songTitle');
const playlist = document.getElementById('playlist');
const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const uploadMessage = document.getElementById('uploadMessage');

// State
let songs = [];
let currentSongIndex = 0;
let isPlaying = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSongs();
    setupEventListeners();
    audio.volume = 0.7;
});

// Event Listeners
function setupEventListeners() {
    playBtn.addEventListener('click', play);
    pauseBtn.addEventListener('click', pause);
    prevBtn.addEventListener('click', previousSong);
    nextBtn.addEventListener('click', nextSong);
    progressBar.addEventListener('input', seek);
    volumeSlider.addEventListener('input', changeVolume);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', nextSong);
    uploadForm.addEventListener('submit', handleUpload);
}

// Load Songs from Backend
async function loadSongs() {
    try {
        const response = await fetch('/api/songs');
        songs = await response.json();
        renderPlaylist();
    } catch (error) {
        console.error('Error loading songs:', error);
        showMessage('Error loading songs', 'error');
    }
}

// Render Playlist
function renderPlaylist() {
    if (songs.length === 0) {
        playlist.innerHTML = '<p class="empty-playlist">No songs uploaded yet. Upload some music to get started!</p>';
        return;
    }

    playlist.innerHTML = songs.map((song, index) => `
        <div class="playlist-item ${index === currentSongIndex ? 'active' : ''}" data-index="${index}">
            <span class="playlist-item-name">${song.title}</span>
            <button class="playlist-item-delete" onclick="deleteSong(event, '${song.filename}')">Delete</button>
        </div>
    `).join('');

    // Add click listeners
    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('playlist-item-delete')) {
                playSong(index);
            }
        });
    });
}

// Play Song
function playSong(index) {
    if (index < 0 || index >= songs.length) return;

    currentSongIndex = index;
    const song = songs[currentSongIndex];

    audio.src = song.url;
    audio.play();
    isPlaying = true;

    playBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
    songTitle.textContent = song.title;

    renderPlaylist(); // Update active state
}

// Play / Pause
function play() {
    if (songs.length === 0) {
        showMessage('Please upload a song first', 'error');
        return;
    }
    if (audio.src) {
        audio.play();
    } else {
        playSong(0);
    }
    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
}

function pause() {
    audio.pause();
    isPlaying = false;
    playBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
}

// Next / Previous
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
}

// Seek
function seek() {
    const time = (progressBar.value / 100) * audio.duration;
    audio.currentTime = time;
}

// Update Progress Bar
function updateProgress() {
    if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
}

// Update Duration
function updateDuration() {
    durationEl.textContent = formatTime(audio.duration);
}

// Change Volume
function changeVolume() {
    audio.volume = volumeSlider.value / 100;
    volumePercent.textContent = volumeSlider.value + '%';
}

// Format Time
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Handle Upload
async function handleUpload(e) {
    e.preventDefault();

    const file = fileInput.files[0];
    if (!file) {
        showMessage('Please select a file', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Song uploaded successfully!', 'success');
            fileInput.value = ''; // Clear input
            loadSongs(); // Reload playlist
        } else {
            showMessage(data.error || 'Upload failed', 'error');
        }
    } catch (error) {
        console.error('Upload error:', error);
        showMessage('Error uploading file', 'error');
    }
}

// Delete Song
async function deleteSong(e, filename) {
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this song?')) return;

    try {
        const response = await fetch(`/api/delete/${filename}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showMessage('Song deleted successfully', 'success');
            loadSongs();
            if (currentSongIndex >= songs.length) {
                currentSongIndex = Math.max(0, songs.length - 1);
                audio.pause();
                playBtn.style.display = 'flex';
                pauseBtn.style.display = 'none';
                songTitle.textContent = 'No song selected';
            }
        } else {
            showMessage('Error deleting song', 'error');
        }
    } catch (error) {
        console.error('Delete error:', error);
        showMessage('Error deleting song', 'error');
    }
}

// Show Message
function showMessage(text, type) {
    uploadMessage.textContent = text;
    uploadMessage.className = `message ${type}`;
    setTimeout(() => {
        uploadMessage.className = 'message';
    }, 3000);
}
