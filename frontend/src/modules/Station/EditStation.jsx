import { useEffect } from 'react';
import { Button } from "@/components/ui/button.jsx";
import FloatingLabelInput from "@/components/Privates/forms/FloatingLabelInput.jsx";
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectStation } from '@/features/Stations/stationSelector';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

function EditStation({ IdStation, onclick }) {
    const { handleSubmit, control, setValue } = useForm();
    const stationData = useSelector(selectStation);
    const station = stationData.data.find((element) => element.id === IdStation);
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: (updatedStation) => axiosInstance.put(`/cp/update/${IdStation}`, updatedStation).then((res) => console.log(res.data)),
        onSuccess: (data) => {
            console.log("Station mise à jour avec succès", data);
            queryClient.invalidateQueries("repoMap");
            if (onclick) onclick();  // Assurez-vous qu'onclick est défini avant de l'appeler
        },
        onError: (error) => {
            if (error.response) {
                console.error("Erreur lors de la mise à jour de la station", error.response.status, error.response.data);
            } else {
                console.error("Erreur lors de la mise à jour de la station", error);
            }
        }
    });

    const onSubmit = (station) => {
        console.log("Form Data:", station);
        mutation.mutate(station);
    };

    useEffect(() => {
        if (station) {
            Object.keys(station).forEach((key) => {
                if (station[key] !== undefined) {
                    setValue(key, station[key]);
                }
            });
        }
    }, [station, setValue]);

    return (
        <div className="text-left w-full m-3 md:w-[30vw]">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col max-md:h-screen max-md:justify-center max-md:items-center space-y-6 p-6 bg-[#fefefe] shadow-lg rounded-md"
            >
                <div className="w-full">
                    <Controller
                        name="charge_point_model"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabelInput label="Charge Point Model" id="charge_point_model" type="text" {...field} />
                        )}
                    />
                </div>
                <div className="w-full">
                    <Controller
                        name="adresse"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabelInput label="Adresse" id="adresse" {...field} />
                        )}
                    />
                </div>
                <div className="w-full">
                    <Controller
                        name="latitude"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabelInput label="Latitude" id="latitude" type="text" {...field} />
                        )}
                    />
                </div>
                <div className="w-full">
                    <Controller
                        name="longitude"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabelInput label="Longitude" id="longitude" type="text" {...field} />
                        )}
                    />
                </div>
                <Button type="submit" className="w-full bg-primaryChart hover:bg-blue-700 text-white">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default EditStation;
