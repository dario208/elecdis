import useGetDataWithPagination from "@/lib/hoocks/useGetDataWithPagination";

export const StationApi = (url,queryKey,page,number_items) => useGetDataWithPagination(url, queryKey, page, number_items)

