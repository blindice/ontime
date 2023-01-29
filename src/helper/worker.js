import { db } from "../app/db";
import { collection, addDoc } from "firebase/firestore";

export const audit = async (data) => {
  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${String(
    current.getUTCSeconds()
  ).padStart(2, "0")}`;
  await addDoc(collection(db, "audit"), {
    user: data.user,
    activity: data.activity,
    date: date,
    description: data.description,
    priority: data.priority,
    status: data.status,
  });
};
