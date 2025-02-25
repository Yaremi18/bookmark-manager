import { updateFetcher } from "@/utils/fetcher";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import useSWRMutation from "swr/mutation";
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
    createdAt,
    ...rest
  },
}) => {
  const [isFavorite, setIsFavorite] = useState(rest.isFavorite);
  const router = useRouter();

  const { trigger } = useSWRMutation(`/api/bookmarks/${id}`, updateFetcher, {
    revalidate: false,
    populateCache: true,
    onSuccess: (data) => {
      setIsFavorite(data.isFavorite);
    },
  });

  const markFavorite: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    await trigger({
      isFavorite: !isFavorite,
    });
  };

  return (
    <div
      onClick={() => {
        router.push(`/bookmarks/edit/${id}`);
      }}
      className="group p-4 rounded-lg bg-card border border-transparent hover:border-primary-300 cursor-pointer"
    >
      <div className="flex justify-between gap-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-accent group-hover:text-primary-300">
          <EditIcon />
        </span>
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
        <button onClick={markFavorite}>
          <span
            className={`text-accent hover:text-primary-300 ${
              isFavorite ? "text-primary-300" : ""
            }`}
          >
            {isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
          </span>
        </button>
        <a
          className="btn-link !px-[0px]"
          href={url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Open bookmark
        </a>
      </div>
    </div>
  );
};

export { BookmarkCard };
