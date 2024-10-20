import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { useSelector } from 'react-redux';
import { selectStation } from '@/features/Stations/stationSelector';
import { Button } from "@/components/ui/button.jsx";

function DeleteStation({ IdStation, onclick }) {
    const stationData = useSelector(selectStation);
    const station = stationData.data.find((element) => element.id === IdStation);

    /**
     * Cette partie gere la mutation pour la suppression.
     */
    const mutation = useMutation({
        mutationFn: () => axiosInstance.delete(`/cp/delete/${IdStation}`).then((res) => console.log(res.data)),
        onSuccess: () => {
            console.log(`Station with ID ${IdStation} has been deleted successfully.`);
            onclick();

        },
        onError: (error) => {
            if (error.response) {
                console.error("Error deleting the station", error.response.status, error.response.data);
            } else {
                console.error("Error deleting the station", error);
            }
        }
    });

    /**
     * Execution de la suppression.
     */
    const handleDelete = () => {
        if (station) {
            mutation.mutate();  // Exécuter la mutation pour supprimer la station
        }
    };

    return (
        <div className="text-left w-full m-3 md:w-[30vw]">
            <div className="p-6 bg-[#fefefe] shadow-lg rounded-md">
                <h2 className="text-lg font-semibold">Vous êtes sûr de supprimer cette entité ?</h2>
                <p>{station?.charge_point_model}</p>
                <p>{station?.adresse}</p>
                <div className="flex space-x-4 mt-4">
                    <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                        Delete
                    </Button>
                    <Button onClick={onclick} className="bg-gray-300 hover:bg-gray-400 text-black">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DeleteStation;
