import { Rider } from "../types/Rider";

type UserState = {
  users: Rider[] | null;
  //   getUsers: Rider[];
  // creates a new user
  //   setUser: (name: string, longitude: string, latitidue: string) => void;

  //   increase: (by: number) => void;
};

// const useStore = create<UserState>(
//   persist(
//     (set, get) => ({
//       users: null,
//       //   getUsers: get,
//     }),
//     {
//       name: "users",
//       getStorage: () => storage,
//     }
//   )
// );
