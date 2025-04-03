interface PlayPauseProps {
    isPlaying: boolean;
    toggle: () => void;
  }
  
  export default function PlayPause(props: PlayPauseProps) {
    return (
      <button onClick={props.toggle}>
        {props.isPlaying ? 'Pause' : 'Play'}
      </button>
    );
  }
  