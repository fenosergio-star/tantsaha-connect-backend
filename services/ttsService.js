// services/ttsService.js
export const generateBrowserAudio = (text, callback) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'mg-MG'; // Malgache si supporté
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    // Fallback vers français si malgache non disponible
    const voices = speechSynthesis.getVoices();
    const malagasyVoice = voices.find(voice => voice.lang.includes('mg'));
    const frenchVoice = voices.find(voice => voice.lang.includes('fr'));
    
    if (malagasyVoice) {
      utterance.voice = malagasyVoice;
    } else if (frenchVoice) {
      utterance.voice = frenchVoice;
      utterance.lang = 'fr-FR';
    }
    
    utterance.onend = () => callback(null);
    utterance.onerror = (error) => callback(error);
    
    speechSynthesis.speak(utterance);
    return true;
  }
  return false;
};