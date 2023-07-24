import { BiTrashAlt, BiDotsVertical } from "react-icons/bi";
import useNote from "../hooks/useNote";
import { useGlobalContext } from "../context/GlobalContext";
import Loading from "./Loading";

const Note = ({ note }: { note: Note }) => {
  const { deleteNote, isLoading } = useNote();
  const { dispatch } = useGlobalContext();

  const handleSelected = () => {
    dispatch({ type: "SELECT_NOTE", payload: note });
  };

  const handleRemove = async () => {
    await deleteNote(note.id!);
  };

  return (
    <li
      key={note.id}
      className={`cursor-pointer flex flex-col p-4 w-full h-52 bg-base-300 overflow-hidden rounded-md border-b-[.01rem] border-l-4 border-neutral hover:bg-base-100 ${
        isLoading ? "pointer-events-none" : ""
      }`}
    >
      <div className="flex flex-col h-full">
        <h2 className="card-title mb-1">
          {note.title.length >= 28
            ? `${note.title.substring(0, 28)} ...`
            : note.title}
        </h2>
        <p className="text-neutral-500 break-words">
          {note.content.length >= 130
            ? `${note.content.substring(0, 130)} ...`
            : note.content}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <em className="text-sm font-bold">
            {new Date(note.createdAt!).toLocaleDateString()}
          </em>
          <div className="card-actions flex justify-center">
            {isLoading ? (
              <Loading classes="loading-sm bg-neutral-100" />
            ) : (
              <>
                <BiDotsVertical
                  size={25}
                  className="cursor-pointer text-error"
                  onClick={handleSelected}
                />

                <BiTrashAlt
                  size={25}
                  className="cursor-pointer text-error"
                  onClick={handleRemove}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Note;
