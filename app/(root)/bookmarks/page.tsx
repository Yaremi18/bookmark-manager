"use client";

import { BookmarkCard } from "@/app/components/bookmarkCard";
import { LIST_LIMIT } from "@/constants";
import Form from "next/form";
import { useBookmarks } from "./useBookmarks";

const Bookmarks = () => {
  const {
    formAction,
    state,
    page,
    setPage,
    bookmarksData,
    bookmarksLoading,
    bookmarksError,
  } = useBookmarks();

  return (
    <section>
      <h1 className="text-2xl my-4">Your bookmarks</h1>
      <div className="flex justify-end my-5">
        <button className="btn-primary">New bookmark</button>
      </div>
      <Form action={formAction} className="flex gap-5 flex-wrap my-5 ">
        <fieldset className="form-item">
          <label htmlFor="search" id="search-label" className="form-label">
            Search for name:
          </label>
          <input
            id="search"
            type="text"
            className="input"
            name="search"
            defaultValue={state.search}
          />
        </fieldset>
        <fieldset className="form-item">
          <label
            htmlFor="collection"
            id="collection-label"
            className="form-label"
          >
            Filter by collection:
          </label>
          <select
            id="collection"
            className="input"
            name="collectionId"
            defaultValue={state.collectionId}
          >
            <option value="all">All</option>
          </select>
        </fieldset>
        <fieldset className="form-item">
          <label htmlFor="tags" id="tags-label" className="form-label">
            Tags:
          </label>
          <input
            id="tags"
            type="text"
            className="input"
            name="tags"
            defaultValue={state.tags}
          />
        </fieldset>
        <fieldset className="form-item">
          <label htmlFor="favorite" id="favorite-label" className="form-label">
            Only favorites:
          </label>
          <input
            type="checkbox"
            id="favorite"
            className="checkbox"
            name="onlyFavorites"
            defaultChecked={state.onlyFavorites}
          />
        </fieldset>
        <button type="submit" className="btn-outlined self-center ml-5">
          Search
        </button>
      </Form>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {bookmarksData.data.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>

      {bookmarksLoading ? (
        <p className="text-center">Loading...</p>
      ) : !bookmarksData.total ? (
        <p className="text-center">No bookmarks found</p>
      ) : (
        (bookmarksData.total || 0) > page * LIST_LIMIT && (
          <div className="flex justify-center my-5">
            <button
              className="btn-outlined"
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
            >
              Load more
            </button>
          </div>
        )
      )}

      {bookmarksError && (
        <p className="text-center">Error: {bookmarksError.message}</p>
      )}
    </section>
  );
};

export default Bookmarks;
