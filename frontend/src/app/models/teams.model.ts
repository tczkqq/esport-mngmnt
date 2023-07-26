import { IApiCountry } from './countries.models';
import { IApiPlayer } from './player.model';

export interface IApiTeam {
  id: number;
  name: string;
  logo: string;
  players_obj: IApiPlayer[];
  country: number;
  country_obj?: IApiCountry;
}
