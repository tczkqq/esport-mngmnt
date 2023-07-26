import { IApiCountry } from './countries.models';

export interface IApiPlayer {
  id: number;
  nickname: string;
  user: number;
  country?: number;
  country_obj?: IApiCountry;
  team?: number;
}
