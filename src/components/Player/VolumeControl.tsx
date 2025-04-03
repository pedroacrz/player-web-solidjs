interface VolumeControlProps {
    volume: number;
    setVolume: (value: number) => void;
  }
  
  export default function VolumeControl(props: VolumeControlProps) {
    return (
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={props.volume}
        onInput={(e) => props.setVolume(parseFloat(e.currentTarget.value))}
      />
    );
  }
  