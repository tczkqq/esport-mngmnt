import { IApiPlayer } from './player.model';

export interface IApiLogin {
  username: string;
  password: string;
}

export interface IApiRegister extends IApiLogin {
  email: string;
  first_name: string;
  last_name: string;
}

export interface IApiUser extends IApiRegister {
  is_staff: boolean;
  is_superuser: boolean;
  user_obj?: IApiPlayer;
}

export interface IUser extends IApiUser {
  roles: number[];
}

export interface IApiToken {
  token: string;
}
