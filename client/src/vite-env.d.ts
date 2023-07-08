/// <reference types="vite/client" />
type User = {
  id: number;
  email: string;
  name: string;
  username: string;
  password: string;
  notes: [];
};

type Note = {
  id?: number;
  title: string;
  content: string;
  createdAt?: string;
  userId: number;
  User?: User;
};

type StateType = {
  user: User | null;
  note: Note | null;
  notes: Note[];
};

type ActionType =
  | { type: "LOGIN_USER"; payload: User }
  | { type: "LOGOUT_USER"; payload: null }
  | { type: "SET_NOTES"; payload: Note[] }
  | { type: "ADD_NOTE"; payload: Note }
  | { type: "UPDATE_NOTE"; payload: Note }
  | { type: "REMOVE_NOTE"; payload: number }
  | { type: "SELECT_NOTE"; payload: Note };

type GlobalContextStateType = {
  state: StateType;
  dispatch: Dispatch<ActionType>;
};
