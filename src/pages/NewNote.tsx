import { NoteForm } from '../components/NoteForm';
import { v4 as uuidV4 } from 'uuid';
import { NoteData, RawNote, Tag } from '../types';

type NewNoteProps = {
  setNotes: React.Dispatch<React.SetStateAction<RawNote[]>>;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NewNote({ setNotes, onAddTag, availableTags }: NewNoteProps) {
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onCreateNote}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
