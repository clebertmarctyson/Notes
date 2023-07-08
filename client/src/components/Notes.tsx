import { useGlobalContext } from "../context/GlobalContext";
import useNote from "../hooks/useNote";
import Loading from "../components/Loading";
import { useEffect } from "react";
import Note from "./Note";

const Notes = () => {
  const { state } = useGlobalContext();
  const { isLoading, fetchNotes } = useNote();

  useEffect(() => {
    (async () => {
      await fetchNotes();
    })();
  }, []);

  return (
    <div className="border-r-2 p-4 w-[20rem] overflow-hidden">
      <h1 className="font-bold text-3xl my-4">Notes</h1>
      {isLoading ? (
        <Loading />
      ) : state.notes.length === 0 ? (
        <p className="font-bold text-3xl text-gray-400 text-center mt-16">
          No Note Found
        </p>
      ) : (
        <ul className="flex flex-col gap-1 h-[90%] overflow-y-auto scroll-smooth">
          {state.notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
