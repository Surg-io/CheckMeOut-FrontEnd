import React from 'react'

function Content({Header,Text}) {
  return (
    <>
        <div class="ContentHeader">{Header}</div>
        <div class="ContentText">{Text}</div>
    </>
  )
}

export default Content