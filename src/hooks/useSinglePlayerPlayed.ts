import { useEffect, useRef } from 'react';
import { v4 as uuid4 } from 'uuid';

export type PlayerControlsType = { stop: () => void };

class GlobalPlayMediaManager {
  players: Array<{ id: string; playerControls: PlayerControlsType }> = [];

  registerPlayer(id: string, playerControls: PlayerControlsType) {
    this.players = [...this.players, { id, playerControls }];
  }

  removePlayer(id: string) {
    this.players = this.players.filter((player) => player.id === id);
  }

  playPlayer(id: string) {
    this.players.forEach((player) => {
      if (player.id !== id) {
        player.playerControls.stop();
      }
    });
  }
}

const globalPlayMediaManager = new GlobalPlayMediaManager();

const useSinglePlayerPlayed = (playerControls: PlayerControlsType) => {
  const playerIdRef = useRef(uuid4());

  useEffect(() => {
    globalPlayMediaManager.registerPlayer(playerIdRef.current, playerControls);
    return () => {
      globalPlayMediaManager.removePlayer(playerIdRef.current);
    };
  }, []);

  const playSideEffectCallback = () => {
    globalPlayMediaManager.playPlayer(playerIdRef.current);
  };

  return { playSideEffectCallback };
};

export default useSinglePlayerPlayed;
