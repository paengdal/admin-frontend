export interface SignupDto {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginDto {
  nickname: string;
  password: string;
}

export interface UpdateProfileDto {
  nickname?: string;
  password?: string;
}
