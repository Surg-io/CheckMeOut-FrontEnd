import React from 'react'

function InfoBox({Header,Text}) {
  return (
    <div className='InfoBox' >
        <div className="InfoBoxHeader Header ">{Header}</div>
        <div className="InfoBoxContent">{Text}</div>
    </div>
  )
}

export default InfoBox