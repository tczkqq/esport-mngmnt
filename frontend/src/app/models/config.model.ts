export interface IConfigEndpoints {
  login: string;
  register: string;
  logout: string;
  user: string;
  settings: string;
  announcements: string;
  games: string;
  countries: string;
  teams: string;
  matches: string;
  events: string;
  posts: string;
  statuses: string;
  players: string;
  rounds: string;
}

export interface IConfig {
  endpoints: IConfigEndpoints;
  api: string;
}
