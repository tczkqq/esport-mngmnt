import { IApiEvent } from './events.models';

export interface IApiAnnouncement {
  id: number;
  title: string;
  date: number;
  description: string;
  event: number;
  event_obj: IApiEvent;
}
