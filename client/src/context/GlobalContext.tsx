import React, { createContext, useContext, useReducer } from "react";

const INITIAL_STATE: StateType = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  note: null,
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes")!)
    : [],
};

const GLOBAL_CONTEXT_STATE: GlobalContextStateType = {
  state: INITIAL_STATE,
  dispatch: () => {},
};

const GlobalContext = createContext(GLOBAL_CONTEXT_STATE);

const GlobalContextReducer = (state: StateType, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_USER":
      return { ...state, user: payload };

    case "LOGOUT_USER":
      return { ...state, user: payload };

    case "SET_NOTES":
      return { ...state, notes: payload };

    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, payload] };

    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === payload.id) {
            note.title = payload.title;
            note.content = payload.content;
          }
          return note;
        }),
      };

    case "REMOVE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== payload),
      };

    case "SELECT_NOTE":
      return {
        ...state,
        note: payload,
      };

    default:
      return state;
  }
};

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(GlobalContextReducer, INITIAL_STATE);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalContext = () => useContext(GlobalContext);
