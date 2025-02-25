export const fetcher = async (url: string, init?: RequestInit) => {
  const res = await fetch(url, init);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Something went wrong");
  }
  return res.json();
};

// eslint-disable-next-line
export const updateFetcher = async (url: string, { arg }: { arg: any }) =>
  fetcher(url, {
    method: "PATCH",
    body: JSON.stringify(arg),
  });

// eslint-disable-next-line
export const deleteFetcher = async (url: string, { arg }: { arg: any }) =>
  fetcher(url, {
    method: "DELETE",
    body: JSON.stringify(arg),
  });
