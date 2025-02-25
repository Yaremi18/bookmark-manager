import { useCollections } from "@/hooks/useCollections";
import Form from "next/form";
import { useActionState, useRef } from "react";
import { Tags } from "./tags";

type BookmarkFormProps = {
  onSubmit: (state: FormState) => Promise<void>;
  defaultValue?: FormState;
  extraAction?: React.ReactNode;
  loading?: boolean;
};

type FormState =
  | Pick<
      Bookmarker.Bookmark,
      "title" | "url" | "description" | "collectionId" | "tags"
    >
  | undefined;

const BookmarkForm: React.FC<BookmarkFormProps> = ({
  onSubmit,
  defaultValue,
  extraAction,
  loading,
}) => {
  const { collectionsData, collectionsLoading } = useCollections();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, action, actionLoading] = useActionState(
    (prevState: FormState, formData: FormData) => {
      const _formData = {
        title: formData.get("title") as string,
        url: formData.get("url") as string,
        description: formData.get("description") as string,
        collectionId: formData.get("collectionId") as string,
        tags: (formData.get("tags") as string)?.split(","),
      };

      return _formData;
    },
    defaultValue
  );

  return (
    <Form
      ref={formRef}
      action={action}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(state);
      }}
      className="grid gap-5 my-5 w-full"
    >
      <fieldset className="form-item">
        <label htmlFor="title" id="title-label" className="form-label">
          Title:
        </label>
        <input
          id="title"
          type="text"
          className="input"
          name="title"
          defaultValue={state?.title}
        />
      </fieldset>
      <fieldset className="form-item">
        <label htmlFor="url" id="url-label" className="form-label">
          URL:
        </label>
        <input
          id="url"
          type="text"
          className="input"
          name="url"
          defaultValue={state?.url}
        />
      </fieldset>
      <fieldset className="form-item">
        <label
          htmlFor="description"
          id="description-label"
          className="form-label"
        >
          Description:
        </label>
        <input
          id="description"
          type="text"
          className="input"
          name="description"
          defaultValue={state?.description}
        />
      </fieldset>
      <fieldset className="form-item">
        <label
          htmlFor="collectionId"
          id="collection-id-label"
          className="form-label"
        >
          Collection:
        </label>
        <select
          id="collectionId"
          className="input"
          name="collectionId"
          defaultValue={state?.collectionId}
          onChange={(e) => {
            if (formRef.current) {
              const formData = new FormData(formRef.current);
              if (state?.tags) formData.append("tags", state.tags.join(","));
              formData.append("collectionId", e.target.value);
              console.log(formData);
              action(formData);
            }
          }}
        >
          {collectionsLoading ? (
            <option>...</option>
          ) : (
            collectionsData?.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))
          )}
        </select>
      </fieldset>
      <fieldset className="form-item">
        <label htmlFor="tags" id="tags-label" className="form-label">
          Tags:
        </label>
        <Tags
          id="tags"
          defaultValue={state?.tags}
          action={(tags: string[]) => {
            if (formRef.current) {
              const formData = new FormData(formRef.current);
              if (tags.length === 0) formData.delete("tags");
              else formData.append("tags", tags.join(","));
              action(formData);
            }
          }}
        />
      </fieldset>
      <div className="flex justify-end gap-5">
        {extraAction}
        <button
          className="btn-primary"
          disabled={loading || actionLoading}
          type="submit"
        >
          {loading || actionLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </Form>
  );
};

export { BookmarkForm };
