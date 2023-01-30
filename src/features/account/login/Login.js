/** @jsxImportSource @emotion/react */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { loginAsync } from '../accountSlice'
import { login as style } from './style'
import useEmail from '../../../hooks/useEmail'
import { audit } from '../../../helper/worker'
import Toast from '../../../components/Toast'

export default function Login() {
  const navigate = useNavigate()
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
      await dispatch(loginAsync(data)).unwrap()
      await audit({
        user: data.username,
        activity: 'Login',
        date: Date.now(),
        description: 'Login',
        priority: 'High',
        status: 'Success',
      })
      navigate('/dashboard')
    } catch (err) {
      await audit({
        user: data.username,
        activity: 'Login',
        date: Date.now(),
        description: 'Login',
        priority: 'HIgh',
        status: 'Failed',
      })
      toast(err, { type: 'error' })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} css={style.form}>
        <h1 css={style.label}>
          <img
            alt="white-logo"
            src="/images/upbox_white.png"
            style={{
              height: '1.5em',
            }}
          />
          UpBox
        </h1>
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
