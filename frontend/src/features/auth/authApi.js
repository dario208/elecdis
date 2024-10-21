import axiosInstance from "@/lib/axiosInstance";
export const loginUser = async (data) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
}