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
    backgroundColor: 'white',
    borderRadius: '5px',
  }),
  password: css({
    marginBottom: '1em',
    backgroundColor: 'white',
    borderRadius: '5px',
  }),
  label: css`
    font-family: 'Permanent Marker', cursive;
    color: whitesmoke;
    text-shadow: -1px 2px 2px rgba(39, 41, 35, 0.68);
  `,
}
