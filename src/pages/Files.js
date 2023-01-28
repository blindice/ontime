import React, { useState } from "react";
import { storage, db } from "../app/db";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Image, Card, Tooltip, Result } from "antd";
import { toast } from "react-toastify";
import { translationFirebaseErrorsEN } from "react-translation-firebase-errors";
import { useSelector } from "react-redux";

import Toast from "../components/Toast";
import useEmail from "../hooks/useEmail";
import { audit } from "../helper/worker";
import "./Files.css";
import { async } from "@firebase/util";

export default function Files() {
  const { token } = useSelector((state) => state.account);
  const { email } = useEmail(token);
  const [type, setType] = useState(0);
  const [files, setFiles] = useState([]);

  const downloadFile = async (url, name) => {
    try {
      window.open(url, "_blank");
      await audit({
        user: email,
        activity: "Download",
        description: `Downloaded ${name}`,
        priority: "Medium",
        status: "Success",
      });
    } catch (err) {
      await audit({
        user: email,
        activity: "Download",
        description: `Downloaded ${name}`,
        priority: "Medium",
        status: "Failed",
      });
    }
  };

  const getAll = async () => {
    try {
      const list = query(
        collection(db, "files"),
        where("isDeleted", "==", false)
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
          console.log(item);
          const { name } = item;
          if (datas.some((data) => data.name === name)) {
            const url = await getDownloadURL(item);
            const meta = await getMetadata(item);
            items.push({
              id: meta.generation,
              name: name,
              url: url,
              size: meta.size,
              type: meta.contentType,
              lastUpdated: meta.updated,
            });
          }
        })
      );
      return items;
    } catch (err) {
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };
  const getAllImage = async () => {
    try {
      const files = await getAll();
      const filtered = files.filter((file) => file["type"].includes("image"));
      setFiles(filtered);
      setType(1);

      await audit({
        user: email,
        activity: "Viewing",
        description: "Viewing Images on Files",
        priority: "Low",
        status: "Success",
      });
    } catch (err) {
      await audit({
        user: email,
        activity: "Viewing",
        description: "Viewing Images on Files",
        priority: "Low",
        status: "Failed",
      });
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };

  const getAllVideos = async () => {
    try {
      const files = await getAll();
      const filtered = files.filter((file) => file["type"].includes("video"));
      setFiles(filtered);
      setType(2);

      await audit({
        user: email,
        activity: "Viewing",
        description: "Viewing Videos on Files",
        priority: "Low",
        status: "Success",
      });
    } catch (err) {
      await audit({
        user: email,
        activity: "Viewing",
        description: "Viewing Videos on Files",
        priority: "Low",
        status: "Failed",
      });
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };

  const getAllAudio = async () => {
    try {
      const files = await getAll();
      const filtered = files.filter((file) => file["type"].includes("audio"));
      setFiles(filtered);
      setType(3);

      await audit({
        user: email,
        activity: "Viewing",
        description: "Viewing Images on Files",
        priority: "Low",
        status: "Success",
      });
    } catch (err) {
      await audit({
        user: email,
        activity: "Viewing",
        description: "Viewing Images on Files",
        priority: "Low",
        status: "Failed",
      });
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };

  const getAllDocuments = async () => {
    try {
      const files = await getAll();
      const filtered = files.filter((file) =>
        file["type"].includes("application")
      );
      setFiles(filtered);
      setType(4);

      await audit({
        user: email,
        activity: "Viewing",
        description: "Viewing Documents on Files",
        priority: "Low",
        status: "Success",
      });
    } catch (err) {
      await audit({
        user: email,
        activity: "Viewing",
        description: "Viewing Documents on Files",
        priority: "Low",
        status: "Failed",
      });
      const error = translationFirebaseErrorsEN(err.code);
      toast(error, { type: "error" });
    }
  };

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
          Files
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
            <Button onClick={getAllAudio}>Audios</Button>
            <Button onClick={getAllDocuments}>Documents</Button>
            <Button onClick={getAllImage}>Images</Button>
            <Button onClick={getAllVideos}>Videos</Button>
          </ButtonGroup>
        </div>
        <div style={{ transform: "translate(5em, 5em)" }}>
          {files.length === 0 ? (
            <>
              <Result title="No File Found!" style={{ marginTop: "15vh" }} />
            </>
          ) : type === 1 ? (
            <>
              <h4 className="header-text">Images</h4>
              <div className="image-container">
                <Image.PreviewGroup>
                  {files.map((f) => {
                    return (
                      <Tooltip placement="bottom" title={f.name} key={f.url}>
                        <Card
                          style={{
                            width: 200,
                            height: 170,
                            textAlign: "center",
                          }}
                          hoverable
                          cover={
                            <Image
                              alt={f.name}
                              style={{
                                height: "auto",
                                maxHeight: 100,
                                width: "auto",
                                maxWidth: 100,
                              }}
                              src={f.url}
                              onClick={async () => {
                                await audit({
                                  user: email,
                                  activity: "Viewing",
                                  description: `Viewed photo ${f.name}`,
                                  priority: "Low",
                                  status: "Success",
                                });
                              }}
                            />
                          }
                        >
                          <Card.Meta title={f.name} />
                          <Button
                            variant="contained"
                            type="primary"
                            size="small"
                            style={{
                              marginTop: 20,
                              width: "80%",
                              position: "absolute",
                              left: "20px",
                              bottom: "10px",
                            }}
                            onClick={async () => {
                              console.log(f.name);
                              downloadFile(f.url, f.name);
                            }}
                          >
                            Download
                          </Button>
                        </Card>
                      </Tooltip>
                    );
                  })}
                </Image.PreviewGroup>
              </div>
            </>
          ) : type === 2 ? (
            <>
              <h4
                className="header-text"
                style={{
                  fontFamily: "Roboto",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1565c0",
                }}
              >
                Videos
              </h4>
              <div className="image-container">
                <Image.PreviewGroup>
                  {files.map((f) => {
                    return (
                      <Tooltip placement="bottom" title={f.name} key={f.url}>
                        <Card
                          style={{
                            width: 200,
                            height: 200,
                            textAlign: "center",
                          }}
                          hoverable
                          cover={
                            <video
                              style={{
                                height: "auto",
                                maxHeight: 100,
                                width: "auto",
                                maxWidth: 200,
                                marginLeft: "5%",
                              }}
                              controls
                              controlsList="nodownload"
                              onPlay={async () => {
                                await audit({
                                  user: email,
                                  activity: "Watching",
                                  description: `Watched to video ${f.name}`,
                                  priority: "Low",
                                  status: "Success",
                                });
                              }}
                            >
                              <source src={f.url} />
                            </video>
                          }
                        >
                          <Card.Meta title={f.name} />
                          <Button
                            variant="contained"
                            type="primary"
                            size="small"
                            style={{
                              marginTop: 20,
                              width: "80%",
                              position: "absolute",
                              left: "20px",
                              bottom: "10px",
                            }}
                            onClick={() => downloadFile(f.url, f.name)}
                          >
                            Download
                          </Button>
                        </Card>
                      </Tooltip>
                    );
                  })}
                </Image.PreviewGroup>
              </div>
            </>
          ) : type === 3 ? (
            <>
              <h4
                className="header-text"
                style={{
                  fontFamily: "Roboto",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1565c0",
                }}
              >
                Audios
              </h4>
              <div className="image-container">
                <Image.PreviewGroup>
                  {files.map((f) => {
                    return (
                      <Tooltip placement="bottom" title={f.name} key={f.url}>
                        <Card
                          style={{
                            width: 200,
                            height: 200,
                            textAlign: "center",
                          }}
                          hoverable
                          cover={
                            <video
                              style={{
                                height: "auto",
                                maxHeight: 100,
                                width: "auto",
                                maxWidth: 200,
                              }}
                              controls
                              controlsList="nodownload"
                              onPlay={async () => {
                                await audit({
                                  user: email,
                                  activity: "Listening",
                                  description: `Listened to audio ${f.name}`,
                                  priority: "Low",
                                  status: "Success",
                                });
                              }}
                            >
                              <source src={f.url} />
                            </video>
                          }
                        >
                          <Card.Meta title={f.name} />
                          <Button
                            variant="contained"
                            type="primary"
                            size="small"
                            style={{
                              marginTop: 20,
                              width: "80%",
                              position: "absolute",
                              left: "20px",
                              bottom: "10px",
                            }}
                            onClick={() => downloadFile(f.url, f.name)}
                          >
                            Download
                          </Button>
                        </Card>
                      </Tooltip>
                    );
                  })}
                </Image.PreviewGroup>
              </div>
            </>
          ) : type === 4 ? (
            <>
              <h4
                className="header-text"
                style={{
                  fontFamily: "Roboto",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1565c0",
                }}
              >
                Documents
              </h4>
              <div className="image-container">
                {files.map((f) => {
                  return (
                    <Tooltip placement="bottom" title={f.name} key={f.url}>
                      <Card
                        style={{
                          width: 200,
                          height: 170,
                          textAlign: "center",
                        }}
                        hoverable
                        cover={
                          <img
                            alt={f.name}
                            style={{
                              height: "auto",
                              maxHeight: 80,
                              width: "auto",
                              maxWidth: 80,
                              marginLeft: "34%",
                            }}
                            src="/images/file-icon.png"
                          />
                        }
                      >
                        <Card.Meta title={f.name} />
                        <Button
                          variant="contained"
                          type="primary"
                          size="small"
                          style={{
                            marginTop: 20,
                            width: "80%",
                            position: "absolute",
                            left: "20px",
                            bottom: "10px",
                          }}
                          onClick={() => downloadFile(f.url, f.name)}
                        >
                          Download
                        </Button>
                      </Card>
                    </Tooltip>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h3>Select File Type</h3>
            </>
          )}
        </div>
      </div>
      <Toast />
    </>
  );
}
