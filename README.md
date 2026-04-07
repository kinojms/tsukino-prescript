# The Index — Prescript Terminal

A mystical, terminal-style Progressive Web App (PWA) that delivers cryptic productivity directives and serves as a daily task management tool with atmospheric UI effects.

## Features

- **Cryptic Prescripts**: Receive mysterious productivity directives with cipher animations
- **Daily Limits**: 10 prescripts per day to maintain mystery
- **Task Management**: Add, complete, and track daily tasks
- **PWA Support**: Install as mobile app with offline functionality
- **Push Notifications**: Random prescript notifications throughout the day
- **Atmospheric Design**: Terminal-style UI with CRT effects and audio

## Project Structure

```
tsukino-prescript/
├── index.html                    # Main entry point
├── manifest.json                 # PWA manifest
├── sw.js                         # Service worker
├── README.md                     # This file
├── css/
│   └── style.css                 # All styling
├── js/
│   ├── main.js                   # Entry point & orchestration
│   ├── config.js                 # Configuration constants
│   ├── prescripts.js             # Prescript data & random selector
│   ├── state.js                  # Global state management
│   ├── dom.js                    # DOM element references
│   ├── clock.js                  # Time & ID generation
│   ├── animation.js              # Cipher animation engine
│   ├── audio.js                  # Audio playback logic
│   ├── ui.js                     # UI state updates
│   ├── notifications.js          # PWA notification handling
│   └── tasks-ui.js               # Task management UI
├── assets/
│   ├── audio/
│   │   ├── index_message_1.wav
│   │   └── index_message_2.wav
│   └── images/
│       └── index-logo.png
```

## Module Breakdown

| Module | Purpose |
|--------|---------|
| **main.js** | Application entry point, event listeners, and orchestration |
| **config.js** | Centralized configuration (timings, paths, characters) |
| **prescripts.js** | Array of prescripts and random selection function |
| **state.js** | Global application state (counters, timers, loading flags) |
| **dom.js** | Caching of DOM element references for performance |
| **clock.js** | Timestamp updates and prescript ID generation |
| **animation.js** | Cipher scramble and letter reveal animation engine |
| **audio.js** | Audio file playback and sequencing |
| **ui.js** | UI state changes and visual updates |
| **notifications.js** | PWA notification handling |
| **tasks-ui.js** | Task management UI |

## Installation (PWA)

### Mobile Installation
1. **Open in Browser**: Visit the app URL in Chrome/Safari/Edge
2. **Install Prompt**: Look for "Add to Home Screen" or install banner
3. **Manual Install**:
   - Chrome: Menu → "Add to Home Screen"
   - Safari: Share → "Add to Home Screen"
   - Edge: Menu → "Apps" → "Install this site as an app"
4. **Grant Permissions**: Allow notifications when prompted

### Desktop Installation
1. **Open in Browser**: Visit the app URL in Chrome/Edge
2. **Install**: Click the install icon in the address bar or use menu
3. **Grant Permissions**: Allow notifications

## Usage

### Prescripts
- **Manual**: Click "RECEIVE NEW PRESCRIPT" or press Enter
- **Daily Limit**: 10 prescripts per day (resets at midnight)
- **Notifications**: Random prescripts delivered throughout the day (when app is open)

### Tasks
- **Add Tasks**: Type in the input field and click "ADD" or press Enter
- **Complete Tasks**: Check the checkbox next to completed tasks
- **Delete Tasks**: Click the × button to remove tasks
- **Suggestions**: Click "GET SUGGESTIONS" for AI-generated task ideas
- **Persistence**: Tasks are saved locally and persist across sessions

### Notifications
- **Permission**: Grant notification permission when prompted
- **Frequency**: Random notifications every 2-4 hours when app is active
- **Background**: Limited by PWA constraints - works best when app is open

## CSS Organization

All styles are in `css/style.css` with clear sections:
- CSS Custom Properties (theming variables)
- Reset & Base
- CRT Overlay effects
- Main layout
- Component styling
- Animations
- Responsive adjustments

## How to Use

1. **Open the terminal**: Open `index.html` in a web browser
2. **Receive a prescript**: Click "RECEIVE NEW PRESCRIPT" button or press Enter
3. **Watch the animation**: The prescript text will:
   - Cipher scramble for ~1 second
   - Letter-by-letter reveal
   - Show a blinking cursor at the end
4. **Manage Tasks**: Add daily tasks using the task input below the prescript area
5. **Install as App**: Use the browser's "Add to Home Screen" feature for mobile app experience
6. **Grant Notifications**: Allow notifications for random prescript delivery

## Adding New Prescripts

Edit `js/prescripts.js` and add entries to the `PRESCRIPTS` array:

```javascript
export const PRESCRIPTS = [
  "Your new prescript here...",
  // ... existing prescripts
];
```

## Customization

### Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
  --bg: #000000;
  --primary: #4facff;
  --danger: #ff3c3c;
  /* ... etc */
}
```

### Timing
Edit `js/config.js`:
```javascript
export const CONFIG = {
  cipherDuration: 1000,    // Cipher animation length
  cipherInterval: 40,      // Cipher scramble speed
  revealCharDelay: 28,     // Letter reveal speed
};
```

### Audio Files
Replace audio files in `assets/audio/`:
- `index_message_1.wav` - Initial transmission sound
- `index_message_2.wav` - Looping transmission sound

### Logo
Replace the logo in `assets/images/index-logo.png`

## Technical Details

### PWA Features
- **Offline Support**: Service worker caches all assets
- **Installable**: Can be installed as standalone app
- **Notifications**: Push notifications with prescript content
- **Responsive**: Works on mobile and desktop

### Limitations
- **Background Notifications**: PWA notifications only work when app is open
- **Storage**: Uses localStorage (limited to ~5-10MB)
- **Push Notifications**: Requires server for true push (current implementation is client-side only)

### Browser Support
- Chrome 70+
- Firefox 68+
- Safari 12.1+
- Edge 79+

## Performance Notes

- DOM elements are cached for performance
- Timers are cleared between animations to prevent memory leaks
- CSS animations use GPU acceleration
- Total CSS payload: ~10KB
- Total JS payload: ~8KB (uncompressed, unminified)

## Architecture Benefits

✅ **Modular**: Each concern is separated into its own file
✅ **Maintainable**: Easy to locate and modify specific functionality
✅ **Scalable**: Simple to add features without cluttering main file
✅ **Testable**: Individual modules can be unit tested
✅ **Readable**: Clear separation of concerns with descriptive names

## Future Enhancements

### For Better Mobile Experience
1. **Native App**: Convert to React Native or Flutter for true background notifications
2. **Push Server**: Implement server-side push notifications
3. **Background Sync**: Use Service Worker background sync for offline task sync
4. **Task Reminders**: Set custom reminders for tasks
5. **Prescript Scheduling**: Allow users to schedule prescript delivery times

### Productivity Features
1. **Task Categories**: Organize tasks by type (work, personal, health)
2. **Progress Tracking**: Weekly/monthly productivity analytics
3. **Prescript History**: View past prescripts
4. **Custom Prescripts**: Allow users to add their own directives
5. **Integration**: Connect with calendar apps for task scheduling

---

*"The City watches. The City waits. The City remembers."*
