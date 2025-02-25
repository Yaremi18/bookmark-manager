import { newFetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

export const useNewBookmark = () => {
  const { trigger: newBookmark, isMutating: bookmarkCreating } = useSWRMutation(
    "/api/bookmarks",
    newFetcher,
    {
      revalidate: false,
      populateCache: true,
    }
  );

  return {
    newBookmark,
    bookmarkCreating,
  };
};
