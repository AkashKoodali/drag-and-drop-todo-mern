export interface Todo {
  _id: number;
  title: string;
  completed: boolean;
  createdAt: number;
}

export interface User {
  email: string;
  password: string;
  name: string;
}
