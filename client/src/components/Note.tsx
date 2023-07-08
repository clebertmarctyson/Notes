import { BiTrashAlt, BiDotsVertical } from "react-icons/bi";
import useNote from "../hooks/useNote";
import { useGlobalContext } from "../context/GlobalContext";

const Note = ({ note }: { note: Note }) => {
  const { deleteNote } = useNote();
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
      className="card card-bordered bg-primary-content overflow-hidden"
    >
      <div className="card-body">
        <h2 className="card-title">
          {note.title.length >= 28
            ? `${note.title.substring(0, 28)} ...`
            : note.title}
        </h2>
        <p className="">
          {note.content.length >= 28
            ? `${note.content.substring(0, 28)} ...`
            : note.content}
        </p>

        <div className="flex items-center justify-between pt-4">
          <em className="text-xs">
            {new Date(note.createdAt!).toLocaleDateString()}
          </em>
          <div className="card-actions">
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
          </div>
        </div>
      </div>
    </li>
  );
};

export default Note;
