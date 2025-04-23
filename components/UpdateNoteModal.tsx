'use client'
import { AppDispatch } from '@/redux/store'
import { getAllNotes, updateNote } from '@/services/notes'
import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'

interface UpdateNoteModalProps {
  isOpen: boolean
  onClose: () => void
  note: {
    id: string
    title: string
    content: string
    type: string
  } | null
}

interface FormData {
  title: string
  content: string
  type: string
}

export default function UpdateNoteModal({ isOpen, onClose, note }: UpdateNoteModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    type: 'personal'
  })
    const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({})

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
        type: note.type
      })
    }
  }, [note])

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

  const handleUpdateNote = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault()
    
    if (!validateForm() || !note) {
        setIsLoading(false);
        return
    }

    try {
      await dispatch(updateNote({ id: note.id, noteData: formData })).unwrap()
      dispatch(getAllNotes());
        setFormData({ title: '', content: '', type: 'personal' })
      onClose()
    } catch (error) {
      console.error('Failed to update note:', error)
    } finally {
        setIsLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">Update Note</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <IoClose className="w-6 h-6 text-black cursor-pointer" />
          </button>
        </div>
        
        <form onSubmit={handleUpdateNote} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
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
              className="w-full p-2 text-gray-800 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
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
              className="w-full p-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              {isLoading ? 'Updating...':'Update Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
