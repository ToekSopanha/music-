// Tracks array with music info
const tracks = [
  {
    src: 'music/Jumping Machine (跳楼机)-yt.savetube.me.mp3',
    title: 'Jumping Machine',
    img: 'images/Jumping_machine.webp'
  },
  {
    src: 'music/陳之 - Letting Go（女版）「letting go我終於捨得為你放開手」【動態歌詞】♪-yt.savetube.me.mp3',
    title: '陳之 - Letting Go（女版）',
    img: 'images/Letting_go.jpg'
  },
  {
    src: 'music/yt1z.net - GooGoo - 可能是风太大了吧 (320 KBps).mp3',
    title: '可能是风太大了吧',
    img: 'images/可能是风太大了吧.jpg'
  },
  {
    src: 'music/yt1z.net - Percy - Shall we feat. 4ourYou GENA DESOUZA (Official Lyrics Video) (320 KBps).mp3',
    title: 'Shall we feat',
    img: 'images/Shall_we_feat.jpg'
  },
  {
    src : 'music/Radiohead - Fake Plastic Trees [HQ] [TsvL2poCHug].mp3',
    title: 'Radiohead - Fake Plastic Trees',
    img: 'images/1900x1900-000000-80-0-0.jpg'
  },
  {
    src : 'music/Queen – Bohemian Rhapsody (Lyrics) [yk3prd8GER4].mp3',
    title: 'Queen – Bohemian Rhapsody',
    img: 'images/Queen – Bohemian Rhapsody.jpg'
  },
  {
    src : 'music/Billy Joel - Piano Man (Official Audio) [QwVjTlTdIDQ].mp3',
    title: 'Billy Joel - Piano Man',
    img: 'images/Billy Joel - Piano Man.jpg'
  },
  {
    src : 'music/Tena - ប្រពន្ធ_កំសត់_ [iw8igAmrg24].mp3',
    title: 'Tena - ប្រពន្ធ_កំសត់',
    img: 'images/Tena - ប្រពន្ធ_កំសត់.jpg'
  },
  {
    src : 'music/សុីឈ្នួលថែសង្សារគេ _( Live acoustic cover ) [u7M4TP4Ugz8].mp3',
    title: 'សុីឈ្នួលថែសង្សារគេ',
    img: 'images/សុីឈ្នួលថែសង្សារគេ.jpg'
  },
  {
    src : 'music/ច្រណែន (อิจฉา) - noahyuth (Lyrics Video) [6oTTZRo5WZE].mp3',
    title: 'ច្រណែន (อิจฉา) - noahyuth',
    img: 'images/ច្រណែន (อิจฉา) - noahyuth.jpg'
  },
  {
    src : 'music/Tena - កង់សាគួរ Korng Sakour, [Official Audio] +Lyrics [cOknyMmwk7o].mp3',
    title: 'Tena - កង់សាគួរ Korng Sakour',
    img: 'images/Tena - កង់សាគួរ Korng Sakour.jpg'
  },
  {
    src : 'music/Tena - Love Is Singular [Official Audio] +Lyrics [aDJBA_phjKU].mp3',
    title: 'Tena - Love Is Singular',
    img: 'images/Tena - Love Is Singular.jpg'
  },
];

// Initialize current track index
let currentTrackIndex = 0;
const audio = document.getElementById('audioPlayer');

// Retrieve the history from localStorage or initialize an empty array
let history = JSON.parse(localStorage.getItem('history')) || [];

// Display tracks on the page
function displayTracks(filteredTracks) {
  const trackList = document.getElementById('trackList');
  trackList.innerHTML = '';

  filteredTracks.forEach(track => {
    const trackElement = document.createElement('div');
    trackElement.classList.add('track');
    trackElement.onclick = function () {
      playSong(track.src, track.title);
    };

    trackElement.innerHTML = `
      <img src="${track.img}" alt="Album Cover">
      <p>${track.title}</p>
    `;

    trackList.appendChild(trackElement);
  });
}

// Display discover section (e.g., playlists, artists)
function displayDiscover() {
  const discoverGrid = document.getElementById('discoverGrid');
  const featuredItems = [
    { img: 'images/Feature.png', title: 'Featured Playlist 1' },
    { img: 'images/Feature.png', title: 'Featured Playlist 2' },
    { img: 'images/Feature.png', title: 'Featured Playlist 3' },
  ];

  featuredItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('discover-item');
    itemElement.innerHTML = `
      <img src="${item.img}" alt="Playlist">
      <p>${item.title}</p>
    `;
    discoverGrid.appendChild(itemElement);
  });
}

// Search music based on input
function searchMusic() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredTracks = tracks.filter(track => track.title.toLowerCase().includes(searchInput));
  displayTracks(filteredTracks);
}

// Play selected song
function playSong(src, title) {
  audio.src = src;
  audio.play();
  document.getElementById('nowPlaying').innerText = `Now Playing: ${title}`;

  // Add song to history if not already present
  addToHistory(src, title);
}

// Add song to history and save to localStorage
function addToHistory(src, title) {
  // Prevent adding the same song multiple times
  if (!history.some(track => track.src === src)) {
    history.push({ src, title, img: 'path/to/song-image.jpg' }); // Ensure you have the image path
    localStorage.setItem('history', JSON.stringify(history)); // Store in localStorage
  }
}

// Display the history section
function displayHistory() {
  const historyContainer = document.getElementById('historyList');
  historyContainer.innerHTML = ''; // Clear current history
  
  if (history.length === 0) {
    historyContainer.innerHTML = '<p>No songs in history</p>';
    return;
  }

  history.forEach(track => {
    const historyElement = document.createElement('div');
    historyElement.classList.add('history-item');
    historyElement.innerHTML = `
      <img src="${track.img}" alt="Album Cover" />
      <p>${track.title}</p>
    `;
    historyContainer.appendChild(historyElement);
  });
}

// Play/Pause track
function playPauseTrack() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// Next track
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  playSong(tracks[currentTrackIndex].src, tracks[currentTrackIndex].title);
}

// Previous track
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  playSong(tracks[currentTrackIndex].src, tracks[currentTrackIndex].title);
}

// Set volume
function setVolume() {
  audio.volume = document.getElementById('volumeControl').value / 100;
}

// Initialize
displayTracks(tracks);
displayDiscover();

// Initialize history page (if on the history page)
if (document.getElementById('historyList')) {
  displayHistory();
}
