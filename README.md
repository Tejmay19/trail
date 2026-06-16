# 🎵 Web-Based Song Player

A simple web-based music player built with Flask and vanilla JavaScript. Upload, organize, and play your favorite songs!

## ✨ Features

- 🎶 Upload MP3 files
- ▶️ Play, pause, stop controls
- 📋 Playlist management
- 🔊 Volume control
- ⏱️ Progress bar with seek functionality
- 🔄 Next/Previous track navigation
- 📱 Responsive design

## 🛠️ Tech Stack

- **Backend:** Flask (Python)
- **Frontend:** HTML5, CSS3, JavaScript
- **Audio:** HTML5 Audio API
- **Storage:** Local file system

## 📦 Installation

### Prerequisites
- Python 3.7+
- pip

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Tejmay19/trail.git
cd trail
git checkout song-player
```

2. **Create a virtual environment**
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Run the application**
```bash
python app.py
```

5. **Open your browser**
```
http://localhost:5000
```

## 📁 Project Structure

```
song-player/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── static/
│   ├── css/
│   │   └── style.css     # Styling
│   └── js/
│       └── script.js     # Frontend logic
├── templates/
│   └── index.html        # Main page
└── uploads/              # Where uploaded songs are stored
```

## 🎯 Usage

1. **Upload Songs:**
   - Click "Choose File" to select an MP3
   - Click "Upload" to add it to your library

2. **Play Music:**
   - Click on any song in the playlist
   - Use the player controls (play, pause, next, previous)

3. **Control Playback:**
   - Adjust volume with the volume slider
   - Seek through the song using the progress bar
   - View current time and total duration

## 🚀 Future Enhancements

- [ ] Shuffle and repeat modes
- [ ] Create multiple playlists
- [ ] Delete songs from library
- [ ] Search/filter songs
- [ ] Persistent storage (database)
- [ ] Dark mode theme
- [ ] Mobile app version
- [ ] Equalizer controls

## 💡 Tips for Beginners

- Start by understanding the Flask routes in `app.py`
- Modify `style.css` to customize the look
- Experiment with `script.js` to add new features
- Use browser DevTools (F12) to debug JavaScript

## 📝 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

This is a personal hobby project, but feel free to fork and improve it!

---

**Happy listening! 🎶**