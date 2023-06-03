import React from 'react'

const styles = {
  green: 'bg-green-600 hover:bg-green-700 active:bg-green-800',
  red: 'bg-red-600 hover:bg-red-700 active:bg-red-800',
  neutral: 'bg-neutral-600 hover:bg-neutral-700 active:bg-neutral-800',
  'light-neutral': 'bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600',
}

const MapControlButton = ({ style = 'green', children, ...props }) => {
  return (
    <button
      className={`flex gap-2 w-full justify-center items-center rounded-lg  py-2 px-4 shadow-md  ${styles[style]}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default MapControlButton