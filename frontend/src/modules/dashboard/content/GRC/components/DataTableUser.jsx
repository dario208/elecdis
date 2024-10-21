import DataTable from "@/components/Privates/forms/tables/DataTable";
import Columns from "@/components/Privates/forms/tables/Columns";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, previousPage, resetPage, totalPage } from "@/features/Stations/stationSlice.js";

import { ClientApi } from "../config/client/clientApi";
import { selectClient, selectPage } from "../config/client/clientSelector";
import { getClient } from "../config/client/clientSlice";
import ButtonActionClient from "./BoutonActionClient";

// const datas = [
//     "id", "first_name", "last_name", "email", "role", "phone", "subscription", "Actions"
// ];

const datas = [
    {
        accessorKey: "id",
        header: "Id",

    },
    {
        accessorKey: "first_name",
        header: "Nom",
    },
    {
        accessorKey: "last_name",
        header: "Prenom",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "phone",
        header: "Telephone",
    },
    {
        accessorKey: "subscription",
        header: "Souscription",
    },
    {
        accessorKey: "Actions",
        header: "Actions",
    },
];

// const columns = Columns(datas);
const columns = datas;
const actions = [{ name: "detail" }, { name: "edit" }, { name: "delete" }];

const DataTableUser = () => {
    const currentPage = useSelector(selectPage);

    const { isPending, error, data } = ClientApi(
        "users/client",
        "clientList",
        currentPage,
        10
    );
    const dispatch = useDispatch();
    const userData = useSelector(selectClient);

    if (isPending) {
        return (
            <div className="w-full flex justify-center items-center h-[70vh]">
                <PulseLoader color="#f87" />
            </div>
        );
    }
    if (error) {
        return Swal.fire({
            title: "Oops ! Erreur de connexion .",
            icon: "error",
        });
    }
    if (data) {
        dispatch(getClient(data));
    }

    return (
        <DataTable
            columns={columns}
            datas={userData}
            actions={actions}
            ButtonAction={ButtonActionClient}
            totalPage={totalPage}
            selectPage={currentPage}
            resetPage={resetPage}
            nextPage={nextPage}
            previousPage={previousPage}
        />
    );
};

export default DataTableUser;
