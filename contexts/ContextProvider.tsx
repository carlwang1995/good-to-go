import { createContext } from "react";

const DayIndexContext = createContext<string>("");
const DestinationContext = createContext<Array<string>>([]);
const MarkerContext = createContext<any>(null);
const DocIdContext = createContext<string>("");
const StateContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);
const EditableContext = createContext<boolean>(false);

export {
  DayIndexContext,
  DestinationContext,
  MarkerContext,
  DocIdContext,
  StateContext,
  EditableContext,
};
