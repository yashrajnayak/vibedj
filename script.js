class VibeDJ {
    constructor() {
        this.players = {
            1: null,
            2: null
        };
        this.playerStates = {
            1: { ready: false, playing: false, duration: 0, currentTime: 0 },
            2: { ready: false, playing: false, duration: 0, currentTime: 0 }
        };
        this.isDragging = { 1: false, 2: false };
        this.updateInterval = null;
        this.playlist = [];
        this.loadedTracks = { 1: null, 2: null };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadYouTubeAPI();
    }

    loadYouTubeAPI() {
        window.onYouTubeIframeAPIReady = () => {
            console.log('YouTube API Ready');
        };
    }

    setupEventListeners() {
        // Playlist functionality
        document.getElementById('add-to-playlist').addEventListener('click', () => this.addToPlaylist());
        document.getElementById('playlist-url').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addToPlaylist();
        });

        // Play/Pause buttons
        document.getElementById('play1').addEventListener('click', () => this.togglePlayPause(1));
        document.getElementById('play2').addEventListener('click', () => this.togglePlayPause(2));

        // Volume controls
        document.getElementById('volume1').addEventListener('input', (e) => this.setVolume(1, e.target.value));
        document.getElementById('volume2').addEventListener('input', (e) => this.setVolume(2, e.target.value));

        // Crossfade
        document.getElementById('crossfade').addEventListener('input', (e) => this.updateCrossfade(e.target.value));

        // Skip controls
        document.getElementById('backward1').addEventListener('click', () => this.skip(1, -10));
        document.getElementById('forward1').addEventListener('click', () => this.skip(1, 10));
        document.getElementById('backward2').addEventListener('click', () => this.skip(2, -10));
        document.getElementById('forward2').addEventListener('click', () => this.skip(2, 10));

        // Progress bar interactions
        this.setupProgressBarListeners(1);
        this.setupProgressBarListeners(2);

        // Start update loop
        this.startUpdateLoop();
    }

    extractVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    async getVideoTitle(videoId) {
        try {
            // Use YouTube oEmbed API to get video title
            const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
            if (response.ok) {
                const data = await response.json();
                return data.title || `YouTube Video - ${videoId}`;
            }
        } catch (error) {
            console.log('Could not fetch video title, using fallback');
        }
        return `YouTube Video - ${videoId}`;
    }

    async addToPlaylist() {
        const urlInput = document.getElementById('playlist-url');
        const url = urlInput.value.trim();
        
        if (!url) {
            alert('Please enter a YouTube URL');
            return;
        }

        const videoId = this.extractVideoId(url);
        if (!videoId) {
            alert('Invalid YouTube URL. Please enter a valid YouTube video URL.');
            return;
        }

        // Check if already in playlist
        if (this.playlist.find(item => item.videoId === videoId)) {
            alert('This video is already in your playlist');
            return;
        }

        // Show loading state
        const addBtn = document.getElementById('add-to-playlist');
        const originalText = addBtn.textContent;
        addBtn.textContent = 'Loading...';
        addBtn.disabled = true;

        try {
            const title = await this.getVideoTitle(videoId);
            const playlistItem = {
                id: Date.now(),
                videoId,
                title,
                url,
                thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
            };

            this.playlist.push(playlistItem);
            this.renderPlaylist();
            urlInput.value = '';
        } catch (error) {
            alert('Failed to add video to playlist. Please try again.');
        } finally {
            addBtn.textContent = originalText;
            addBtn.disabled = false;
        }
    }

    renderPlaylist() {
        const container = document.getElementById('playlist-items');
        
        if (this.playlist.length === 0) {
            container.innerHTML = '<div class="playlist-empty"><p>No tracks in playlist. Add some YouTube videos to get started!</p></div>';
            return;
        }

        container.innerHTML = this.playlist.map(item => `
            <div class="playlist-item" data-id="${item.id}">
                <img src="${item.thumbnail}" alt="Thumbnail" class="playlist-thumbnail" 
                     onerror="this.style.display='none'">
                <div class="playlist-info">
                    <div class="playlist-title">${this.escapeHtml(item.title)}</div>
                    <div class="playlist-url">${item.url}</div>
                </div>
                <div class="playlist-actions">
                    <button class="action-btn load-a" onclick="vibeDJ.loadToPlayer(1, '${item.videoId}', '${this.escapeHtml(item.title)}')">
                        Load A
                    </button>
                    <button class="action-btn load-b" onclick="vibeDJ.loadToPlayer(2, '${item.videoId}', '${this.escapeHtml(item.title)}')">
                        Load B
                    </button>
                    <button class="action-btn remove" onclick="vibeDJ.removeFromPlaylist(${item.id})">
                        Remove
                    </button>
                </div>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    removeFromPlaylist(itemId) {
        this.playlist = this.playlist.filter(item => item.id !== itemId);
        this.renderPlaylist();
    }

    loadToPlayer(playerNum, videoId, title) {
        // Show loading state
        const overlay = document.getElementById(`overlay${playerNum}`);
        overlay.classList.remove('hidden');
        overlay.innerHTML = '<div class="play-icon loading">⟳</div><p>Loading video...</p>';

        // Update track info with proper title
        document.getElementById(`track-info-${playerNum}`).textContent = title;

        // Destroy existing player if it exists
        if (this.players[playerNum]) {
            this.players[playerNum].destroy();
        }

        // Store loaded track info
        this.loadedTracks[playerNum] = { videoId, title };

        // Create new player
        this.players[playerNum] = new YT.Player(`player${playerNum}`, {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'rel': 0,
                'showinfo': 0,
                'modestbranding': 1,
                'playsinline': 1
            },
            events: {
                'onReady': (event) => this.onPlayerReady(event, playerNum),
                'onStateChange': (event) => this.onPlayerStateChange(event, playerNum),
                'onError': (event) => this.onPlayerError(event, playerNum)
            }
        });
    }

    onPlayerReady(event, playerNum) {
        console.log(`Player ${playerNum} ready`);
        this.playerStates[playerNum].ready = true;
        this.playerStates[playerNum].duration = event.target.getDuration();
        
        // Hide overlay
        const overlay = document.getElementById(`overlay${playerNum}`);
        overlay.classList.add('hidden');
        
        // Enable controls
        this.enableControls(playerNum);
        
        // Update duration display
        document.getElementById(`duration${playerNum}`).textContent = this.formatTime(this.playerStates[playerNum].duration);
        
        // Set initial volume based on crossfade
        this.updateCrossfade(document.getElementById('crossfade').value);
    }

    onPlayerStateChange(event, playerNum) {
        const playing = event.data === YT.PlayerState.PLAYING;
        this.playerStates[playerNum].playing = playing;
        
        // Update play button
        const playBtn = document.getElementById(`play${playerNum}`);
        const playIcon = playBtn.querySelector('.play-icon');
        playIcon.textContent = playing ? '⏸' : '▶';
    }

    onPlayerError(event, playerNum) {
        console.error(`Player ${playerNum} error:`, event.data);
        const overlay = document.getElementById(`overlay${playerNum}`);
        overlay.classList.remove('hidden');
        overlay.innerHTML = '<div class="play-icon">⚠</div><p>Failed to load video</p>';
    }

    enableControls(playerNum) {
        document.getElementById(`play${playerNum}`).disabled = false;
        document.getElementById(`volume${playerNum}`).disabled = false;
        document.getElementById(`backward${playerNum}`).disabled = false;
        document.getElementById(`forward${playerNum}`).disabled = false;
    }

    togglePlayPause(playerNum) {
        if (!this.players[playerNum] || !this.playerStates[playerNum].ready) return;

        if (this.playerStates[playerNum].playing) {
            this.players[playerNum].pauseVideo();
        } else {
            this.players[playerNum].playVideo();
        }
    }

    setVolume(playerNum, volume) {
        if (!this.players[playerNum] || !this.playerStates[playerNum].ready) return;

        // Update volume display
        document.getElementById(`volumeValue${playerNum}`).textContent = `${volume}%`;
        
        // Apply crossfade calculation
        const crossfadeValue = parseInt(document.getElementById('crossfade').value);
        let actualVolume = volume;
        
        if (playerNum === 1) {
            actualVolume = volume * (1 - crossfadeValue / 100);
        } else {
            actualVolume = volume * (crossfadeValue / 100);
        }
        
        this.players[playerNum].setVolume(actualVolume);
    }

    updateCrossfade(value) {
        document.getElementById('crossfadeValue').textContent = `${value}%`;
        
        // Update volumes for both players
        if (this.playerStates[1].ready) {
            const volume1 = document.getElementById('volume1').value;
            this.setVolume(1, volume1);
        }
        
        if (this.playerStates[2].ready) {
            const volume2 = document.getElementById('volume2').value;
            this.setVolume(2, volume2);
        }
    }

    skip(playerNum, seconds) {
        if (!this.players[playerNum] || !this.playerStates[playerNum].ready) return;

        const currentTime = this.players[playerNum].getCurrentTime();
        const newTime = Math.max(0, Math.min(currentTime + seconds, this.playerStates[playerNum].duration));
        this.players[playerNum].seekTo(newTime, true);
    }

    setupProgressBarListeners(playerNum) {
        const progressBar = document.getElementById(`progress${playerNum}`);
        const progressHandle = document.getElementById(`progressHandle${playerNum}`);
        
        const handleInteraction = (e) => {
            if (!this.players[playerNum] || !this.playerStates[playerNum].ready) return;
            
            const rect = progressBar.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            const newTime = percentage * this.playerStates[playerNum].duration;
            
            this.players[playerNum].seekTo(newTime, true);
            this.updateProgressBar(playerNum, percentage * 100);
        };

        // Mouse events
        progressBar.addEventListener('mousedown', (e) => {
            this.isDragging[playerNum] = true;
            handleInteraction(e);
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isDragging[playerNum]) {
                handleInteraction(e);
            }
        });

        document.addEventListener('mouseup', () => {
            this.isDragging[playerNum] = false;
        });

        // Touch events for mobile
        progressBar.addEventListener('touchstart', (e) => {
            this.isDragging[playerNum] = true;
            const touch = e.touches[0];
            handleInteraction(touch);
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (this.isDragging[playerNum]) {
                const touch = e.touches[0];
                handleInteraction(touch);
                e.preventDefault();
            }
        });

        document.addEventListener('touchend', () => {
            this.isDragging[playerNum] = false;
        });
    }

    updateProgressBar(playerNum, percentage) {
        const progressFill = document.getElementById(`progressFill${playerNum}`);
        const progressHandle = document.getElementById(`progressHandle${playerNum}`);
        
        progressFill.style.width = `${percentage}%`;
        progressHandle.style.left = `${percentage}%`;
    }

    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    startUpdateLoop() {
        this.updateInterval = setInterval(() => {
            [1, 2].forEach(playerNum => {
                if (this.players[playerNum] && this.playerStates[playerNum].ready && !this.isDragging[playerNum]) {
                    try {
                        const currentTime = this.players[playerNum].getCurrentTime();
                        const duration = this.playerStates[playerNum].duration;
                        
                        if (currentTime >= 0 && duration > 0) {
                            this.playerStates[playerNum].currentTime = currentTime;
                            
                            // Update time display
                            document.getElementById(`currentTime${playerNum}`).textContent = this.formatTime(currentTime);
                            
                            // Update progress bar
                            const percentage = (currentTime / duration) * 100;
                            this.updateProgressBar(playerNum, percentage);
                        }
                    } catch (error) {
                        console.error(`Error updating player ${playerNum}:`, error);
                    }
                }
            });
        }, 1000);
    }
}

// Initialize the application when the page loads
let vibeDJ;
document.addEventListener('DOMContentLoaded', () => {
    vibeDJ = new VibeDJ();
});
