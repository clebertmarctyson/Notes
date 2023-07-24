import React, { useEffect, useState } from "react";
import useNote from "../hooks/useNote";
import { useGlobalContext } from "../context/GlobalContext";
import Loading from "./Loading";

const NoteForm = () => {
  const { isLoading, addNewNote, updateNote } = useNote();
  const { state, dispatch } = useGlobalContext();
  const [note, setNote] = useState(state.note);

  const [title, setTitle] = useState(state.note ? state.note.title : "");
  const [content, setContent] = useState(state.note ? state.note.content : "");

  useEffect(() => {
    setNote(state.note);
  }, [state]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (state.note) {
      updateNote(note!);
      dispatch({ type: "SELECT_NOTE", payload: null });
    } else {
      addNewNote({ title, content, userId: 1 });
      setTitle("");
      setContent("");
    }
  };

  return (
    <form
      className="bg-base-200 md:flex-1 flex flex-col p-4 gap-4"
      onSubmit={handleCreateNote}
    >
      <input
        type="text"
        placeholder="Title"
        className="input p-2"
        value={note ? note.title : title}
        onChange={(e) => {
          state.note
            ? setNote({
                ...note!,
                title: e.target.value,
              })
            : setTitle(e.target.value);
        }}
      />
      <textarea
        placeholder="Content"
        className="flex-1 input resize-none p-2"
        value={note ? note.content : content}
        onChange={(e) => {
          state.note
            ? setNote({
                ...note!,
                content: e.target.value,
              })
            : setContent(e.target.value);
        }}
      ></textarea>

      <button type="submit" className={`btn btn-primary`} disabled={isLoading}>
        {isLoading ? (
          <Loading classes="loading-sm bg-neutral-100" />
        ) : state.note ? (
          "SAVE"
        ) : (
          "ADD"
        )}
      </button>
    </form>
  );
};

export default NoteForm;
