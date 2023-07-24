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
      className={`w-full h-64 card bg-primary-content overflow-hidden rounded-md border-b-[.01rem] border-base-300 ${
        isLoading ? "pointer-events-none" : ""
      }`}
    >
      <div className="card-body">
        <h2 className="card-title">
          {note.title.length >= 28
            ? `${note.title.substring(0, 28)} ...`
            : note.title}
        </h2>
        <p className="text-neutral-500">
          {note.content.length >= 28
            ? `${note.content.substring(0, 28)} ...`
            : note.content}
        </p>

        <div className="flex items-center justify-between pt-4">
          <em className="text-xs">
            {new Date(note.createdAt!).toLocaleDateString()}
          </em>
          <div className="card-actions flex justify-center">
            {isLoading ? (
              <Loading classes="loading-sm bg-neutral-100" />
            ) : (
              <>
                <BiDotsVertical
                  size={20}
                  className="cursor-pointer text-error"
                  onClick={handleSelected}
                />

                <BiTrashAlt
                  size={20}
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
