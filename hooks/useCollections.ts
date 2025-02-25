import useSWR from "swr";

export const useCollections = () => {
  const {
    data: collectionsData,
    isLoading: collectionsLoading,
    error: collectionsError,
  } = useSWR<Bookmarker.Collection[]>("/api/collections");

  return {
    collectionsData,
    collectionsLoading,
    collectionsError,
  };
};
