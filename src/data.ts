export type Datum = {
  name: string;
  output: string;
  last_updated: string;
};

export type DataEntries = Record<string, Datum>;
