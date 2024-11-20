import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeltonShow = (props) => {
    const skeltonMap = Array.from({length:props.length}).map((_,key) =>
         <Skeleton width={props.width } height={props.height} baseColor={props.color}  />)
  return (
    <div className={props.classes} >
        {
            skeltonMap
        }
      </div>
    
  )
}

export default SkeltonShow