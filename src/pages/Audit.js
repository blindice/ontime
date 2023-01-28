import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { translationFirebaseErrorsEN } from "react-translation-firebase-errors";
import { db } from "../app/db";

import Toast from "../components/Toast";

export default function Audit() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const getAll = async () => {
    try {
      setLoading(true);

      const list = query(collection(db, "audit"), orderBy("date", "desc"));

      const querySnapshot = await getDocs(list);
      let datas = [];
      querySnapshot.forEach((item) =>
        datas.push({
          id: item.id,
          user: item.data().user,
          activity: item.data().activity,
          description: item.data().description,
          date: item.data().date,
          priority: item.data().priority,
          status: item.data().status,
        })
      );

      setFiles(datas);
      setLoading(false);
    } catch (err) {
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };

  useEffect(() => {
    (async () => {
      await getAll();
    })();
  }, []);

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "activity",
      headerName: "Activity",
      flex: 1,
      minWidth: 100,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 500,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "user",
      headerName: "User",
      flex: 1,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      minWidth: 75,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 75,
      headerClassName: "super-app-theme--header",
    },
  ];
  return (
    <div>
      <div style={{ position: "absolute" }}>
        <p
          style={{
            fontFamily: "Roboto",
            fontSize: "20px",
            fontWeight: 700,
            color: "#1565c0",
          }}
        >
          Audit Trace
        </p>
      </div>
      <div
        style={{
          height: "66.8vh",
          width: "70vw",
          marginTop: "3%",
        }}
      >
        <DataGrid
          pageSize={10}
          rows={files}
          columns={columns}
          loading={loading}
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontFamily: "Work Sans",
            transform: "translate(5em, 5em)",
            "& .super-app-theme--header": {
              fontFamily: "Roboto",
              fontWeight: 700,
            },
          }}
        />
      </div>
    </div>
  );
}
