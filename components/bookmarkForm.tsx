import { useCollections } from "@/hooks/useCollections";
import { newFetcher } from "@/utils/fetcher";
import { useActionState, useRef } from "react";
import useSWRMutation from "swr/mutation";
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
      let _formData = {} as any; // eslint-disable-line
      formData.forEach((value, key) => {
        _formData = {
          ..._formData,
          [key]:
            key === "tags" ? (value as string)?.split(",") : (value as string),
        };
      });

      return {
        ...prevState,
        ..._formData,
      };
    },
    defaultValue
  );

  const { trigger } = useSWRMutation("/api/ai", newFetcher);

  const updateFormData = ({
    target,
  }: {
    target: { value: string; name: string };
  }) => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      formData.append(target.name, target.value);

      action(formData);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(state);
      }}
      className="grid gap-5 my-5 w-full"
    >
      <fieldset className="form-item flex flex-nowrap flex-row">
        <label htmlFor="url" id="url-label" className="form-label">
          URL:
        </label>
        <input
          id="url"
          type="text"
          className="input"
          name="url"
          value={state?.url}
          onChange={updateFormData}
        />

        {state?.url && (
          <button
            className="btn-link"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log(state.url);
              const data = await trigger({
                url: state.url,
              });

              if (formRef.current) {
                const formData = new FormData(formRef.current);

                formData.set("title", data.title);
                formData.set("description", data.description);
                if (data.tags) formData.set("tags", data.tags.join(","));

                action(formData);
              }
            }}
          >
            Auto fill with openai
          </button>
        )}
      </fieldset>
      <fieldset className="form-item">
        <label htmlFor="title" id="title-label" className="form-label">
          Title:
        </label>
        <input
          id="title"
          type="text"
          className="input"
          name="title"
          value={state?.title}
          onChange={updateFormData}
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
        <textarea
          id="description"
          className="input"
          name="description"
          rows={5}
          value={state?.description}
          onChange={updateFormData}
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
          value={state?.collectionId}
          onChange={updateFormData}
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
            updateFormData({
              target: {
                name: "tags",
                value: tags.join(","),
              },
            });
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
    </form>
  );
};

export { BookmarkForm };
