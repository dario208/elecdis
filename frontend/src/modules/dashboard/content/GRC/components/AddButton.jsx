import { FaPlus } from 'react-icons/fa'

function AddButton({action}) {
  return (
    <button 
    onClick={action} 
    className="border-[#212B36] bg-slate-950 border-solid border-2 h-[45px] hover:bg-[#212B36] text-white px-5 flex items-center font-semibold max-md:text-sm text-[14px] rounded-md space-x-2 group"
  >
    <FaPlus className="w-[1.3rem] h-[1.3rem] text-white" />
    <span>Ajouter Nouveau</span>
  </button>
  )
}

export default AddButton
