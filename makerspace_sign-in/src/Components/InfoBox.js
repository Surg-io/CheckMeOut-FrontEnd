import React from 'react'

function InfoBox({Header, Message}) {
  return (
    <>
      
        <div class="InfoBoxHeader">{Header}</div>
        <div class="InfoBoxText">{Message}</div>
    </>
  )
}

export default InfoBox