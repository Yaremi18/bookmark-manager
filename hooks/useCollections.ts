import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useCollections = () => {
  const {
    data: collectionsData,
    isLoading: collectionsLoading,
    error: collectionsError,
  } = useSWR<Bookmarker.Collection[]>("/api/collections", fetcher);

  return {
    collectionsData,
    collectionsLoading,
    collectionsError,
  };
};
