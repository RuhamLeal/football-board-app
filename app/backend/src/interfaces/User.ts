export interface User extends Login {
  id: number;
  username: string;
  role: string;
}

export interface Login {
  email: string;
  password: string;
}
