import { createContext } from "react";

interface PlaceType {
  id: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openTime: Array<string>;
  stayTime: string;
  trafficMode: string;
  photos: Array<string>;
}

interface PlanTripType {
  startTime: string;
  places: Array<PlaceType>;
  lastEditTime: string;
}

type PlanContentType =
  | {
      docId: string;
      trips: {
        [key: string]: PlanTripType;
      };
    }
  | undefined;

const DayIndexContext = createContext<string>("");
const DestinationContext = createContext<Array<string>>([]);
const DocIdContext = createContext<string>("");
const StateContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);
const EditableContext = createContext<boolean | undefined>(false);
const PlanContentContext = createContext<{
  planContent: PlanContentType | undefined;
  setPlanContent:
    | React.Dispatch<React.SetStateAction<PlanContentType>>
    | undefined;
}>({ planContent: undefined, setPlanContent: undefined });
const LastEditTimeContext = createContext<
  React.Dispatch<React.SetStateAction<string | undefined>> | undefined
>(undefined);

export {
  DayIndexContext,
  DestinationContext,
  DocIdContext,
  StateContext,
  EditableContext,
  PlanContentContext,
  LastEditTimeContext,
};
