import DataTable from '@/components/Privates/forms/tables/DataTable';
import Columns from '@/components/Privates/forms/tables/Columns';
import ButtonAutorisation from '../content/ACTIVITE/components/ButtonAutorisation';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, previousPage, resetPage, totalPage } from '@/features/Stations/stationSlice';
import { getUser } from '@/features/Admin/userSlice';
import { UserApi } from '@/features/Admin/userApi';
import { selectPage, selectUser } from '@/features/Admin/userSelector';
import { PulseLoader } from 'react-spinners';
import Swal from 'sweetalert2';


const AutorisationTable = () => {
    const datas = ["id", "first_name", "last_name", "email", "role", "phone", "subscription", "Actions"];
    const columns = Columns(datas);
    const actions = [{ name: "detail" }, { name: "edit" }, { name: "delete" }]

    const currentPage = useSelector(selectPage)
    const { isPending, error, data } = UserApi('users/Admin', 'repoUser', currentPage, 10)
    const dispatch = useDispatch();
    const userData = useSelector(selectUser);

    if (isPending) {
        return (
            <div className="w-full flex justify-center items-center h-[70vh]">
                <PulseLoader color="#f87" />
            </div>)
    }
    if (error) {
        return (Swal.fire({
            title: 'Oops ! Erreur de connexion .',
            icon: "error"
        }))
    }
    if (data) {
        dispatch(getUser(data));
    }

    return (
        <>

            <DataTable columns={columns} datas={userData} actions={actions} ButtonAction={ButtonAutorisation}
                totalPage={totalPage} selectPage={currentPage}
                resetPage={resetPage}
                nextPage={nextPage} previousPage={previousPage}
            />
        </>
    );

}

export default AutorisationTable
