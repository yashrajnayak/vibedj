
# VibeDJ

A modern, responsive web application that provides a sleek DJ interface for mixing two YouTube videos side by side. Built with vanilla HTML, CSS, and JavaScript - no frameworks required!

![image](https://github.com/user-attachments/assets/a6b22116-3aec-4ab0-a021-975d21e44bc3)

[![VibeDJ Interface](https://img.shields.io/badge/VibeDJ-YouTube%20Mixer-ff1493?style=for-the-badge&logo=youtube&logoColor=white)](https://yashrajnayak.dev/vibedj/)

## Getting Started 🚀

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

## Features ✨

### Dual Video Players
- Side-by-side YouTube video embedding
- Individual URL input fields with auto-conversion to embed format
- Professional video player interface with custom controls

### Controls
- Play/pause buttons and volume sliders for each video
- Central crossfade slider for smooth audio transitions between videos
- Interactive progress bars with click/drag functionality
- ±10 second skip buttons for precise control
- Current position and total duration for each track

### Modern UI/UX
- Gradient background (deep purple to dark blue)
- Hover Animations, subtle glow effects and smooth transitions
- Adaptive layout that works seamlessly on all screen sizes

### Technical Features
- No API keys required - uses standard YouTube iframe embedding
- Cross-browser compatibility
- Automatic video ID extraction from various YouTube URL formats
- Error handling for invalid URLs and failed video loads
- Efficient DOM manipulation, throttled update loops, memory management for player instances and CSS animations using hardware acceleration

### Supported YouTube URL Formats

VibeDJ automatically extracts video IDs from various YouTube URL formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`

## Project Structure 📁

```
vibedj/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality and YouTube API integration
└── README.md           # Project documentation
```

## Contributing 🤝

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

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
