import { StateStorage } from "zustand/middleware";

import { del, get, set } from "idb-keyval";

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    return await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

// created by nolan
