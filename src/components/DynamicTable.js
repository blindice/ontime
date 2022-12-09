import React from 'react'
import { DataGrid } from '@mui/x-data-grid'

export default function DynamicTable(columns, rows) {
  return (
    <div style={{ height: 400, width: '50vw' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}
