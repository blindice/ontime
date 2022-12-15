import { css, keyframes } from '@emotion/react'

const fade = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
  `

export const login = {
  form: css`
    display: grid;
    width: 20vw;
    position: absolute;
    left: 40vw;
    top: 25vh;
    animation: 2s ease 0.2s both ${fade};
  `,
  username: css({
    marginBottom: '.5em',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow:
      '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
  }),
  password: css({
    marginBottom: '1em',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow:
      '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
  }),
  label: css`
    font-family: 'Permanent Marker', cursive;
    color: whitesmoke;
    text-shadow: -1px 2px 2px rgba(39, 41, 35, 0.68);
  `,
}
