import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

/**
 * A custom storage engine that does nothing on the server (no-operation).
 * This is used to prevent errors during server-side rendering.
 */
const createNoopStorage = (): WebStorage => {
  return {
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any): Promise<void> {
      return Promise.resolve();
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};

/**
 * Checks if the code is running in a browser environment.
 * If it is, it uses the standard 'localStorage'.
 * If it's not (i.e., on the server), it uses the no-op storage.
 */
const storage: WebStorage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
