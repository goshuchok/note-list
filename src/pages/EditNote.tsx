import { NoteData, RawNote, Tag } from '../types';
import { NoteForm } from '../components/NoteForm';
import { useNote } from '../components/NoteLayout';

type EditNoteProps = {
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  setNotes: React.Dispatch<React.SetStateAction<RawNote[]>>;
};

export function EditNote({ setNotes, onAddTag, availableTags }: EditNoteProps) {
  const note = useNote();
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,

            tagIds: tags.map((tag) => tag.id),
          };
        } else {
          return note;
        }
      });
    });
  }
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onUpdateNote(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
