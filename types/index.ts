export enum Variant {
  taxi = "taxi",
  rider = "rider",
}

type Unit = {
  id: string;
  name: string;
  node: string;
  color: string;
  variant: Variant;
};

export type Rider = Unit & {};

export type Taxi = Unit & {
  capacity: number;
  carrying: number;
};
