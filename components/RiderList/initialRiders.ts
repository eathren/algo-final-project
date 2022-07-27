import { v4 as uuidv4 } from "uuid";
import { Rider } from "../../types/Rider";

export const initialRiders: Rider[] = [
  {
    id: uuidv4(),
    name: "John Adams",
    longitude: -71.07328210280562,
    latitude: 42.35068511574224,
  },
  {
    id: uuidv4(),
    name: "Samuel Franklin",
    longitude: -71.07877298361849,
    latitude: 42.343584659175605,
  },
  {
    id: uuidv4(),
    name: "Ted Stevens",
    longitude: -71.10468307745334,
    latitude: 42.34383830953348,
  },
];
