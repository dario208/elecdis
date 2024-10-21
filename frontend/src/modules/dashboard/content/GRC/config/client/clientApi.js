import axiosInstance from "@/lib/axiosInstance";
import useGetDataWithPagination from "@/lib/hoocks/useGetDataWithPagination.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export const ClientApi = (url, queryKey, page, number_items) =>
  useGetDataWithPagination(url, queryKey, page, number_items);

export const useUpdateClient = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (clientData) =>
      axiosInstance
        .put(`/users/profile/${id}`, clientData)
        .then((res) => res.data),
    onSuccess: () => {
      // Invalider les queries client pour les actualiser après la mise à jour
      queryClient.invalidateQueries({
        queryKey: ["clientList", "repoUser"],
        exact: false,
      });

      // Afficher un message de succès
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Le profil du client a été mis à jour avec succès !",
      });
    },
    onError: (error) => {
      // Gérer les erreurs lors de la mise à jour
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: `Une erreur s’est produite lors de la mise à jour du profil du client : ${
          error?.response?.data?.message || "Erreur inconnue"
        }`,
      });
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosInstance.delete(`/users/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clientList", "repoUser"],
        exact: false,
      });
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Client supprimé avec succès!",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur s’est produite lors de la suppression du Client.",
      });
    },
  });
};

export const getSubscription = () => {
  return useQuery({
    queryKey: ["getsubscription"],
    queryFn: () =>
      axiosInstance
        .get(
          `subscription/subscriptions/?page=${1}&number_items=${1000}`
          // subscription/subscriptions/?page=1&number_items=1000
        )
        .then((res) => res.data),
    refetchOnWindowFocus: true, // Désactivé jusqu'à ce qu'il soit explicitement activé par `refetch`
  });
};

export const getPartenar = (IdStation, idTag, adminData) => {
  return useQuery({
    queryKey: ["getPartener", IdStation, idTag, adminData],
    queryFn: () =>
      axiosInstance
        .get(
          `/cp/send_remoteStartTransaction/${IdStation}/${idTag}/${adminData[1].id_connecteur}`
        )
        .then((res) => res.data),
    enabled: true, // Désactivé jusqu'à ce qu'il soit explicitement activé par `refetch`
  });
};
