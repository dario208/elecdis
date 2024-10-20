import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export const useAddAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (adminData) =>
      axiosInstance.post(`/auth/register`, adminData).then((res) => res.data),

    onSuccess: () => {
      // Invalider les queries pour actualiser les données après la mise à jour
      queryClient.invalidateQueries({ queryKey: ["repoUser"], exact: false });

      // Afficher un message de succès
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Admin ajouté avec succès !",
      });
    },
    onError: (error) => {
      // Gérer les erreurs lors de l'ajout
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: `Une erreur s’est produite lors de l'ajout de l'admin : ${
          error?.response?.data?.message || "Erreur inconnue"
        }`,
      });
    },
  });
};
