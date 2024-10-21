import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetDataFilter = (url, querkey) =>
  useQuery({
    queryKey: [querkey],
    queryFn: () => axiosInstance.get(url).then((response) => response.data),
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });

export const useGetDataByDay = (url, querykey, date) =>
  useQuery({
    queryKey: [querykey, date],
    queryFn: () => axiosInstance.get(`${url}?date_selected=${date}`).then((res) => res.data),
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });

export const useGetDataByMonth = (url, querykey, month, year) =>
  useQuery({
    queryKey: [querykey, month],
    queryFn: () => axiosInstance.get(`${url}?month=${month}&year=${year}`).then((res) => res.data),
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });
export const useGetDataByYear = (url, querykey, year) =>
  useQuery({
    queryKey: [querykey, year],
    queryFn: () => axiosInstance.get(`${url}?year=${year}`).then((res) => res.data),
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });
