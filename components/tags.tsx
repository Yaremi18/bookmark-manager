import { XIcon } from "@/components/icons";

type TagsProps = {
  id: string;
  defaultValue?: string[];
  action: (tags: string[]) => void;
};
const Tags: React.FC<TagsProps> = ({ defaultValue, id, action }) => (
  <>
    <div className="flex flex-wrap gap-2">
      {defaultValue?.map((tag) => (
        <div key={tag} className="tag flex align-middle">
          <span>{tag}</span>
          <button
            type="button"
            className="text-accent ml-3"
            onClick={() => {
              const newTags = defaultValue?.filter((t) => t !== tag);
              action(newTags);
            }}
          >
            <XIcon />
          </button>
        </div>
      ))}
    </div>
    <input
      id={id}
      type="text"
      className="input"
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();

        const { value } = e.currentTarget;
        if (defaultValue?.includes(value)) {
          action(defaultValue);
        } else {
          const newTags = defaultValue ? [...defaultValue, value] : [value];
          action(newTags);
        }

        e.currentTarget.value = "";
      }}
    />
  </>
);

export { Tags };
