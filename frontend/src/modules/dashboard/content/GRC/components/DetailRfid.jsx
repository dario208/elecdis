import {
  FaUserAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHistory,
} from "react-icons/fa"; // Des icônes futuristes
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowReturnRight } from "react-icons/bs";
import { useGetOneRfid } from "@/features/RFID/rfidApi";
import { convertDate } from "@/lib/utils";

const DetailRfid = ({ id, fermer, supprimer }) => {
  const { data: rfidData, error, isPending } = useGetOneRfid(id);
  if (error) {
    return <p>Une erreur est survenue...</p>;
  }
  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <div className="fixed z-10 top-0 left-0 w-full h-screen flex justify-center items-center">
      <div className="w-full bg-black bg-opacity-40 h-screen flex items-center justify-center">
        <div className="relative bg-white shadow-xl backdrop-blur max-sm:shadow-none w-[400px] 2xl:w-[500px] h-auto p-6 flex items-center flex-col gap-[4vh] rounded-lg">
          {/* Section 1: Informations de base */}
          <div className="w-full bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">
              RFID Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col w-full items-start">
                <h3 className="text-gray-300">ID RFID</h3>
                <p className="text-lg text-white font-bold">{rfidData.id}</p>
              </div>
              <div className="flex flex-col w-full items-start">
                <h3 className="text-gray-300">Numéro RFID</h3>
                <p className="text-lgs text-white font-bold">{rfidData.rfid}</p>
              </div>
              <div className="flex flex-col w-full items-start">
                <h3 className="text-gray-300">Propriétaire</h3>
                <p className="text-lgs text-white font-bold flex items-center">
                  <FaUserAlt className="mr-2" /> {rfidData.user_name}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Statut et Date */}
          <div className="w-full bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">
              Statut & Dates
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col w-full items-start">
                <h3 className="text-gray-300">Statut</h3>
                <p className="flexs text-white flex items-center justify-center">
                  {rfidData.status === "active" ? (
                    <FaCheckCircle className="text-green-500 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 mr-2" />
                  )}
                  {rfidData.status === "active" ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="flex flex-col w-full items-start">
                <h3 className="text-gray-300">Dernière utilisation</h3>
                <p className="flexs text-white flex items-center justify-center">
                  <FaCalendarAlt className="mr-2" />
                  {convertDate(rfidData.last_used)}
                </p>
              </div>
              <div className="flex flex-col w-full items-start">
                <h3 className="text-gray-300">Date d'enregistrement</h3>
                <p className="flexs text-white flex items-center justify-center">
                  <FaCalendarAlt className="mr-2" />
                  {convertDate(rfidData.registration)}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Historique des Utilisations */}
          <div className="w-full bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">
              Historique des Utilisations
            </h2>

            {/* Si plus de deux éléments dans l'historique, rendre scrollable */}
            <div
              className={`space-y-2 ${
                rfidData.history.length > 2 ? "max-h-32 overflow-y-auto" : ""
              }`}
            >
              {rfidData.history.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-3 text-white rounded-md flex flex-wrap items-center justify-between"
                >
                  <div className="flex items-center">
                    <FaHistory className="text-gray-400 mr-2" />
                    <span>{item.date}</span>
                  </div>
                  <span className="py-1 px-2 bg-slate-400 rounded-md">
                    {item.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Actions */}
          <div className="w-full flex justify-end space-x-4">
            <button
              onClick={() => supprimer()}
              className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md text-white"
            >
              <RiDeleteBin6Line />
            </button>
            <button
              onClick={() => fermer()}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-white"
            >
              <BsArrowReturnRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exemples de données RFID
export default DetailRfid;
