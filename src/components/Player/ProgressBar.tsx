interface ProgressBarProps {
    current: number;
    duration: number;
  }
  
  export default function ProgressBar(props: ProgressBarProps) {
    const percent = () =>
      props.duration ? (props.current / props.duration) * 100 : 0;
  
    return (
      <div class="progress-bar">
        <div class="progress" style={{ width: `${percent()}%` }}></div>
      </div>
    );
  }
  