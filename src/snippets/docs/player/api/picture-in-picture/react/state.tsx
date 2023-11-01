import { useRef } from 'react';

import { MediaPlayer, useMediaStore, type MediaPlayerInstance } from '@vidstack/react';

function Player() {
  const player = useRef<MediaPlayerInstance>(null);

  const { canPictureInPicture, pictureInPicture } = useMediaStore(player);

  return <MediaPlayer ref={player}>{/* ... */}</MediaPlayer>;
}
