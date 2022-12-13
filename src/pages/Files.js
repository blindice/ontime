import React, { useState } from 'react'
import { storage, db } from '../app/db'
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default function Files() {
  const [type, setType] = useState(0)
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const downloadFile = async (url) => {
    console.log(url)
    window.open(url, '_blank')
  }

  const getAll = async () => {
    setLoading(true)
    const list = query(collection(db, 'files'), where('isDeleted', '==', false))
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
  }
  const getAllImage = async () => {
    setLoading(true)
    const files = await getAll()
    const filtered = files.filter((file) => file['type'].includes('image'))
    setFiles(filtered)
    setType(1)
    setLoading(false)
  }

  const getAllVideos = async () => {
    setLoading(true)
    const files = await getAll()
    const filtered = files.filter((file) => file['type'].includes('video'))
    setFiles(filtered)
    setType(2)
    setLoading(false)
  }

  const getAllAudio = async () => {
    setLoading(true)
    const files = await getAll()
    const filtered = files.filter((file) => file['type'].includes('audio'))
    setFiles(filtered)
    setType(3)
    setLoading(false)
  }

  const getAllDocuments = async () => {
    setLoading(true)
    const files = await getAll()
    const filtered = files.filter((file) =>
      file['type'].includes('application'),
    )
    setFiles(filtered)
    setType(4)
    setLoading(false)
  }
  return (
    <>
      <button onClick={getAllAudio}>Audio</button>
      <button onClick={getAllDocuments}>Document</button>
      <button onClick={getAllImage}>Image</button>
      <button onClick={getAllVideos}>Video</button>
      <div>
        {type === 1 ? (
          files.map((file) => (
            <>
              <img alt="defaultImage" src={file.url}></img>
              <div>{file.name}</div>
              <button onClick={() => downloadFile(file.url)}>Donwload</button>
            </>
          ))
        ) : type === 2 ? (
          files.map((file) => (
            <>
              <video controls>
                <source src={file.url} />
              </video>
              <div>{file.name}</div>
            </>
          ))
        ) : type === 3 ? (
          files.map((file) => (
            <>
              <video controls>
                <source src={file.url} />
              </video>
              <div>{file.name}</div>
            </>
          ))
        ) : type === 4 ? (
          files.map((file) => (
            <>
              <img
                alt="filetype"
                src={
                  file.name.includes('.pdf')
                    ? '/images/pdf.png'
                    : file.name.includes('.doc') || file.name.includes('.docx')
                    ? '/images/doc.png'
                    : file.name.includes('.htm') || file.name.includes('.html')
                    ? '/images/html.png'
                    : file.name.includes('.xls') || file.name.includes('.xlsx')
                    ? '/images/xls.png'
                    : file.name.includes('.ppt') || file.name.includes('.pptx')
                    ? '/images/ppt.png'
                    : file.name.includes('.txt')
                    ? '/images/txt.png'
                    : file.name.includes('.csv')
                    ? '/images/csv.png'
                    : ''
                }
              ></img>
              <div>{file.name}</div>
              <button onClick={() => downloadFile(file.url)}>Donwload</button>
            </>
          ))
        ) : (
          <>
            <h3>Select File Type</h3>
          </>
        )}
      </div>
    </>
  )
}
