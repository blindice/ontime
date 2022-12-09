import React, { useEffect, useState } from 'react'
import { storage } from '../app/db'
import Skeleton from '@mui/material/Skeleton'
import {
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  deleteObject,
} from 'firebase/storage'
import { DataGrid } from '@mui/x-data-grid'

import DynamicTable from '../components/DynamicTable'

export default function DashBoard() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const getAll = async () => {
    setLoading(true)
    const listRef = ref(storage)
    const resList = await listAll(listRef)
    let items = []

    await Promise.all(
      resList.items.map(async (item) => {
        console.log(item)
        const { name } = item
        const url = await getDownloadURL(item)
        const meta = await getMetadata(item)
        console.log(meta)
        items.push({
          id: meta.generation,
          name: name,
          url: url,
          size: meta.size,
          type: meta.contentType,
          lastUpdated: meta.updated,
        })
      }),
    )
    setLoading(false)
    return items
  }

  const getAllImage = async () => {
    setLoading(true)
    const files = await getAll()
    const filtered = files.filter((file) => file['type'].includes('image/png'))
    setFiles(filtered)
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      const datas = await getAll()
      setFiles(datas)
    })()
  }, [])

  const columns = [
    { field: 'name', headerName: 'File Name', width: 150 },
    { field: 'lastUpdated', headerName: 'last Updated', width: 150 },
    { field: 'size', headerName: 'Size', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: ({ row }) => (
        <button onClick={() => handleDelete(row.name)}>Delete</button>
      ),
    },
  ]
  const handleDelete = (name) => {
    const itemRef = ref(storage, name)

    deleteObject(itemRef)
      .then(() => {
        console.log('Deleted Successfully')
        return getAll()
      })
      .then((files) => setFiles(files))
      .catch((err) => console.log(err))
  }

  if (files)
    return (
      <div style={{ height: '60vh', width: '50%' }}>
        <button>All</button>
        <button>Audios</button>
        <button>Documents</button>
        <button onClick={getAllImage}>Images</button>
        <button>Videos</button>
        <DataGrid rows={files} columns={columns} loading={loading} />
      </div>
    )

  return <Skeleton variant="rectangular" width={210} height={118} />
}
