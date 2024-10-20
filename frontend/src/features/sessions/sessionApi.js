import useGetDataWithPagination from "@/lib/hoocks/useGetDataWithPagination";

export const useGetSession = (url,queryKey,page,number_items) => useGetDataWithPagination(url, queryKey, page, number_items)

