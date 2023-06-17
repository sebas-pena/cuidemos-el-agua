import React from 'react'
import CardWrapper from './Wrapper'
import Image from 'next/image'

const Tip = ({ title, color, description, img }) => {
  return (
    <CardWrapper>
      <div className="flex items-center gap-2">
        <Image width={50} height={50} src={`/img/${img}`} alt={title} />
        <div>
          <h3 className="text-xl font-bold" style={{ color }}>{title}</h3>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
    </CardWrapper>
  )
}

export default Tip