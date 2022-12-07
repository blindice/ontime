import React from 'react'
import Header from './Header'

const withHeaderAndFooter = (OriginalComponent) => {
  function UpdatedComponent(props) {
    return (
      <>
        <header>
          <Header />
        </header>
        <OriginalComponent />
        <footer></footer>
      </>
    )
  }
  return UpdatedComponent
}

export default withHeaderAndFooter
