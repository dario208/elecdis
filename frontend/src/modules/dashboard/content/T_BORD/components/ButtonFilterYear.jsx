
import { Context } from '@/common/config/configs/Context';
import { useState, useEffect, useRef, useContext } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

export default function ButtonFilterYear({ listFilter }) {
  const { handleFilterYear } = useContext(Context)
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Année");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    handleFilterYear(option)
    setSelected(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="px-[2vw] py-1 sm:px-[1vw] md:px-[0.8vw] flex justify-between items-center gap-2 bg-[#EBEFF3] rounded-sm text-[3vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw] xl:text-[14px] transition duration-300 ease-in-out transform hover:bg-[#d3d8de] hover:scale-105"
      >
        <p className="text-[#4f5f70]">{selected}</p>
        <IoIosArrowDown className={`text-[#212B36] text-[3vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw] xl:text-[14px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-sm shadow-lg">
          {listFilter.map((list, key) => (
            <li
              key={key}
              className="flex items-center justify-center px-[2vw] py-2 text-[3vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw] xl:text-[14px] text-[#4f5f70] hover:bg-[#f3f4f6] cursor-pointer transition-colors duration-300"
              onClick={() => handleSelect(list)}
            >
              {list}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
