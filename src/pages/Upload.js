import React, { useCallback, useState } from "react";
import { storage, db } from "../app/db";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { toast } from "react-toastify";
import { translationFirebaseErrorsEN } from "react-translation-firebase-errors";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

import Toast from "../components/Toast";
import useEmail from "../hooks/useEmail";
import { audit } from "../helper/worker";

export default function Upload() {
  const { token } = useSelector((state) => state.account);
  const { email } = useEmail(token);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const addToFireStore = async (fileName) => {
    try {
      console.log(fileName);
      const docRef = await addDoc(collection(db, "files"), {
        filename: fileName,
        isDeleted: false,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileRef = ref(storage, file.name);

      const metadata = {
        isDeleted: false,
      };
      const uploadTask = uploadBytesResumable(fileRef, file, {
        customMetadata: metadata,
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setIsUploading(true);
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log();
          }
        },
        (err) => {
          audit({
            user: email,
            activity: "Upload",
            date: Date.now(),
            description: `Uploaded file ${file.name}`,
            priority: "High",
            status: "Failed",
          });
          const error = translationFirebaseErrorsEN(err.code);
          toast(error, { type: "error" });
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            toast("Upload Successfully!", { type: "default" });
            addToFireStore(file.name);
            audit({
              user: email,
              activity: "Upload",
              date: Date.now(),
              description: `Uploaded file ${file.name}`,
              priority: "High",
              status: "Success",
            });
            setIsUploading(false);
          });
        }
      );
    },
    [progress]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });
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
          Upload
        </p>
      </div>
      <section style={{ transform: "translate(11em, 7em)" }}>
        <div
          {...getRootProps({ className: "dropzone" })}
          style={{
            color: "#1565c0",
            fontFamily: "Nunito",
            border: "2px #1565c0 dashed",
            borderRadius: "15px",
            background: "#dadada",
            width: "50vw",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 50,
            textAlign: "center",

            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        {isUploading && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "90%", mr: "1px" }}>
              <LinearProgress
                value={progress}
                variant="determinate"
                sx={{ height: 7 }}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "Roboto" }}
              >{`${Math.round(progress)}%`}</Typography>
            </Box>
          </Box>
        )}
      </section>
      <Toast />
    </>
  );
}
