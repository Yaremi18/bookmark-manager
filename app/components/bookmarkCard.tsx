import dayjs from "dayjs";
import Link from "next/link";
import { EditIcon, HeartFilledIcon, HeartIcon } from "./icons";

type BookmarkCardProps = {
  bookmark: Bookmarker.Bookmark;
};
const BookmarkCard: React.FC<BookmarkCardProps> = ({
  bookmark: {
    id,
    title,
    url,
    description,
    tags,
    collection,
    isFavorite,
    createdAt,
  },
}) => {
  return (
    <div className="group p-4 rounded-lg bg-card border border-transparent hover:border-primary-300 cursor-pointer">
      <div className="flex justify-between gap-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <Link href={`/bookmarks/${id}`}>
          <span className="text-accent group-hover:text-primary-300">
            <EditIcon />
          </span>
        </Link>
      </div>

      <p className="text-xs text-accent">
        {dayjs(createdAt).format("DD MMMM YYYY")}
      </p>

      <p className="my-4">{description}</p>
      <span className="text-sm text-accent ">{`Collection: ${collection.name}`}</span>
      <div className="flex gap-2 my-2">
        {tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between gap-2 mt-4">
        <button>
          <span className="text-accent hover:text-primary-300">
            {isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
          </span>
        </button>
        <a
          className="btn-link !px-[0px]"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          Open bookmark
        </a>
      </div>
    </div>
  );
};

export { BookmarkCard };
