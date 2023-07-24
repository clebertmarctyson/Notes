import Notes from "./components/Notes";
import NoteForm from "./components/NoteForm";

const App = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row overflow-hidden w-screen h-screen">
      {/* Note List */}
      <Notes />

      {/* Note Add Form */}
      <NoteForm />
    </div>
  );
};

export default App;
