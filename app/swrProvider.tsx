"use client";
import { fetcher } from "@/utils/fetcher";
import { SWRConfig } from "swr";

type SWRProviderProps = {
  children: React.ReactNode;
};

export const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => (
  <SWRConfig
    value={{
      fetcher,
      revalidateOnFocus: false,
    }}
  >
    {children}
  </SWRConfig>
);
