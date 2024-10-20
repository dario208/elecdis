
import { FaFileImport } from "react-icons/fa6";

function BouttonImporterCSV({action}) {
  return (
    <button 
    onClick={action} 
    className="border-[#212B36] border-solid border-2 h-[45px] text-[#212B36] hover:bg-[#212B36] hover:text-white px-5 flex items-center font-semibold max-md:text-sm text-[14px] rounded-md space-x-2 group"
  >
    <FaFileImport className="w-[1.3rem] h-[1.3rem] text-[#212B36] group-hover:text-white" />
    <span>Importer CSV</span>
  </button>
  );
}

export default BouttonImporterCSV;
