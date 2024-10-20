import React from 'react'
import FloatingLabelInput from "@/components/Privates/forms/FloatingLabelInput.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Controller, useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance.js";
import Swal from "sweetalert2";

function ChargePointTemplates() {
    const { handleSubmit, control } = useForm();
    const mutation = useMutation({
        mutationFn: (newStation) => {
            return axiosInstance.post('/cp/create', newStation); // Endpoint pour créer la station
        },
        onSuccess: (data) => {
            console.log('Station créée avec succès:', data);
            Swal.fire({
                title: 'Succès!',
                text: 'La station a été créée avec succès.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            // Optionnel: Vous pouvez ajouter une action, comme fermer un modal ou réinitialiser le formulaire


        },
        onError: (error) => {
            console.error('Erreur lors de la création de la station:', error.response?.data || error.message);
        }
    });

    const onSubmit = (data) => {
        const stationData = {
            ...data,
            status: "Unavailable",     // Valeur par défaut
            // longitude: 0,              // Valeur par défaut
            // latitude: 0                // Valeur par défaut
        };
        mutation.mutate(stationData)
        console.log(stationData);
    }
    return (
        <div className=''>
            <div className="bg-white p-4  rounded-md">
                <div className="grid grid-rows-2 ">
                    <h1 className='underline '>Charge Point Templates</h1>
                    <p className='text-gray-500'> Ici, vous pouvez créer votre point de charge personnalisé</p>
                </div>
            </div>

            <div className="bg-white  rounded-md p-4 mt-4">
                <div className="grid grid-rows ">
                    <div className="">
                        <h2> Contenu du ChargePoint Templates</h2>
                        <form  onSubmit={handleSubmit(onSubmit)}>
                            <h2 className='m-4 font-semibold text-blue-600'>Informations concernant le materiel</h2>
                            <div className="grid grid-cols-2 gap-4 ">
                                <div className="">
                                    <label htmlFor="id" className='text-gray-600'>Identifiant</label>
                                    <Controller
                                        name="id"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="serial_number" className='text-gray-600'>Numero de serie</label>
                                    <Controller
                                        name="serial_number"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="charge_point_model" className='text-gray-600'>Modele</label>
                                    <Controller
                                        name="charge_point_model"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="charge_point_vendors" className='text-gray-600'> Fournisseur</label>
                                    <Controller
                                        name="charge_point_vendors"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>
                            </div>
                            <h2 className='m-4 font-semibold text-blue-600'>Informations concernant la localisation du
                                point de charge</h2>

                            <div className="grid grid-cols-3 gap-4 p-4">
                                <div className="">
                                    <label htmlFor="adresse" className='text-gray-600'> Adresse</label>
                                    <Controller
                                        name="adresse"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="latitude" className='text-gray-600'> Latitude</label>
                                    <Controller
                                        name="latitude"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="longitude" className='text-gray-600'> Longitude</label>
                                    <Controller
                                        name="longitude"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>
                            </div>
                           <Button className='bg-blue-500 hover:bg-blue-600 '>
                               Creer le point de charge
                           </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChargePointTemplates