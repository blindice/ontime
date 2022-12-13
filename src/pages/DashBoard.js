import React, { useEffect, useState } from 'react'
import { storage, db } from '../app/db'
import Skeleton from '@mui/material/Skeleton'
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'

import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import { DataGrid } from '@mui/x-data-grid'

export default function DashBoard() {
  const [type, setType] = useState(0)
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

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
        const { name } = item
        if (datas.some((data) => data.name === name)) {
          const { id } = datas.find((data) => data.name === name)
          const url = await getDownloadURL(item)
          const meta = await getMetadata(item)
          items.push({
            id: id,
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

  const getAllFiles = async () => {
    setLoading(true)
    const files = await getAll()
    setFiles(files)
    setType(0)
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      const datas = await getAll()
      setFiles(datas)
    })()
  }, [])

  const columns = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'name', headerName: 'File Name', width: 150 },
    { field: 'lastUpdated', headerName: 'last Updated', width: 150 },
    { field: 'size', headerName: 'Size', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: ({ row }) => (
        <button onClick={() => handleDelete(row.id)}>Delete</button>
      ),
    },
  ]
  const handleDelete = (id) => {
    const ref = doc(db, 'files', id)
    updateDoc(ref, { isDeleted: true })
      .then(() => {
        if (type === 1) {
          getAllImage()
        } else if (type === 2) {
          getAllVideos()
        } else if (type === 3) {
          getAllAudio()
        } else if (type === 4) {
          getAllDocuments()
        } else {
          getAllFiles()
        }
      })
      .catch((err) => console.log(err))
  }

  if (files)
    return (
      <div style={{ height: '60vh', width: '50%' }}>
        <button onClick={getAllFiles}>All</button>
        <button onClick={getAllAudio}>Audios</button>
        <button onClick={getAllDocuments}>Documents</button>
        <button onClick={getAllImage}>Images</button>
        <button onClick={getAllVideos}>Videos</button>
        <DataGrid rows={files} columns={columns} loading={loading} />
      </div>
    )

  return <Skeleton variant="rectangular" width={210} height={118} />
}
