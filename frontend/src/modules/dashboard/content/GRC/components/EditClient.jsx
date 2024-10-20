import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Input from "@/modules/Login/components/Input";
import Boutton from "@/modules/Login/components/Boutton";
import { IoMdCloseCircle } from "react-icons/io";
import ErrorMessage from "@/components/ErrorMessage";
import { useGetOneRfid, useUpdateRfid } from "@/features/RFID/rfidApi";
import { PulseLoader } from "react-spinners";
import SelectList from "./SelectList";
import { getSubscription, useUpdateClient } from "../config/client/clientApi";
import { useSelector } from "react-redux";
import { selectClient } from "../config/client/clientSelector";

export default function EditClient({ action, Id }) {
    const [invalidMessage, setInvalidMessage] = useState("");

    const { mutate: updateClient, isPending } = useUpdateClient(Id);
    const { control, formState: { errors }, handleSubmit, reset } = useForm();
    const { refetch: fetchSubscription, isPending: isFetchingSubscriptions, data: subscriptions } = getSubscription();
    const [datas, setDatas] = useState([]);
    const [defaultItem, setDefaultItem] = useState('');

    const { data } = useSelector(selectClient);

    // Fonction pour trouver le client par ID
    const dataFind = (Id) => {
        return data.find((item) => item.id === Id);
    };

    // Récupérer les données spécifiques du client
    const clientData = dataFind(Id);

    // Fonction pour trouver l'ID de souscription correspondant au type_subscription
    const defaultID = (value) => datas.find(item => item.type_subscription === value);

    // Gestion du reset avec les données du client
    useEffect(() => {
        if (clientData && subscriptions) {
            const subscriptionItem = defaultID(clientData.subscription);
            if (subscriptionItem) {
                setDefaultItem(subscriptionItem.id); // Définir l'ID comme valeur par défaut
            }
        }
    }, [clientData, subscriptions, datas]);

    // Initialiser les valeurs du formulaire une fois les données du client et les souscriptions disponibles
    useEffect(() => {
        if (clientData) {
            reset({
                first_name: clientData.first_name || "",
                last_name: clientData.last_name || "",
                phone: clientData.phone || "",
                email: clientData.email || "",
                id_subscription: defaultItem || "",  // Utiliser l'ID extrait de la souscription
            });
        }
        fetchSubscription();  // Récupérer les souscriptions
    }, [clientData, subscriptions, reset, defaultItem]);

    useEffect(() => {
        if (subscriptions) {
            setDatas(subscriptions.data);  // Stocker les souscriptions dans l'état
        }
    }, [subscriptions]);

    const onSubmit = (formData) => {

        updateClient(formData, {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Client modifié avec succès !",
                });
                action(); // Fermer la modale après mise à jour
            },
            onError: (error) => {
                if (error.response?.status === 401) {
                    setInvalidMessage("Identifiant utilisateur n'existe pas");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Une erreur s'est produite. Veuillez réessayer plus tard.",
                    });
                }
            },
        });
    };

    return (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center w-full h-screen bg-black bg-opacity-40">
                <div className="relative bg-white shadow-xl backdrop-blur max-sm:shadow-none w-[400px] 2xl:w-[500px] h-auto p-6 flex items-center justify-center flex-col gap-[4vh] rounded-lg">
                    <button className="absolute bg-white top-1 right-1" onClick={() => action()}>
                        <IoMdCloseCircle size={40} />
                    </button>

                    <div className="flex flex-col items-center justify-center w-full">
                        <h4 className="text-importantText max-lg:text-[20px] xl:text-2xl mb-[4vh]">
                            Modifier l'information du client
                        </h4>

                        {/* First Name */}
                        <div className="w-full mb-[4vh]">
                            <Controller
                                name="first_name"
                                control={control}
                                rules={{
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /[a-zA-Z0-9]/,
                                        message: "Format invalide",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input type="text" label="Nom" {...field} />
                                )}
                            />
                            {errors?.first_name && <ErrorMessage message={errors.first_name.message} />}
                        </div>

                        {/* Last Name */}
                        <div className="w-full mb-[4vh]">
                            <Controller
                                name="last_name"
                                control={control}
                                rules={{
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /[a-zA-Z0-9]/,
                                        message: "Format invalide",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input type="text" label="Prenom" {...field} />
                                )}
                            />
                            {errors?.last_name && <ErrorMessage message={errors.last_name.message} />}
                        </div>

                        {/* Email */}
                        <div className="w-full mb-[4vh]">
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /[a-zA-Z0-9]/,
                                        message: "Format invalide",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input type="text" label="Email" {...field} />
                                )}
                            />
                            {errors?.email && <ErrorMessage message={errors.email.message} />}
                        </div>

                        {/* Phone */}
                        <div className="w-full mb-[4vh]">
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /[a-zA-Z0-9]/,
                                        message: "Format invalide",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input type="text" label="Numero de telephone" {...field} />
                                )}
                            />
                            {errors?.phone && <ErrorMessage message={errors.phone.message} />}
                        </div>

                        {/* Subscription Select List */}
                        <div className="w-full mb-[4vh]">
                            <Controller
                                name="id_subscription"
                                control={control}
                                rules={{ required: "Ce champ est requis" }}
                                render={({ field }) => (
                                    <SelectList
                                        id="id_subscription"
                                        label="Souscription"
                                        type="select"
                                        value={clientData?.subscription}  // Valeur actuelle
                                        datas={datas}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors?.id_subscription && <ErrorMessage message={errors.id_subscription.message} />}
                        </div>

                        {/* Error Message */}
                        {invalidMessage && (
                            <ErrorMessage message={invalidMessage} className="mb-[1vw]" />
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col items-center justify-center w-full gap-7">
                        <Boutton isLoading={isPending} label="Mettre à jour" />
                    </div>

                    {/* Footer */}
                    <div className="w-full">
                        <p className="text-center text-simpleText text-base mt-[1vh]">
                            Copyright, elecdis 2024
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}
