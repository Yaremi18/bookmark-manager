"use client";

import { BookmarkForm } from "@/app/components/bookmarkForm";
import { redirect } from "next/navigation";
import { use } from "react";
import { useBookmark } from "./useBookmark";

type BookmarkProps = {
  params: Promise<{
    id: string;
  }>;
};

const Bookmark = ({ params }: BookmarkProps) => {
  const { id } = use(params);

  const {
    bookmarkData,
    bookmarkLoading,
    bookmarkError,
    updateBookmark,
    bookmarkUpdating,
    deleteBookmark,
    bookmarkDeleting,
  } = useBookmark({
    id,
  });

  return (
    <>
      {bookmarkLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <BookmarkForm
          loading={bookmarkUpdating}
          defaultValue={bookmarkData}
          onSubmit={updateBookmark}
          extraAction={
            <button
              className="btn-outlined"
              onClick={(e) => {
                e.preventDefault();
                deleteBookmark();
                redirect("/bookmarks");
              }}
              disabled={bookmarkDeleting || bookmarkUpdating}
            >
              {bookmarkDeleting ? "Deleting..." : "Delete"}
            </button>
          }
        />
      )}
      {bookmarkError && (
        <p className="text-center">Error retrieving bookmark</p>
      )}
    </>
  );
};

export default Bookmark;
