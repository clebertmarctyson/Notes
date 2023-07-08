import { useGlobalContext } from "../context/GlobalContext";
import { useState } from "react";

const useNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = useGlobalContext();

  const fetchNotes = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/notes");
      const notes = await response.json();
      localStorage.setItem("notes", JSON.stringify(notes));
      dispatch({ type: "SET_NOTES", payload: notes });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewNote = async (note: Note) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(note),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      }

      if (response.ok) {
        dispatch({ type: "ADD_NOTE", payload: data });
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNote = async (note: Note) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/notes/${note.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(note),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        setError(data.message);
      }

      if (response.ok) {
        dispatch({ type: "UPDATE_NOTE", payload: data });
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (id: number) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      }

      if (response.ok) {
        dispatch({ type: "REMOVE_NOTE", payload: data.id });
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, fetchNotes, addNewNote, deleteNote, updateNote };
};

export default useNote;
