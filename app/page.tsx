"use client";
import AddNoteModal from "@/components/AddNoteModal";
import NoteCard from "@/components/NoteCard";
import Statistics from "@/components/Statistics";
import UpdateNoteModal from "@/components/UpdateNoteModal";
import { AppDispatch } from "@/redux/store";
import { deleteNote, getAllNotes } from "@/services/notes";
import NoteFilters from "@/utils/NotesFilter";
import { useEffect, useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All']);
  const [editingNote, setEditingNote] = useState<null | {
    id: string;
    title: string;
    content: string;
    type: string;
  }>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { notes, loading } = useSelector((state: any) => state.notes);
  
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

  const filteredNotes = useMemo(() => {
    if (selectedFilters.includes('All')) return notes;
    return notes.filter((note: any) => selectedFilters.includes(note.type));
  }, [notes, selectedFilters]);

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen p-8 pb-20 gap-8 sm:p-20 bg-white w-full md:w-2/3 mx-auto ">
      {/* Header and Statistics */}
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black">Notes Manager</h1>
        <Statistics notes={notes}/>
      </div>
      {/* Notes Section */}
      <div className="w-full">
        {/* Header with count and add button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center">
            <h2 className="text-lg font-medium text-black">Notes Lists</h2>
            <div className="h-7 w-7 rounded-lg bg-amber-600 flex items-center justify-center text-white text-sm ml-3">
              {notes.length || '0'}
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <IoAdd className="w-5 h-5" />
            <span>Add Note</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 overflow-x-auto">
          <NoteFilters 
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
          />
        </div>

        {/* Notes Grid */}
        <div className="grid gap-4">
          {loading ? (
            Array(3).fill(0).map((_, index) => (
              <NoteCardSkeleton key={index} />
            ))
          ) : (
            filteredNotes.map((note:any) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                type={note.type}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
          {!loading && filteredNotes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No notes found for selected categories
            </div>
          )}
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

export function NoteCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm px-6 py-4 border-l-4 border-l-gray-200 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="flex gap-2 ml-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
