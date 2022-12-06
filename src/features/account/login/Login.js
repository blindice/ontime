/** @jsxImportSource @emotion/react */
import React from 'react'
import { TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { loginAsync } from '../accountSlice'
import { login as style } from './style'
import Toast from '../../../components/Toast'

export default function Login() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.account.isLoading)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleLogin = async (data) => {
    try {
      const res = await dispatch(loginAsync(data)).unwrap()
      console.log(res)
    } catch (err) {
      toast('Failed to Log-in!', { type: 'error' })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} css={style.form}>
        <h1 css={style.label}>On-Time</h1>
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              css={style.username}
              {...field}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              size="small"
              error={errors.username ? true : false}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              css={style.password}
              {...field}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
              type="password"
              error={errors.password ? true : false}
            />
          )}
        />
        <LoadingButton variant="contained" type="submit" loading={isLoading}>
          Login
        </LoadingButton>
      </form>
      <Toast />
    </div>
  )
}
