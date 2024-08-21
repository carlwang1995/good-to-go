import { createContext } from "react";

const DeleteContext = createContext<any>(null);
const DayIndexContext = createContext<string>("");
const DestinationContext = createContext<Array<string>>([]);
const MarkerContext = createContext<any>(null);
const ReloadStateContext = createContext<{
  planDocId: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export {
  DeleteContext,
  DayIndexContext,
  DestinationContext,
  MarkerContext,
  ReloadStateContext,
};
