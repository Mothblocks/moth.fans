export type Datum = {
  name: string;
  description: string;
  output: string;
  last_updated: string;
};

export type DataEntries = Record<string, Datum>;
