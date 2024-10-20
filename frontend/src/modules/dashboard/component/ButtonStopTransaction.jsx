import axiosInstance from '@/lib/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { PulseLoader } from 'react-spinners';
import Swal from 'sweetalert2';

function ButtonStopTransaction({transactionId, chargPointId}) {
  const stopTransaction = async () => {
    const response = await axiosInstance.post(`/cp/send_remoteStopTransaction/${chargPointId}/${transactionId}`);
    return response.data;
  };
  const {mutate, isError, isPending, isSuccess} = useMutation({mutationFn : stopTransaction,
  });
  const confirmDelete = () => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Arrete !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        mutate()
        if (isSuccess) {
            Swal.fire(
                'Arret !',
                'La session a été arreter.',
                'success'
              );
        }
        if (isError){
            Swal.fire(
                'Oops !',
                'Une erreur s\'est produite',
                'error'
              );
        }
        if (isPending) {
            <div className="w-full flex justify-center items-center h-[70vh]">
            <PulseLoader color="#F2505D" />
          </div>
        }
      }
    });
  };
  return (
    <button onClick={()=>confirmDelete()} className='px-4 py-2 rounded-xl bg-red-400 text-white' >
      Stopper
    </button>
  )
}

export default ButtonStopTransaction
