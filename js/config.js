/* ============================================================
   CONFIGURATION MODULE
   Central place for all configurable constants
   ============================================================ */

export const CONFIG = {
  // Characters used during the cipher scramble animation
  cipherChars: '!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ░▒▓█▄▀■□▪▫',

  // How long (ms) the cipher animation runs before revealing text
  cipherDuration: 1000,

  // How often (ms) the cipher scramble frame updates
  cipherInterval: 40,

  // Maximum number of daily prescripts allowed per browser session/day
  dailyLimit: 10,

  // Delay (ms) after cipher ends before each character resolves
  revealCharDelay: 28,

  // Audio file paths
  audioFiles: {
    message1: './assets/audio/index_message_1.wav',
    message2: './assets/audio/index_message_2.wav',
  },

  // Image file paths
  imageFiles: {
    logo: './assets/images/index-logo.png',
  },
};
