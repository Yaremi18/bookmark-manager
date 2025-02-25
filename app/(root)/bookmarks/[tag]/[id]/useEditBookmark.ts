import { deleteFetcher, updateFetcher } from "@/utils/fetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

type UseEditBookmarkProps = {
  id: string;
};

export const useEditBookmark = ({ id }: UseEditBookmarkProps) => {
  const {
    data: bookmarkData,
    isLoading: bookmarkLoading,
    error: bookmarkError,
  } = useSWR<Bookmarker.Bookmark>(`/api/bookmarks/${id}`);

  const { trigger: updateBookmark, isMutating: bookmarkUpdating } =
    useSWRMutation(`/api/bookmarks/${id}`, updateFetcher, {
      revalidate: false,
      populateCache: true,
    });

  const { trigger: deleteBookmark, isMutating: bookmarkDeleting } =
    useSWRMutation(`/api/bookmarks/${id}`, deleteFetcher, {
      revalidate: false,
      populateCache: true,
    });

  return {
    bookmarkData,
    bookmarkLoading,
    bookmarkError,
    updateBookmark,
    bookmarkUpdating,
    deleteBookmark,
    bookmarkDeleting,
  };
};
