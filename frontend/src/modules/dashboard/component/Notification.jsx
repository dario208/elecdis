import { GiAutoRepair } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
export default function Notification({ isVisible }) {
  return (
    <div
      className={`max-sm:w-[200px] w-[350px] rounded-lg bg-white absolute right-0 top-6 shadow-lg z-50 transform transition-all duration-300 ease-[cubic-bezier(0.25, 1, 0.5, 1)]
      ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b-[1px] border-dashed">
        <div className="">
            <h3 className="text-[#212B36]">Notifications</h3>
            <p className="text-[#9D9D9D] text-[14px]">
            Vous avez 2 messages non lus
            </p>
        </div>
        <div className="">
            <IoCheckmarkDone color="#3574ff" size={16} />
        </div>
      </div>
      <div className="py-2">
        <h6 className="text-[#637381] text-[16px] ml-4">NOUVEAU</h6>
        <div className="w-full mt-4">
          <div className="w-full px-4 py-4 flex justify-start items-center gap-4 hover:bg-[#d6d6d66e]">
            <GiAutoRepair
              className="bg-[#f7f7f7] rounded-full p-2"
              color="#F2505D"
              size={48}
            />
            <div className="flex flex-col gap-3">
              <p className="text-[#9D9D9D]">
                <span className="font-medium text-[#3a3a3a]">
                  Un box déconnecté
                </span>{" "}
                en attente d'intervention
              </p>
              <div className="flex justify-start items-center gap-2">
                <IoMdTime color="#9D9D9D" size={14} />
                <p className="text-[12px] text-[#9D9D9D]">Il y a 5 minutes</p>
              </div>
            </div>
          </div>
          {/* Ajoutez d'autres éléments ici */}
        </div>
      </div>
    </div>
  );
}
