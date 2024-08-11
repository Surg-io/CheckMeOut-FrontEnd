import React from 'react'

function Content({Header,Text}) {
  return (
    <div className='Content'>
        <div className="Header ContentHeader">{Header}</div>
        <div className="ContentText">{Text}</div>
    </div>
  )
}

export default Content