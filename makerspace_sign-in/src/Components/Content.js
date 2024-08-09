import React from 'react'

function Content({Header,Text}) {
  return (
    <div className='Content'>
        <div class="Header ContentHeader">{Header}</div>
        <div class="ContentText">{Text}</div>
    </div>
  )
}

export default Content