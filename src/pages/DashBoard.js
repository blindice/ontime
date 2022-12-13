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
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import RestoreIcon from '@mui/icons-material/Restore'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import ButtonGroup from '@mui/material/ButtonGroup'

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
    { field: 'id', headerName: 'Id', width: 225 },
    { field: 'name', headerName: 'File Name', width: 300 },
    {
      field: 'lastUpdated',
      headerName: 'Last Updated',
      width: 150,
      valueGetter: (params) => {
        let newDate = new Date(params.row.lastUpdated)
        return (
          newDate.getMonth() +
          1 +
          '/' +
          newDate.getDay() +
          '/' +
          newDate.getFullYear() +
          ' ' +
          newDate.getHours() +
          ':' +
          newDate.getMinutes()
        )
      },
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 125,
      valueGetter: (params) => {
        const size = params.row.size
        if (!+size) return '0 Bytes'

        const k = 1024
        const dm = 2 < 0 ? 0 : 2
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(size) / Math.log(k))

        return `${parseFloat((size / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
      },
    },
    {
      field: 'remove',
      headerName: 'Remove',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleRemove(row.id)} size="small">
          <RemoveCircleIcon sx={{ color: '#c92216' }} />
        </IconButton>
      ),
    },
  ]

  const handleRemove = (id) => {
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
            Dashboard
          </p>
        </div>
        <div
          style={{
            height: '60vh',
            width: '70vw',
          }}
        >
          <div style={{ transform: 'translate(5em, 5em)' }}>
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
            pageSize={5}
            rows={files}
            columns={columns}
            loading={loading}
            size="small"
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              fontFamily: 'Work Sans',
              transform: 'translate(5em, 7em)',
            }}
          />
        </div>
      </>
    )

  return <Skeleton variant="rectangular" width={210} height={118} />
}
