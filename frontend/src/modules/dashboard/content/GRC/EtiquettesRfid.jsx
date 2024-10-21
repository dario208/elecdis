import { useState } from "react";
import EtiquettesRfidTable from "./components/EtiquettesRfidTable";
import CreateRfid from "./components/CreateRfid";
import BouttonImporterCSV from "../../component/BouttonImporterCSV";
import CsvUploader from "../../component/CsvUploader";
import AddButton from "./components/AddButton";
const Transactions = () => {
  const [isCreated, setIsCreated] = useState(false);
  const [isImported, setIsImported] = useState(false);

  const handleAdd = () => {
    setIsCreated(true);
  };
  const closeModalAdd = () => {
    setIsCreated(false);
  };
  const handleImportCSV = () => {
    setIsImported(true)
  }
  const closeImportCSV = () => {
    setIsImported(false)
  }
  

  return (
    <div className="w-full h-auto p-6 relative">
      <div className="flex items-center justify-between w-full mb-6">
        <h2 className="text-[#212B36] text-xl">Listes RFID</h2>
        <div className="flex gap-2">
          <BouttonImporterCSV action={handleImportCSV} />
          <AddButton action={handleAdd} />
        </div>
      </div>
      <div>
        <EtiquettesRfidTable />
      </div>
      {isCreated && <CreateRfid action={closeModalAdd} />}
      {isImported && <CsvUploader queryKey="dataRFID" action={closeImportCSV} endpoint="rfid/import_from_csv" buttonText="Import RFID" />}
    </div>
  );
};

export default Transactions;
