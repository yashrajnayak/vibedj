
# VibeDJ 🎵

A modern, responsive web application that provides a sleek DJ interface for mixing two YouTube videos side by side. Built with vanilla HTML, CSS, and JavaScript - no frameworks required!

![VibeDJ Interface](https://img.shields.io/badge/VibeDJ-YouTube%20Mixer-ff1493?style=for-the-badge&logo=youtube&logoColor=white)

## ✨ Features

### 🎧 Dual Video Players
- Side-by-side YouTube video embedding
- Individual URL input fields with auto-conversion to embed format
- Professional video player interface with custom controls

### 🎛️ Advanced Controls
- **Individual Controls**: Play/pause buttons and volume sliders for each video
- **Crossfade Mixer**: Central crossfade slider for smooth audio transitions between videos
- **Seeking**: Interactive progress bars with click/drag functionality
- **Quick Navigation**: ±10 second skip buttons for precise control
- **Time Display**: Current position and total duration for each track

### 📱 Responsive Design
- Fully responsive across desktop, tablet, and mobile devices
- Touch-friendly controls optimized for mobile interaction
- Adaptive layout that works seamlessly on all screen sizes

### 🎨 Modern UI/UX
- **Dark Theme**: Stunning gradient background (deep purple to dark blue)
- **Neon Accents**: Pink and cyan highlights for buttons and controls
- **Visual Effects**: Subtle glow effects and smooth transitions
- **Hover Animations**: Enhanced interactive feedback
- **Professional Typography**: Clean, modern font choices

### 🔧 Technical Features
- No API keys required - uses standard YouTube iframe embedding
- YouTube postMessage API integration for player control
- Vanilla JavaScript implementation (no frameworks)
- Cross-browser compatibility
- Optimized performance

## 🚀 Getting Started

### Prerequisites
- A modern web browser with JavaScript enabled
- Internet connection for YouTube video loading

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yashrajnayak/vibedj.git
   cd vibedj
   ```

2. Open `index.html` in your web browser, or serve it using a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

3. Navigate to `http://localhost:8000` in your browser

## 📖 Usage Guide

### Loading Videos
1. Paste any YouTube URL into either "Track A" or "Track B" input field
2. Click the "Load" button or press Enter
3. Wait for the video to load (loading indicator will appear)

### Basic Controls
- **Play/Pause**: Click the circular play button below each video
- **Volume**: Adjust individual volume using the sliders
- **Seeking**: Click anywhere on the progress bar or drag the handle
- **Skip**: Use the -10s/+10s buttons for quick navigation

### Crossfading
1. Use the central crossfade slider to mix between the two videos
2. Move left (A) to hear more of Track A
3. Move right (B) to hear more of Track B
4. Center position plays both tracks at equal volume

### Mobile Usage
- All controls are touch-optimized
- Swipe and tap gestures work naturally
- Progress bars support touch dragging
- Responsive layout adapts to your screen

## 📁 Project Structure

```
vibedj/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality and YouTube API integration
└── README.md           # Project documentation
```

## 🛠️ Technical Details

### YouTube Integration
- Uses YouTube Iframe API for video control
- Automatic video ID extraction from various YouTube URL formats
- Error handling for invalid URLs and failed video loads
- No API key required - uses public iframe embedding

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Optimizations
- Efficient DOM manipulation
- Throttled update loops
- Memory management for player instances
- CSS animations using hardware acceleration

## 🎯 Supported YouTube URL Formats

VibeDJ automatically extracts video IDs from various YouTube URL formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly across different browsers and devices
5. Commit your changes: `git commit -m 'Add feature-name'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

### Development Guidelines
- Follow existing code style and conventions
- Test on multiple browsers and screen sizes
- Ensure mobile responsiveness
- Add comments for complex functionality
- Update documentation as needed

### Areas for Contribution
- Additional video platform support
- Enhanced audio effects
- Playlist functionality
- Keyboard shortcuts
- Accessibility improvements
- Performance optimizations

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by Yashraj Nayak**

*VibeDJ - Where YouTube videos meet professional DJ mixing*
