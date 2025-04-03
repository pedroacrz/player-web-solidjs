export interface PlayerProps {
    src: string;
    title?: string;
    artist?: string;
    autoPlay?: boolean;
    onPlay?: () => void;
    onPause?: () => void;
  }
  