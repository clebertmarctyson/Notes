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
    <div className="bg-base-200 flex-1 md:flex-none md:border-r-2 p-4 pb-8 w-full h-auto md:h-screen md:w-[20rem] overflow-hidden">
      <h1 className="font-bold text-3xl mb-2 text-center md:text-left">
        Notes
      </h1>
      {isLoading ? (
        <Loading classes={"loading-lg"} />
      ) : state.notes.length === 0 ? (
        <p className="font-bold text-3xl text-gray-400 text-center mt-16">
          No Note Found
        </p>
      ) : (
        <ul className="w-full h-[95%] md:h-[95%] py-2 overflow-y-auto scroll-smooth">
          {state.notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
