import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  filterDateForAllRevenu,
  filterDateForAllSession,
  filterDateForEnergy,
  filterDateForNewUser,
} from "../content/T_BORD/features/filterCalendarSlice";
import ButttonFilterDate from "./ButttonFilterDate"; 

const months = [
  "Jan",
  "Fev",
  "Mar",
  "Avr",
  "Mai",
  "Jui",
  "Jul",
  "Auo",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function CalendarFilterMonth({ filter }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [showMonths, setShowMonths] = useState(false);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);

  const toggleMonths = () => setShowMonths(!showMonths);

  const handleMonthClick = (monthIndex) => {
    const month = (monthIndex + 1).toString().padStart(2, "0"); 
    const formattedDate = `${year}-${month}`;
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

    setShowMonths(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowMonths(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={calendarRef}>
      <button onClick={toggleMonths} className="text-xl">
        <ButttonFilterDate text="M" />
      </button>

      {showMonths && (
        <div className="w-[200px] bg-white border-[0.5px] border-[#918f8f] absolute -right-2 z-50 mt-2 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-4">
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="text-xl font-bold w-20 text-center border rounded"
            />
          </div>

          <div className="p-2 grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => handleMonthClick(index)}
                className="p-2 bg-blue-200 hover:bg-blue-300 rounded"
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarFilterMonth;
