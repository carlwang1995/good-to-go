import { createContext } from "react";

const DayIndexContext = createContext<string>("");
const DestinationContext = createContext<Array<string>>([]);
const DocIdContext = createContext<string>("");
const StateContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);
const EditableContext = createContext<boolean>(false);

export {
  DayIndexContext,
  DestinationContext,
  DocIdContext,
  StateContext,
  EditableContext,
};
