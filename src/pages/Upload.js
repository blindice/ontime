import React, { useCallback, useState } from 'react'
import { storage, db } from '../app/db'
import { useDropzone } from 'react-dropzone'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { toast } from 'react-toastify'
import { translationFirebaseErrorsEN } from 'react-translation-firebase-errors'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'

import Toast from '../components/Toast'

export default function Upload() {
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const addToFireStore = async (fileName) => {
    try {
      console.log(fileName)
      const docRef = await addDoc(collection(db, 'files'), {
        filename: fileName,
        isDeleted: false,
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (err) {
      console.error('Error adding document: ', err)
      const error = translationFirebaseErrorsEN(err.code)
      toast(error, { type: 'error' })
    }
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      const fileRef = ref(storage, file.name)

      const metadata = {
        isDeleted: false,
      }
      const uploadTask = uploadBytesResumable(fileRef, file, {
        customMetadata: metadata,
      })

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setIsUploading(true)
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              console.log()
          }
        },
        (err) => {
          const error = translationFirebaseErrorsEN(err.code)
          toast(error, { type: 'error' })
          setIsUploading(false)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            toast('Upload Successfully!', { type: 'success' })
            addToFireStore(file.name)
            setIsUploading(false)
          })
        },
      )
    },
    [progress],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })
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
          Upload
        </p>
      </div>
      <section className="container">
        <div
          {...getRootProps({ className: 'dropzone' })}
          style={{
            border: '2px #1565c0 dashed',
            borderRadius: '15px',
            background: '#dadada',
            width: '50vw',
            height: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 50,
            textAlign: 'center',
            transform: 'translate(9em, 5em)',
            cursor: 'pointer',
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
          <Box sx={{ width: '100%', border: '1px black solid' }}>
            <LinearProgress value={progress} variant="determinate" />
          </Box>
        )}

        {/* <LinearProgress
          value={progress}
          variant="determinate"
          sx={{
            width: '30vw',
            positio
          }}
        /> */}

        <Toast />
      </section>
    </>
  )
}
