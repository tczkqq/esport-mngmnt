import { IApiTeam } from './teams.model';

export interface IApiMatch {
  id: number;
  team_one_obj: IApiTeam;
  team_two_obj: IApiTeam;
  teamo_one_score: number;
  team_two_score: number;
  duration: string;
  date: string;
  description: string;
  best_of: number;
  team_one: number;
  team_two: number;
  winner: number;
  status: number;
  round: number;
}
