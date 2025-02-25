"use client";

import { BookmarkCard } from "@/components/bookmarkCard";
import { LIST_LIMIT } from "@/constants";
import { useCollections } from "@/hooks/useCollections";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useBookmarks } from "./useBookmarks";

const Bookmarks = () => {
  const router = useRouter();
  const {
    formAction,
    formLoading,
    state,
    page,
    setPage,
    bookmarksData,
    bookmarksLoading,
    bookmarksError,
  } = useBookmarks();

  const { collectionsData, collectionsLoading, collectionsError } =
    useCollections();

  return (
    <section>
      <h1 className="text-2xl my-4">Your bookmarks</h1>
      <div className="flex justify-end my-5">
        <button
          className="btn-primary"
          onClick={() => {
            router.push("/bookmarks/new");
          }}
        >
          New bookmark
        </button>
      </div>
      <Form action={formAction} className="flex gap-5 flex-wrap my-5 ">
        <fieldset className="form-item">
          <label htmlFor="search" id="search-label" className="form-label">
            Search for title:
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
            htmlFor="collectionId"
            id="collection-label"
            className="form-label"
          >
            Filter by collection:
          </label>
          <select
            id="collectionId"
            className="input"
            name="collectionId"
            defaultValue={state.collectionId}
          >
            {collectionsLoading ? (
              <option>...</option>
            ) : (
              <>
                <option value="all">All</option>
                {collectionsData?.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </>
            )}
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
        <button
          type="submit"
          disabled={formLoading}
          className="btn-outlined self-center ml-5"
        >
          {formLoading ? "Searching..." : "Search"}
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
        <p className="text-center">Bookmarks error: {bookmarksError.message}</p>
      )}
      {collectionsError && (
        <p className="text-center">
          Collections error: {collectionsError.message}
        </p>
      )}
    </section>
  );
};

export default Bookmarks;
