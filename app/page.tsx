"use client";
import AddNoteModal from "@/components/AddNoteModal";
import NoteCard from "@/components/NoteCard";
import Statistics from "@/components/Statistics";
import UpdateNoteModal from "@/components/UpdateNoteModal";
import { AppDispatch } from "@/redux/store";
import { deleteNote, getAllNotes } from "@/services/notes";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<null | {
    id: string;
    title: string;
    content: string;
    type: string;
  }>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { notes } = useSelector((state: any) => state.notes);

  useEffect(() => {
    dispatch(getAllNotes());
  }, [dispatch]);

  const handleEdit = (note: { id: string; title: string; content: string; type: string }) => {
    setEditingNote(note);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteNote(id)).unwrap()
      dispatch(getAllNotes())
    } catch (error) {
      console.error('Failed to delete note:', error)
    }
  }

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen p-8 pb-20 gap-8 sm:p-20 bg-white w-2/3 mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-8 text-black">Notes Manager</h1>
        <Statistics notes={notes}/>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center mb-5">
            <h1 className="text-black text-lg font-medium">Notes Lists</h1>
            <div className="h-7 w-7 rounded-lg bg-amber-600 flex items-center justify-center text-white text-lg ml-4 ">
              {notes.length || '0'}
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
          >
            <IoAdd className="w-5 h-5" />
            <span>Add Note</span>
          </button>
        </div>
        <div className="grid gap-4">
          {notes.map((note:any) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              type={note.type}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <UpdateNoteModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setEditingNote(null);
        }}
        note={editingNote}
      />
    </div>
  );
}
