"use client";

import { BookmarkForm } from "@/components/bookmarkForm";
import { redirect } from "next/navigation";
import { use } from "react";
import { useEditBookmark } from "./useEditBookmark";

type EditBookmarkProps = {
  params: Promise<{
    id: string;
  }>;
};

const EditBookmark = ({ params }: EditBookmarkProps) => {
  const { id } = use(params);

  const {
    bookmarkData,
    bookmarkLoading,
    bookmarkError,
    updateBookmark,
    bookmarkUpdating,
    deleteBookmark,
    bookmarkDeleting,
  } = useEditBookmark({
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

export default EditBookmark;
