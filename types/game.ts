export interface GameObject {
  id: string;
  type: 'sprite' | 'text' | 'trigger';
  x: number;
  y: number;
  props?: Record<string, any>;
}

export interface Trigger {
  id: string;
  event: 'click' | 'overlap' | 'timer';
  action: string;
  targetId: string;
}

export interface SceneMeta {
  background: string;
}

export interface GameData {
  title: string;
  objects: GameObject[];
  triggers: Trigger[];
  meta: SceneMeta;
}
