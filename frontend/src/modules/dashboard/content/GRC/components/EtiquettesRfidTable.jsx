import DataTable from "@/components/Privates/forms/tables/DataTable";
import {
  nextPage,
  getRfid,
  previousPage,
  resetPage,
  totalPage,
} from "@/features/RFID/rfidSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectPage, selectRfid } from "@/features/RFID/rfidSelector";
import { useGetListRfid } from "@/features/RFID/rfidApi";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import ButtonActionRfid from "./ButtonActionRfid";
import { useEffect } from "react";

const EtiquettesRfidTable = () => {
  const datasColumn = [
    { accessorKey: "id", header: "Id" },
    { accessorKey: "rfid", header: "Numéro RFID" },
    { accessorKey: "user_name", header: "Propriétaire" },
    { accessorKey: "Actions", header: "Actions" },
  ];
  const columns = datasColumn;
  const actions = [{ name: "detail" }, { name: "delete" }];
  const dispatch = useDispatch();
  const stationData = useSelector(selectRfid);
  const currentPage = useSelector(selectPage);
  const { isPending, error, data } = useGetListRfid(
    "rfid/all",
    "dataRFID",
    currentPage,
    10
  );
  useEffect(() => {
    if (data) {
      dispatch(getRfid(data));
    }
  }, [data, dispatch]);

  if (isPending) {
    return (
      <div className="w-full flex justify-center items-center h-[70vh]">
        <PulseLoader color="#F2505D" />
      </div>
    );
  }

  if (error) {
    Swal.fire({
      title: "Oops ! Erreur de connexion.",
      icon: "error",
    });
    return null;
  }

  return (
    <DataTable
      columns={columns}
      datas={stationData}
      actions={actions}
      ButtonAction={ButtonActionRfid}
      totalPage={totalPage}
      selectPage={currentPage}
      resetPage={resetPage}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export default EtiquettesRfidTable;
