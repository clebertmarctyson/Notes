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
    <div className="bg-base-300 md:bg-base-200 flex flex-col w-full md:h-full p-4">
      <h1 className="font-bold text-3xl mb-4 text-center md:text-right">
        Add New Note
      </h1>

      <form
        className="md:flex-1 flex flex-col gap-4"
        onSubmit={handleCreateNote}
      >
        <input
          type="text"
          placeholder="Title"
          className="bg-base-200 input input-primary p-3"
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
          className="bg-base-200 flex-1 input input-primary resize-none p-3"
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

        <button
          type="submit"
          className={`btn btn-lg btn-primary font-bold`}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loading classes="loading-sm bg-neutral-100" />
          ) : state.note ? (
            "SAVE"
          ) : (
            "ADD"
          )}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
