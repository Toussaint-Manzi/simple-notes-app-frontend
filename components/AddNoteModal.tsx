'use client'
import { AppDispatch } from '@/redux/store'
import { addNote, getAllNotes } from '@/services/notes'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'

interface AddNoteModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  title: string
  content: string
  type: string
}

export default function AddNoteModal({ isOpen, onClose }: AddNoteModalProps) {
  if (!isOpen) return null
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    type: 'personal'
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long'
    }

    if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters long'
    }

    if (formData.title === formData.content) {
      newErrors.content = 'Title and content cannot be identical'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true);
    if (!validateForm()) {
      setIsLoading(false);
      return
    }

    try {
      await dispatch(addNote(formData)).unwrap()
      dispatch(getAllNotes());
      onClose();
      setFormData({ title: '', content: '', type: 'personal' })
    } catch (error) {
      console.error('Failed to add note:', error)
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">Add New Note</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <IoClose className="w-6 h-6 text-black cursor-pointer" />
          </button>
        </div>
        
        <form onSubmit={handleAddNote} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-black"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-black"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="finances">Finances</option>
              <option value="others">Others</option>
            </select>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              {isLoading ? 'saving...' : 'Add Note' }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
