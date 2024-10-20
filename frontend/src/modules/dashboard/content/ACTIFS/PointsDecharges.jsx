import BoutonAdd from "../../component/BoutonAdd";
import DataTableStation from "@/modules/Station/DataTableStation";
import CreateStation from "@/modules/Station/CreateStation.jsx";
import {useState} from "react";
import OpenStreetMap from "@/modules/Station/OpenStreetMap.jsx";
import BouttonImporterCSV from "@/modules/dashboard/component/BouttonImporterCSV.jsx";
import CsvUploader from "@/modules/dashboard/component/CsvUploader.jsx";

const PointsDecharges = () => {
const [open,setOpen]=useState(false);
const [openCsv,setOpenCsv]=useState(false);

    return (
        <div className="w-full h-auto p-6">
            <div className="flex items-center justify-between w-full mb-6">
                <h2 className="text-[#212B36] text-xl">Charge Point</h2>
               <div className="flex flex-row gap-2">
                   <BouttonImporterCSV  action={()=>setOpenCsv(true)}/>
                   <BoutonAdd  Composant={CreateStation}  setOpen={setOpen} open={open}/>

               </div>

            </div>
            <div className="w-full">
                <OpenStreetMap/>
                <DataTableStation />
                {
                    openCsv  && <CsvUploader queryKey="stationCsv" action={()=>setOpenCsv(false)} endpoint="/cp/import_from_csv_cp"/>
                }
            </div>

        </div>
    );
};
export default PointsDecharges;
