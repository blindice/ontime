import React, { useState } from 'react'
import { storage, db } from '../app/db'
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { Button } from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Image, Card, Tooltip, Result } from 'antd'
import { toast } from 'react-toastify'
import { translationFirebaseErrorsEN } from 'react-translation-firebase-errors'

import Toast from '../components/Toast'
import './Files.css'

export default function Files() {
  const [type, setType] = useState(0)
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const downloadFile = async (url) => {
    window.open(url, '_blank')
  }

  const getAll = async () => {
    try {
      setLoading(true)
      const list = query(
        collection(db, 'files'),
        where('isDeleted', '==', false),
      )
      const querySnapshot = await getDocs(list)
      let datas = []
      querySnapshot.forEach((item) =>
        datas.push({ id: item.id, name: item.data().filename }),
      )

      const listRef = ref(storage)
      const resList = await listAll(listRef)
      let items = []

      await Promise.all(
        resList.items.map(async (item) => {
          console.log(item)
          const { name } = item
          if (datas.some((data) => data.name === name)) {
            const url = await getDownloadURL(item)
            const meta = await getMetadata(item)
            items.push({
              id: meta.generation,
              name: name,
              url: url,
              size: meta.size,
              type: meta.contentType,
              lastUpdated: meta.updated,
            })
          }
        }),
      )
      setLoading(false)
      return items
    } catch (err) {
      const error = translationFirebaseErrorsEN(err.code)
      toast(error, { type: 'error' })
    }
  }
  const getAllImage = async () => {
    try {
      setLoading(true)
      const files = await getAll()
      const filtered = files.filter((file) => file['type'].includes('image'))
      setFiles(filtered)
      setType(1)
      setLoading(false)
    } catch (err) {
      const error = translationFirebaseErrorsEN(err.code)
      toast(error, { type: 'error' })
    }
  }

  const getAllVideos = async () => {
    try {
      setLoading(true)
      const files = await getAll()
      const filtered = files.filter((file) => file['type'].includes('video'))
      setFiles(filtered)
      setType(2)
      setLoading(false)
    } catch (err) {
      const error = translationFirebaseErrorsEN(err.code)
      toast(error, { type: 'error' })
    }
  }

  const getAllAudio = async () => {
    try {
      setLoading(true)
      const files = await getAll()
      const filtered = files.filter((file) => file['type'].includes('audio'))
      setFiles(filtered)
      setType(3)
      setLoading(false)
    } catch (err) {
      const error = translationFirebaseErrorsEN(err.code)
      toast(error, { type: 'error' })
    }
  }

  const getAllDocuments = async () => {
    try {
      setLoading(true)
      const files = await getAll()
      const filtered = files.filter((file) =>
        file['type'].includes('application'),
      )
      setFiles(filtered)
      setType(4)
      setLoading(false)
    } catch (err) {
      const error = translationFirebaseErrorsEN(err.code)
      toast(error, { type: 'error' })
    }
  }

  return (
    <>
      <div style={{ position: 'absolute' }}>
        <p
          style={{
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontWeight: 700,
            color: '#1565c0',
          }}
        >
          Files
        </p>
      </div>
      <div
        style={{
          height: '60vh',
          width: '70vw',
        }}
      >
        <div style={{ transform: 'translate(5em, 3em)' }}>
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
        <div style={{ transform: 'translate(5em, 5em)' }}>
          {files.length === 0 ? (
            <>
              <Result title="No File Found!" style={{ marginTop: '15vh' }} />
            </>
          ) : type === 1 ? (
            <>
              <h4 className="header-text">Images</h4>
              <div className="image-container">
                <Image.PreviewGroup>
                  {files.map((f) => {
                    return (
                      <Tooltip placement="bottom" title={f.name}>
                        <Card
                          style={{
                            width: 200,
                            height: 170,
                            textAlign: 'center',
                          }}
                          hoverable
                          cover={
                            <Image
                              alt={f.name}
                              style={{
                                height: 'auto',
                                maxHeight: 100,
                                width: 'auto',
                                maxWidth: 100,
                              }}
                              src={f.url}
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
                              width: '80%',
                              position: 'absolute',
                              left: '20px',
                              bottom: '10px',
                            }}
                            onClick={() => downloadFile(f.url)}
                          >
                            Download
                          </Button>
                        </Card>
                      </Tooltip>
                    )
                  })}
                </Image.PreviewGroup>
              </div>
            </>
          ) : type === 2 ? (
            <>
              <h4
                className="header-text"
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#1565c0',
                }}
              >
                Videos
              </h4>
              <div className="image-container">
                <Image.PreviewGroup>
                  {files.map((f) => {
                    return (
                      <Tooltip placement="bottom" title={f.name}>
                        <Card
                          style={{
                            width: 200,
                            height: 200,
                            textAlign: 'center',
                          }}
                          hoverable
                          cover={
                            <video
                              style={{
                                height: 'auto',
                                maxHeight: 100,
                                width: 'auto',
                                maxWidth: 200,
                                marginLeft: '5%',
                              }}
                              controls
                            >
                              <source src={f.url} />
                            </video>
                          }
                        >
                          <Card.Meta title={f.name} />
                        </Card>
                      </Tooltip>
                    )
                  })}
                </Image.PreviewGroup>
              </div>
            </>
          ) : type === 3 ? (
            <>
              <h4
                className="header-text"
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#1565c0',
                }}
              >
                Audios
              </h4>
              <div className="image-container">
                <Image.PreviewGroup>
                  {files.map((f) => {
                    return (
                      <Tooltip placement="bottom" title={f.name}>
                        <Card
                          style={{
                            width: 200,
                            height: 200,
                            textAlign: 'center',
                          }}
                          hoverable
                          cover={
                            <video
                              style={{
                                height: 'auto',
                                maxHeight: 100,
                                width: 'auto',
                                maxWidth: 200,
                              }}
                              controls
                            >
                              <source src={f.url} />
                            </video>
                          }
                        >
                          <Card.Meta title={f.name} />
                        </Card>
                      </Tooltip>
                    )
                  })}
                </Image.PreviewGroup>
              </div>
            </>
          ) : type === 4 ? (
            <>
              <h4
                className="header-text"
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#1565c0',
                }}
              >
                Documents
              </h4>
              <div className="image-container">
                {files.map((f) => {
                  return (
                    <Tooltip placement="bottom" title={f.name}>
                      <Card
                        style={{
                          width: 200,
                          height: 170,
                          textAlign: 'center',
                        }}
                        hoverable
                        cover={
                          <img
                            alt={f.name}
                            style={{
                              height: 'auto',
                              maxHeight: 80,
                              width: 'auto',
                              maxWidth: 80,
                              marginLeft: '30%',
                            }}
                            src={
                              f.name.includes('.pdf')
                                ? '/images/pdf.png'
                                : f.name.includes('.doc') ||
                                  f.name.includes('.docx')
                                ? '/images/doc.png'
                                : f.name.includes('.htm') ||
                                  f.name.includes('.html')
                                ? '/images/html.png'
                                : f.name.includes('.xls') ||
                                  f.name.includes('.xlsx')
                                ? '/images/xls.png'
                                : f.name.includes('.ppt') ||
                                  f.name.includes('.pptx')
                                ? '/images/ppt.png'
                                : f.name.includes('.txt')
                                ? '/images/txt.png'
                                : f.name.includes('.csv')
                                ? '/images/csv.png'
                                : ''
                            }
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
                            width: '80%',
                            position: 'absolute',
                            left: '20px',
                            bottom: '10px',
                          }}
                          onClick={() => downloadFile(f.url)}
                        >
                          Download
                        </Button>
                      </Card>
                    </Tooltip>
                  )
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
  )
}
