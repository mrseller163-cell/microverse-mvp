export type RoomEvent =
  | { type: 'start'; seed: number; timer: number }
  | { type: 'move'; id: string; x: number; y: number }
  | { type: 'score'; id: string; delta: number }
  | { type: 'hit'; attacker: string; target: string }
  | { type: 'end' };

export interface Player {
  id: string;
  name: string;
}

export class RoomChannel {
  channel: any;

  constructor(public code: string) {
    this.channel = { unsubscribe: () => {} };
  }

  join(player: Player) {
    console.log(`Joined: ${player.name}`);
  }

  leave() {
    this.channel.unsubscribe();
  }

  send(event: RoomEvent) {
    console.log('Send event:', event);
  }

  onPresence(cb: (players: Player[]) => void) {
    cb([{ id: 'demo', name: 'DemoPlayer' }]);
  }

  onEvent(cb: (event: RoomEvent) => void) {
    cb({ type: 'start', seed: 123, timer: 60 });
  }
}
