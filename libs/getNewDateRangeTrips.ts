import { getDateBetween } from "@/libs/getDatesBetween";
import { DB_getPlanByTripsDocId } from "@/libs/db/PlansDoc";
import { getTimeNow } from "@/libs/timeConvertor";

export const getNewDateRangeTrips = async (
  docId: string,
  currentDates: string[],
  startDate: string,
  endDate: string,
) => {
  const newObj = {
    lastEditTime: getTimeNow(),
    places: [],
    startTime: "08:00",
  };
  const newDates = getDateBetween(startDate, endDate);
  if (currentDates.length === newDates.length) {
    return;
  }
  let planDocId;
  // 如果新的區間大於舊的區間，新增dayN:{lastEditTime:getTimeNow(),palces:[],startTime:"08:00"}
  if (currentDates.length < newDates.length) {
    const planDoc = await DB_getPlanByTripsDocId(docId);
    if (!planDoc) {
      throw new Error("無法取得Plan資料");
    }
    planDocId = planDoc.planDocId;
    const currentTrips = planDoc.planContent.trips;
    let extraTrips: Record<string, any> = {};
    for (let i = currentDates.length; i < newDates.length; i++) {
      extraTrips[`day${i + 1}`] = newObj;
    }
    return { planDocId, trips: { ...currentTrips, ...extraTrips } };
  }
  // 如果新的區間小於舊的區間，刪除dayN
  if (currentDates.length > newDates.length) {
    const planDoc = await DB_getPlanByTripsDocId(docId);
    if (!planDoc) {
      throw new Error("無法取得Plan資料");
    }
    planDocId = planDoc.planDocId;
    const currentTrips: Record<string, any> = planDoc.planContent.trips;
    for (let i = currentDates.length; i > newDates.length; i--) {
      delete currentTrips[`day${i}`];
    }
    return { planDocId, trips: currentTrips };
  }
};
