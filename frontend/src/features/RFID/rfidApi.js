import axiosInstance from "@/lib/axiosInstance";
import useGetDataWithPaginationNoRefetch from "@/lib/hoocks/useGetDataWithPaginationNoRefetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export const useGetListRfid = (url, queryKey, page, number_items) =>
  useGetDataWithPaginationNoRefetch(url, queryKey, page, number_items);

export const useGetOneRfid = (id) => {
  return useQuery({
    queryKey: ["oneRFID", id],

    queryFn: () =>
      axiosInstance.get(`/rfid/${id}`).then((response) => response.data),
    refetchOnWindowFocus: true,
  });
};

export const useCreateRfid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials) =>
      axiosInstance.post("/rfid", credentials).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataRFID"], exact: false });
    },
  });
};

export const useUpdateRfid = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials) =>
      axiosInstance.put(`/rfid/${id}`, credentials).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataRFID"], exact: false });
    },
  });
};

export const useDeleteRfid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosInstance.delete(`/rfid/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataRFID"], exact: false });
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Le RFID a été supprimé avec succès!",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur s’est produite lors de la suppression du RFID.",
      });
    },
  });
};
