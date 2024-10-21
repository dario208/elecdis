import useGetSpecificDataWithPaginationNoRefetch from "@/lib/hoocks/useGetSpecificDataWithPaginationNoRefetch";

export const useGetSpecificRfid = (url, id, queryKey, page, number_items) =>
  useGetSpecificDataWithPaginationNoRefetch(url, id, queryKey, page, number_items);

