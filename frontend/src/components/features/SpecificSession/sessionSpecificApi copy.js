import useGetSpecificDataWithPagination from "@/lib/hoocks/useGetSpecificDataWithPagination";

export const useGetSpecificSession = (url, id, queryKey,page,number_items) => useGetSpecificDataWithPagination(url,id, queryKey, page, number_items)

