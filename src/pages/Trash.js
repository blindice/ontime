import React, { useEffect, useState } from "react";
import { storage, db } from "../app/db";
import Skeleton from "@mui/material/Skeleton";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { translationFirebaseErrorsEN } from "react-translation-firebase-errors";
import { useSelector } from "react-redux";

import {
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  deleteObject,
} from "firebase/storage";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonGroup from "@mui/material/ButtonGroup";
import Toast from "../components/Toast";
import useEmail from "../hooks/useEmail";
import { audit } from "../helper/worker";

export default function Trash() {
  const { token } = useSelector((state) => state.account);
  const { email } = useEmail(token);
  const [type, setType] = useState(0);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAll = async () => {
    try {
      setLoading(true);
      const list = query(
        collection(db, "files"),
        where("isDeleted", "==", true)
      );
      const querySnapshot = await getDocs(list);
      let datas = [];
      querySnapshot.forEach((item) =>
        datas.push({ id: item.id, name: item.data().filename })
      );

      const listRef = ref(storage);
      const resList = await listAll(listRef);
      let items = [];

      await Promise.all(
        resList.items.map(async (item) => {
          const { name } = item;
          if (datas.some((data) => data.name === name)) {
            const { id } = datas.find((data) => data.name === name);
            const url = await getDownloadURL(item);
            const meta = await getMetadata(item);
            items.push({
              id: id,
              name: name,
              url: url,
              size: meta.size,
              type: meta.contentType,
              lastUpdated: meta.updated,
            });
          }
        })
      );
      setLoading(false);
      return items;
    } catch (err) {
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };

  const getAllImage = async () => {
    try {
      setLoading(true);
      const files = await getAll();
      const filtered = files.filter((file) => file["type"].includes("image"));
      setFiles(filtered);
      setType(1);

      await audit({
        user: email,
        activity: "Viewing",
        date: Date.now(),
        description: "Viewing Images on Trash",
        priority: "Low",
        status: "Success",
      });

      setLoading(false);
    } catch (err) {
      await audit({
        user: email,
        activity: "Viewing",
        date: Date.now(),
        description: "Viewing Images on Trash",
        priority: "Low",
        status: "Failed",
      });
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };

  const getAllVideos = async () => {
    try {
      setLoading(true);
      const files = await getAll();
      const filtered = files.filter((file) => file["type"].includes("video"));
      setFiles(filtered);
      setType(2);

      await audit({
        user: email,
        activity: "Viewing",
        date: Date.now(),
        description: "Viewing Videos on Trash",
        priority: "Low",
        status: "Success",
      });

      setLoading(false);
    } catch (err) {
      await audit({
        user: email,
        activity: "Viewing",
        date: Date.now(),
        description: "Viewing Videos on Trash",
        priority: "Low",
        status: "Failed",
      });
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };

  const getAllAudio = async () => {
    try {
      setLoading(true);
      const files = await getAll();
      const filtered = files.filter((file) => file["type"].includes("audio"));
      setFiles(filtered);
      setType(3);

      await audit({
        user: email,
        activity: "Viewing",
        date: Date.now(),
        description: "Viewing Audios on Trash",
        priority: "Low",
        status: "Success",
      });

      setLoading(false);
    } catch (err) {
      await audit({
        user: email,
        activity: "Viewing",
        date: Date.now(),
        description: "Viewing Audios on Trash",
        priority: "Low",
        status: "Failed",
      });
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };

  const getAllDocuments = async () => {
    try {
      setLoading(true);
      const files = await getAll();
      const filtered = files.filter((file) =>
        file["type"].includes("application")
      );
      setFiles(filtered);
      setType(4);

      await audit({
        user: email,
        activity: "Viewing",
        date: Date.now(),
        description: "Viewing Documents on Trash",
        priority: "Low",
        status: "Success",
      });

      setLoading(false);
    } catch (err) {
      await audit({
        user: email,
        activity: "Viewing",
        date: Date.now(),
        description: "Viewing Documents on Trash",
        priority: "Low",
        status: "Failed",
      });
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };

  const getAllFiles = async () => {
    try {
      setLoading(true);
      const files = await getAll();
      setFiles(files);
      setType(0);
      setLoading(false);
    } catch (err) {
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };

  useEffect(() => {
    (async () => {
      const datas = await getAll();
      setFiles(datas);
    })();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "File Name",
      flex: 1,
      minWidth: 275,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "lastUpdated",
      headerName: "Last Updated",
      headerClassName: "super-app-theme--header",
      width: 150,
      valueGetter: (params) => {
        let newDate = new Date(params.row.lastUpdated);
        return (
          newDate.getMonth() +
          1 +
          "/" +
          newDate.getDay() +
          "/" +
          newDate.getFullYear() +
          " " +
          newDate.getHours() +
          ":" +
          newDate.getMinutes()
        );
      },
    },
    {
      field: "size",
      headerName: "Size",
      headerClassName: "super-app-theme--header",
      width: 125,
      valueGetter: (params) => {
        const size = params.row.size;
        if (!+size) return "0 Bytes";

        const k = 1024;
        const dm = 2 < 0 ? 0 : 2;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(size) / Math.log(k));

        return `${parseFloat((size / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
      },
    },
    {
      field: "restore",
      headerName: "Restore",
      headerClassName: "super-app-theme--header",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <IconButton
          onClick={() => handleRestore(row.id, row.name)}
          size="small"
        >
          <RestoreIcon color="primary" />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: "super-app-theme--header",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleDelete(row.id, row.name)} size="small">
          <DeleteForeverIcon sx={{ color: "#c92216" }} />
        </IconButton>
      ),
    },
  ];
  const handleRestore = (id, name) => {
    const ref = doc(db, "files", id);
    updateDoc(ref, { isDeleted: false })
      .then(() => {
        console.log("Restore Successful!");
        if (type === 1) {
          getAllImage();
        } else if (type === 2) {
          getAllVideos();
        } else if (type === 3) {
          getAllAudio();
        } else if (type === 4) {
          getAllDocuments();
        } else {
          getAllFiles();
        }
      })
      .then(() => {
        audit({
          user: email,
          activity: "Restore",
          date: Date.now(),
          description: `Restored ${name} on Trash`,
          priority: "Low",
          status: "Success",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id, name) => {
    const dataRef = doc(db, "files", id);
    const itemRef = ref(storage, name);

    await deleteDoc(dataRef, { isDeleted: false });
    await deleteObject(itemRef);

    if (type === 1) {
      getAllImage();
    } else if (type === 2) {
      getAllVideos();
    } else if (type === 3) {
      getAllAudio();
    } else if (type === 4) {
      getAllDocuments();
    } else {
      getAllFiles();
    }

    await audit({
      user: email,
      activity: "Delete",
      date: Date.now(),
      description: `Deleted ${name} on Trash`,
      priority: "Low",
      status: "Success",
    });
  };

  if (files)
    return (
      <>
        <div style={{ position: "absolute" }}>
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "20px",
              fontWeight: 700,
              color: "#1565c0",
            }}
          >
            Trash
          </p>
        </div>
        <div
          style={{
            height: "60vh",
            width: "70vw",
          }}
        >
          <div style={{ transform: "translate(5em, 3em)" }}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              size="small"
            >
              <Button onClick={getAllFiles}>All</Button>
              <Button onClick={getAllAudio}>Audios</Button>
              <Button onClick={getAllDocuments}>Documents</Button>
              <Button onClick={getAllImage}>Images</Button>
              <Button onClick={getAllVideos}>Videos</Button>
            </ButtonGroup>
          </div>
          <DataGrid
            pageSize={10}
            rows={files}
            columns={columns}
            loading={loading}
            size="small"
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
        <Toast />
      </>
    );

  return <Skeleton variant="rectangular" width={210} height={118} />;
}
