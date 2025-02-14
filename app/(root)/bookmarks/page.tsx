import { BookmarkCard } from "@/app/components/bookmarkCard";
import Form from "next/form";

const Bookmarks = () => {
  const bookmarks = [
    {
      _id: "1",
      title: "Next.js Documentation",
      url: "https://nextjs.org/docs",
      description: "Official documentation for Next.js, a React framework.",
      tags: ["nextjs", "react", "documentation"],
      collection: "Web Development",
      isFavorite: false,
      shared: false,
      createdAt: "2025-02-12T14:30:00Z",
    },
    {
      _id: "2",
      title: "Next.js Documentation",
      url: "https://nextjs.org/docs",
      description: "Official documentation for Next.js, a React framework.",
      tags: ["nextjs", "react", "documentation"],
      collection: "Web Development",
      isFavorite: false,
      shared: false,
      createdAt: "2025-02-12T14:30:00Z",
    },
    {
      _id: "3",
      title: "Next.js Documentation",
      url: "https://nextjs.org/docs",
      description: "Official documentation for Next.js, a React framework.",
      tags: ["nextjs", "react", "documentation"],
      collection: "Web Development",
      isFavorite: true,
      shared: false,
      createdAt: "2025-02-12T14:30:00Z",
    },
    {
      _id: "4",
      title: "Next.js Documentation",
      url: "https://nextjs.org/docs",
      description: "Official documentation for Next.js, a React framework.",
      tags: ["nextjs", "react", "documentation"],
      collection: "Web Development",
      isFavorite: true,
      shared: false,
      createdAt: "2025-02-12T14:30:00Z",
    },
  ];

  return (
    <section>
      <h1 className="text-2xl my-4">Your bookmarks</h1>
      <div className="flex justify-end my-5">
        <button className="btn-primary">New bookmark</button>
      </div>
      <Form action={""} className="flex gap-5 flex-wrap my-5">
        <fieldset className="form-item">
          <label htmlFor="search" id="search-label" className="form-label">
            Search for name:
          </label>
          <input id="search" type="text" className="input" />
        </fieldset>
        <fieldset className="form-item">
          <label
            htmlFor="collection"
            id="collection-label"
            className="form-label"
          >
            Filter by collection:
          </label>
          <select id="collection" className="input">
            <option value="all">All</option>
          </select>
        </fieldset>
        <fieldset className="form-item">
          <label htmlFor="tags" id="tags-label" className="form-label">
            Tags:
          </label>
          <input id="tags" type="text" className="input" />
        </fieldset>
        <fieldset className="form-item">
          <label htmlFor="favorite" id="favorite-label" className="form-label">
            Only favorites:
          </label>
          <input type="checkbox" id="favorite" className="checkbox" />
        </fieldset>
      </Form>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark._id} bookmark={bookmark} />
        ))}
      </div>
    </section>
  );
};

export default Bookmarks;
