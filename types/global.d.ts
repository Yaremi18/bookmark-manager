declare namespace Bookmarker {
  type Bookmark = {
    id: string;
    title: string;
    url: string;
    description: string;
    tags: string[];
    collection: {
      name: string;
    };
    collectionId: string;
    isFavorite: boolean;
    shared: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  };

  type Collection = {
    id: string;
    name: string;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type List<T = any> = {
    data: T[];
    total: number;
  };
}
