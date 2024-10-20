import { useRef } from 'react';
import { FaFileUpload } from 'react-icons/fa';

const CsvFileInput = ({ handleFileChange }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="border-[#212B36] border-solid border-2 h-[45px] text-[#212B36] hover:bg-[#212B36] hover:text-white px-5 flex items-center font-semibold max-md:text-sm text-[14px] rounded-md space-x-2 group"
      >
        <FaFileUpload className="w-[1.3rem] h-[1.3rem] text-[#212B36] group-hover:text-white" />
        <span>Choisir un fichier CSV</span>
      </button>
      <span className="mt-2 text-sm text-gray-500 block" id="file-chosen">
        Aucun fichier choisi
      </span>
    </div>
  );
};

export default CsvFileInput;