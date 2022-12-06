import { css } from '@emotion/react'

export const login = {
  form: css({
    display: 'grid',
    width: '20vw',
    position: 'absolute',
    left: '40vw',
    top: '25vh',
  }),
  username: css({
    marginBottom: '.5em',
  }),
  password: css({
    marginBottom: '1em',
  }),
  label: css`
    font-family: 'Permanent Marker', cursive;
  `,
}
