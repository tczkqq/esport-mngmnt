import { IApiGame } from './games.model';

export interface IApiEvent {
  id: number;
  name: string;
  date?: number;
  cover?: string;
  game?: number;
  game_obj?: IApiGame;
  remote: boolean;
  address?: string;
  coordinates?: string;
  description: string;
  max_participants: number;
  rules?: string;
  prizes?: string;
  contact?: string;
}

export interface IApiEventSHRT {
  event_id: number;
}
