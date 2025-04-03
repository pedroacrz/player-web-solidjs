import { createSignal, onCleanup } from 'solid-js';
import type { PlayerProps } from './Player.interface';
import PlayPause from './PlayPause';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import {
  playerContainerStyle,
  titleStyle,
  artistStyle,
  controlsStyle,
  progressBarContainerStyle,
  progressBarStyle
} from './Player.styles';

export default function Player(props: PlayerProps) {
  let audioRef: HTMLAudioElement | undefined;

  const [isPlaying, setIsPlaying] = createSignal(false);
  const [currentTime, setCurrentTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);
  const [volume, setVolume] = createSignal(1);

  const togglePlay = () => {
    if (!audioRef) return;
    if (isPlaying()) {
      audioRef.pause();
      props.onPause?.();
    } else {
      audioRef.play();
      props.onPlay?.();
    }
    setIsPlaying(!isPlaying());
  };

  const onTimeUpdate = () => {
    if (audioRef) setCurrentTime(audioRef.currentTime);
  };

  const onLoadedMetadata = () => {
    if (audioRef) setDuration(audioRef.duration);
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    if (audioRef) audioRef.volume = v;
  };

  onCleanup(() => {
    audioRef?.pause();
    audioRef && (audioRef.currentTime = 0);
  });

  return (
    <div style={playerContainerStyle}>
      <audio
        ref={audioRef}
        src={props.src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        autoplay={props.autoPlay}
      />
      <div style={controlsStyle}>
        <h3 style={titleStyle}>{props.title}</h3>
        <p style={artistStyle}>{props.artist}</p>
        <PlayPause isPlaying={isPlaying()} toggle={togglePlay} />
        <div style={progressBarContainerStyle}>
          <div
            style={{
              ...progressBarStyle,
              width: `${(currentTime() / duration()) * 100 || 0}%`
            }}
          />
        </div>
        <VolumeControl volume={volume()} setVolume={handleVolumeChange} />
      </div>
    </div>
  );
}
