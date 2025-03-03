import { DEFAULT_LIST, LIST_LIMIT } from "@/constants";
import { useActionState, useEffect, useState } from "react";
import useSWR from "swr";

const initialState = {
  search: "",
  onlyFavorites: false,
  tags: "",
  collectionId: "all",
};

type FormState = {
  search: string;
  tags: string;
  onlyFavorites: boolean;
  collectionId?: string;
};

const createBookmarksUrl = (state: FormState, page: number) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: LIST_LIMIT.toString(),
    search: state.search,
    tags: state.tags,
    onlyFavorites: state.onlyFavorites.toString(),
  });

  if (state.collectionId && state.collectionId !== "all") {
    params.append("collectionId", state.collectionId);
  }

  return `/api/bookmarks?${params.toString()}`;
};

export const useBookmarks = () => {
  const [page, setPage] = useState(1);

  const [bookmarks, setBookmarks] =
    useState<Bookmarker.List<Bookmarker.Bookmark>>(DEFAULT_LIST);

  const [state, formAction, formLoading] = useActionState(
    (prevState: FormState, formData: FormData) => {
      setPage(1);
      setBookmarks(DEFAULT_LIST);

      const newState = {
        search: formData.get("search") as string,
        tags: formData.get("tags") as string,
        onlyFavorites: formData.get("onlyFavorites") === "on",
        collectionId: formData.get("collectionId") as string,
      };

      if (JSON.stringify(newState) !== JSON.stringify(prevState)) {
        setPage(1);
      }
      return newState;
    },
    initialState
  );

  const {
    data: bookmarksData,
    isLoading: bookmarksLoading,
    error: bookmarksError,
  } = useSWR<Bookmarker.List<Bookmarker.Bookmark>>(
    createBookmarksUrl(state, page)
  );

  useEffect(() => {
    if (bookmarksLoading || !bookmarksData) return;

    setBookmarks((prev) => {
      if (!prev) return bookmarksData;

      const mergedMap = new Map();
      bookmarksData.data.forEach((item) => mergedMap.set(item.id, item));

      return {
        total: bookmarksData.total,
        data: Array.from(mergedMap.values()),
      };
    });
  }, [bookmarksData, bookmarksLoading, state]);

  useEffect(() => {
    return () => {
      setBookmarks(DEFAULT_LIST);
      setPage(1);
    };
  }, []);

  return {
    bookmarksData: bookmarks,
    bookmarksLoading,
    bookmarksError,
    formAction,
    formLoading,
    state,
    page,
    setPage,
  };
};
