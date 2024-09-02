import { getDateBetween } from "@/libs/getDatesBetween";
import { DB_getPlanByDocId, DB_updateTrips } from "@/libs/db/EditTripPage";
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
    console.log("天數不變");
    return;
  }
  let planDocId;
  // 如果新的區間大於舊的區間，新增dayN:{lastEditTime:getTimeNow(),palces:[],startTime:"08:00"}
  if (currentDates.length < newDates.length) {
    const planDoc = await DB_getPlanByDocId(docId);
    if (!planDoc) {
      throw new Error("無法取得Plan資料");
    }
    planDocId = planDoc.planDocId;
    const currentTrips = planDoc.planContent.trips;
    let extraTrips: Record<string, any> = {};
    for (let i = currentDates.length; i < newDates.length; i++) {
      extraTrips[`day${i + 1}`] = newObj;
    }
    console.log("增加日期後的trips:", { ...currentTrips, ...extraTrips });
    return { planDocId, trips: { ...currentTrips, ...extraTrips } };
  }
  // 如果新的區間小於舊的區間，刪除dayN
  if (currentDates.length > newDates.length) {
    const planDoc = await DB_getPlanByDocId(docId);
    if (!planDoc) {
      throw new Error("無法取得Plan資料");
    }
    planDocId = planDoc.planDocId;
    const currentTrips: Record<string, any> = planDoc.planContent.trips;
    for (let i = currentDates.length; i > newDates.length; i--) {
      delete currentTrips[`day${i}`];
    }
    console.log("減少日期後的trips:", currentTrips);
    return { planDocId, trips: currentTrips };
  }
};
