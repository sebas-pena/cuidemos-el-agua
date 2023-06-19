import React from 'react'
import CardWrapper from './Wrapper'
import Image from 'next/image'

const Tip = ({ title, color, description, img }) => {
  return (
    <CardWrapper padding='p-7'>
      <div className="flex items-center gap-12 px-4">
        <Image width={55} height={55} src={`/svg/${img}`} alt={title} />
        <div>
          <h3 className="text-xl font-bold font-coolvetica" style={{ color }}>{title}</h3>
          <p className="text-gray-500 text-md font-semibold">{description}</p>
        </div>
      </div>
    </CardWrapper>
  )
}

export default Tip