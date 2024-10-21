import { useDispatch, useSelector } from "react-redux";
import { selectPage, selectRfid } from "./features/SpecificRFID/rfidSpecificSelector";
import { useGetSpecificRfid } from "./features/SpecificRFID/rfidSpecificApi";
import { useEffect } from "react";
import { getRfid, nextPage, previousPage, resetPage, totalPage } from "./features/SpecificRFID/rfidSpecificSlice";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import DataTable from "./Privates/forms/tables/DataTable";
import ButtonActionRfid from "@/modules/dashboard/content/GRC/components/ButtonActionRfid";
function UserTableSpecificRFID({id}) {
    const datasColumn = [
        { accessorKey: "id", header: "Id" },
        { accessorKey: "tag", header: "Numéro RFID" },
        { accessorKey: "status", header: "Statut" },
        { accessorKey: "Actions", header: "Actions" },
      ];
      const columns = datasColumn;
      const actions = [{ name: "detail" }, { name: "delete" }];
      const dispatch = useDispatch();
      const stationData = useSelector(selectRfid);
      const currentPage = useSelector(selectPage);
      const { isPending, error, data } = useGetSpecificRfid(
        "users/RFID",
        id,
        "dataSpecificRFID",
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
}

export default UserTableSpecificRFID
