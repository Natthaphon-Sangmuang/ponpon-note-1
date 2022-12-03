import { createContext, useReducer } from "react";

export const NotesContext = createContext();

export const notesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        notes: action.paybefore,
      };
    case "CREATE_NOTE":
      return {
        notes: [action.paybefore, ...state.notes],
      };
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter((w) => w._id !== action.paybefore._id),
      };
    default:
      return state;
  }
};

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: null,
  });

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
