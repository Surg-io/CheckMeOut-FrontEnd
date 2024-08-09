import React from 'react'

function InfoBox({Header,Text}) {
  return (
    <div className='InfoBox' >
        <div class="InfoBoxHeader Header ">{Header}</div>
        <div class="InfoBoxContent">{Text}</div>
    </div>
  )
}

export default InfoBox