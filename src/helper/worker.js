import { db } from "../app/db";
import { collection, addDoc } from "firebase/firestore";

export const audit = async (data) => {
  await addDoc(collection(db, "audit"), {
    user: data.user,
    activity: data.activity,
    date: data.date,
    description: data.description,
    priority: data.priority,
    status: data.status,
  });
};
