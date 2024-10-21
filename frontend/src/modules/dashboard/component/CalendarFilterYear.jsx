import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  filterDateForAllRevenu,
  filterDateForAllSession,
  filterDateForEnergy,
  filterDateForNewUser,
} from "../content/T_BORD/features/filterCalendarSlice";
import ButttonFilterDate from "./ButttonFilterDate";

function CalendarFilterYear({ filter }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const handleYearChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setYear(value ? parseInt(value, 10) : "");
    }
  };

  const handleYearSubmit = () => {
    const formattedDate = year.toString();
    let actionCreator;
    if (filter === "nombreSession") {
      actionCreator = filterDateForAllSession;
    } else if (filter === "energyDelivery") {
      actionCreator = filterDateForEnergy;
    } else if (filter === "revenu") {
      actionCreator = filterDateForAllRevenu;
    } else if (filter === "newClient") {
      actionCreator = filterDateForNewUser;
    }

    if (actionCreator) {
      dispatch(actionCreator(formattedDate));
    }
    setShowInput(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <button onClick={toggleInput} className="text-xl">
        <ButttonFilterDate text="A" />
      </button>

      {showInput && (
        <div className="absolute -right-2 z-50 mt-2 p-4 bg-white border-[0.5px] border-[#918f8f] rounded-lg shadow-md">
          <input
            type="text"
            value={year}
            onChange={handleYearChange}
            placeholder="Entrez une année"
            className="p-2 border border-gray-300 rounded mb-2 w-[100px]"
          />
          <button
            onClick={handleYearSubmit}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Soumettre
          </button>
        </div>
      )}
    </div>
  );
}

export default CalendarFilterYear;
