import { FormElements } from '@/components/FormElements'
import React from 'react'

import {Controller, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.jsx";

import axiosInstance from "@/lib/axiosInstance.js";
import {useMutation} from "@tanstack/react-query";

function CreateStation({setOpen}) {

    const { handleSubmit, control } = useForm();

    const mutation = useMutation({
        mutationFn: (newStation) => {
            return axiosInstance.post('/cp/create', newStation); // Endpoint pour créer la station
        },
        onSuccess: (data) => {
            console.log('Station créée avec succès:', data);
            // Optionnel: Vous pouvez ajouter une action, comme fermer un modal ou réinitialiser le formulaire
            setOpen(false)


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
    const FloatingLabelInput=FormElements.getFloatingLabelInput();
  return (
      <React.Suspense fallback={<div>Loading...</div>}>
          <div
              className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen overflow-auto backdrop-blur-md"
              style={{backgroundColor: "rgba(9,16,26,0.3)"}}
          >
              <div className="text-left w-full m-3 md:w-[30vw]">
                  <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col max-md:h-screen max-md:justify-center max-md:items-center space-y-6 p-6 bg-[#fefefe] shadow-lg rounded-md"
                  >
                      <div className="w-full">
                          <Controller
                              name="id"
                              control={control}
                              render={({field}) => (
                                  <FloatingLabelInput label="Id-Charge-point" id="id"
                                                      type="text" {...field} />
                              )}
                          />
                      </div>
                      <div className="w-full">
                          <Controller
                              name="serial_number"
                              control={control}
                              render={({field}) => (
                                  <FloatingLabelInput label="serial_number " id="serial_number" {...field} />
                              )}
                          />
                      </div>
                      <div className="w-full">
                          <Controller
                              name="charge_point_model"
                              control={control}
                              render={({field}) => (
                                  <FloatingLabelInput label="charge_point_model" id="charge_point_model"
                                                      type="text" {...field} />
                              )}
                          />
                      </div>
                      <div className="w-full">
                          <Controller
                              name="charge_point_vendors"
                              control={control}
                              render={({field}) => (
                                  <FloatingLabelInput label="charge_point_vendors" id="charge_point_vendors"
                                                      type="text" {...field} />
                              )}
                          />
                      </div>
                      <div className="w-full">
                          <Controller
                              name="adresse"
                              control={control}
                              render={({field}) => (
                                  <FloatingLabelInput label="adresse" id="adresse"
                                                      type="text" {...field} />
                              )}
                          />
                      </div>
                      <div className="w-full">
                          <Controller
                              name="latitude"
                              control={control}
                              render={({field}) => (
                                  <FloatingLabelInput label="Latitude" id="latitude"
                                                      type="text" {...field} />
                              )}
                          />
                      </div>
                      <div className="w-full">
                          <Controller
                              name="longitude"
                              control={control}
                              render={({field}) => (
                                  <FloatingLabelInput label="Longitude" id="longitude"
                                                      type="text" {...field} />
                              )}
                          />
                      </div>


                      <div className="w-full">
                          <Controller
                              name="firmware_version"
                              control={control}
                              render={({field}) => (
                                  <FloatingLabelInput label="firmware_version" id="firmware_version"
                                                      type="text" {...field} />
                              )}
                          />
                      </div>

                      <Button type="submit"
                              onClick={onclick}
                              className="w-full bg-primaryChart hover:bg-red-700 text-white">
                          Submit
                      </Button>
                  </form>
              </div>


          </div>
      </React.Suspense>
  )
}

export default CreateStation