import { createSignal, createEffect, onCleanup } from 'solid-js';

const radioList = [
  { name: 'Rádio Paradise (AAC)', url: 'https://stream.radioparadise.com/aac-320' },
  { name: 'Nova Brasil FM (AAC)', url: 'https://stm.radiobrasil.stream:7042/live.aac' },
  { name: 'Jovem Pan News (MP3)', url: 'https://stm1.srvstm.com:7002/stream.mp3' },
  { name: 'Antena 1 (MP3)', url: 'https://antenaone.crossradio.com.br/stream/1/' },
  { name: 'Kiss FM (MP3)', url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/KISSFM_SC' },
  { name: 'Nacional Argentina (OGG)', url: 'https://streamingv2.shoutcast.com/Radio-Nacional-Argentina' },
  { name: 'France Culture (OGG)', url: 'https://icecast.radiofrance.fr/fculture-midfi.ogg' },
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [selectedUrl, setSelectedUrl] = createSignal(radioList[0].url);
  const [activeName, setActiveName] = createSignal(radioList[0].name);
  let audioRef: HTMLAudioElement | undefined;

  const togglePlay = () => {
    if (!audioRef) return;
    if (isPlaying()) {
      audioRef.pause();
    } else {
      audioRef.play();
    }
    setIsPlaying(!isPlaying());
  };

  const playRadio = (url: string, name: string) => {
    setSelectedUrl(url);
    setActiveName(name);
    setIsPlaying(false);
    if (audioRef) {
      audioRef.pause();
      audioRef.load();
      audioRef.play();
    }
    setIsPlaying(true);
  };

  createEffect(() => {
    if (audioRef) {
      audioRef.src = selectedUrl();
    }
  });

  onCleanup(() => {
    audioRef?.pause();
    if (audioRef) audioRef.currentTime = 0;
  });

  return (
    <div style={{ padding: '16px', background: '#111', color: '#fff', borderRadius: '8px', maxWidth: '600px' }}>
      <h2 style={{ marginBottom: '12px' }}>Testar Rádios Terrestres</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        {radioList.map((radio) => (
          <button
            style={{
              padding: '10px',
              background: radio.name === activeName() ? '#3498db' : '#2c3e50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: '1 1 45%'
            }}
            onClick={() => playRadio(radio.url, radio.name)}
          >
            {radio.name}
          </button>
        ))}
      </div>

      <audio ref={(el) => (audioRef = el)} preload="none" />

      <button
        onClick={togglePlay}
        style={{
          padding: '10px 20px',
          background: isPlaying() ? '#c0392b' : '#27ae60',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {isPlaying() ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
