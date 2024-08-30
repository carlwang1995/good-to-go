"use server";
import React from "react";
import PlanContent from "./PlanContent";
import { DB_getTripNameByDocId } from "@/libs/db/EditTripPage";

const PlanProvider = async ({ docId }: { docId: string }) => {
  const tripInfo: any = await DB_getTripNameByDocId(docId);
  return <PlanContent docId={docId} tripInfo={tripInfo} />;
};

export default PlanProvider;
