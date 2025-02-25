"use client";

import { BookmarkForm } from "@/app/components/bookmarkForm";
import { useRouter } from "next/navigation";
import React from "react";
import { useNewBookmark } from "./useNewBookmark";

const NewBookmark: React.FC = () => {
  const router = useRouter();
  const { newBookmark, bookmarkCreating } = useNewBookmark();
  return (
    <BookmarkForm
      loading={bookmarkCreating}
      onSubmit={async (state) => {
        await newBookmark(state);
        router.replace("/bookmarks");
      }}
    />
  );
};

export default NewBookmark;
