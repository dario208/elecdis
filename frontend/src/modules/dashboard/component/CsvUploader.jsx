import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Swal from "sweetalert2";

/**
 *
 * @param {String} queryKey - queryKey du requete a invalider c-a-d requete a refetcher
 * @param {Function()} action - function qui ferme le modal
 * @param {string} endpoint - endpoint de l'API
 * @param {String} buttonText - Label du boutton
 */

const CsvUploader = ({
  queryKey,
  action,
  endpoint,
  buttonText = "Envoyer CSV",
}) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => {
      return axiosInstance.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey], exact: false });
      Swal.fire({
        title: "Fichier importé avec succès",
        icon: "success",
        text: data.message,
      });
      action();
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        try {
          const errorDetails = JSON.parse(error.response.data.detail);
          const errorText = errorDetails
            .map((err) => `Erreur à la ligne ${err.line}: ${err.message}`)
            .join("\n");
          Swal.fire({
            title: "Oops !",
            icon: "error",
            text: errorText,
          });
        } catch (parseError) {
          Swal.fire({
            title: "Oops !",
            icon: "error",
            text: "Une erreur est survenue lors de l'importation des détails.",
          });
        }
      } else {
        Swal.fire({
          title: "Oops !",
          icon: "error",
          text:
            error.response?.data?.message ||
            "Une erreur est survenue lors de l'importation",
        });
      }
    },
  });

  const handleSubmit = () => {
    if (!file) {
      Swal.fire({
        title: "Oops !",
        icon: "error",
        text: "Impossible d'importer un fichier vide",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    mutate(formData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40 z-30">
      <div className="relative bg-white rounded-lg w-[400px] p-4 flex flex-col justify-center items-center gap-4">
        <button
          className="absolute bg-transparent top-1 right-1 "
          onClick={() => action()}
        >
          <IoMdCloseCircle size={40} />
        </button>
        <div className="w-full">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
            id="csvFileInput"
          />
          <label
            htmlFor="csvFileInput"
            className="flex items-center justify-center w-full h-[10vh] mt-10 px-4 py-2 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white"
          >
            <FaFileUpload className="w-8 h-8" />
            <span className="ml-2 text-base leading-normal">
              {file ? file.name : "Sélectionner un fichier CSV"}
            </span>
          </label>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex justify-center items-center w-full h-[6vh] bg-[#F2505D] rounded-md text-white text-base font-medium hover:bg-[#df3846]"
        >
          {isPending ? "Envoi en cours..." : buttonText}
        </button>
      </div>
    </div>
  );
};

export default CsvUploader;
