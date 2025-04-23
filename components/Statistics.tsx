import { IoFolderOpen } from 'react-icons/io5'
import { HiBriefcase } from 'react-icons/hi'
import { IoMdPerson } from 'react-icons/io'
import { FaMoneyCheckAlt } from 'react-icons/fa'

const statisticsData = [
  {
    type: 'Personal',
    icon: <IoMdPerson className="text-[#7990F8] text-2xl" />,
    count: 0,
    bgColor: 'bg-[#F2F4FE]',
    textColor: 'text-[#7990F8]'
  },
  {
    type: 'Work',
    icon: <HiBriefcase className="text-[#46CF8B] text-2xl" />,
    count: 0,
    bgColor: 'bg-[#ECFAF3]',
    textColor: 'text-[#46CF8B]'
  },
  {
    type: 'Finances',
    icon: <FaMoneyCheckAlt className="text-[#BC5EAD] text-2xl" />,
    count: 0,
    bgColor: 'bg-[#F8EFF7]',
    textColor: 'text-[#BC5EAD]'
  },
  {
    type: 'Others',
    icon: <IoFolderOpen className="text-[#908986] text-2xl" />,
    count: 0,
    bgColor: 'bg-[#F4F3F3]',
    textColor: 'text-[#908986]'
  }
]

export default function Statistics({ notes }: { notes: any[] }) {
  console.log("hiii", notes);
  
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statisticsData.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} p-6 rounded-xl flex flex-col items-start justify-center space-y-2`}
        >
          <div className={`${stat.textColor}`}>
            {stat.icon}
          </div>
          <span className="text-2xl font-bold text-gray-800">{notes.filter(note => note.type === stat.type.toLowerCase()).length || 0}</span>
          <span className="text-sm text-gray-500">{stat.type}</span>
        </div>
      ))}
    </div>
  )
}
