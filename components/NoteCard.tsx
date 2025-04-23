'use client'
import { useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

interface NoteCardProps {
  id: string
  title: string
  content: string
  type: 'Personal' | 'Work' | 'Finances' | 'Others'
  onEdit: (note: { id: string; title: string; content: string; type: string }) => void
  onDelete: (id: string) => void
}

const typeColors = {
  personal: 'border-l-[#7990F8]',
  work: 'border-l-[#46CF8B]',
  finances: 'border-l-[#BC5EAD]',
  others: 'border-l-[#908986]'
}

export default function NoteCard({ id, title, content, type, onEdit, onDelete }: NoteCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleEdit = () => {
    onEdit({ id, title, content, type })
  }

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    onDelete(id)
    setShowDeleteModal(false)
  }
  return (
    <div className={`bg-white rounded-lg shadow-sm px-4 sm:px-6 py-4 border-l-4 ${typeColors[type.toLowerCase() as keyof typeof typeColors]}`}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-0">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{content}</p>
        </div>
        <div className="flex gap-2 sm:ml-4 justify-end sm:justify-start">
          <button 
            className="p-2 hover:text-gray-600 text-purple-600 rounded-full hover:bg-white bg-purple-50 cursor-pointer"
            onClick={handleEdit}
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button 
            className="p-2 hover:text-gray-600 text-red-600 rounded-full hover:bg-white bg-red-50 cursor-pointer"
            onClick={handleDelete}
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <DeleteConfirmationModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }: { 
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void 
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Delete Note</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this note? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
