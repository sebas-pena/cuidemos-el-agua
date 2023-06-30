'use client'
import React, { useEffect } from 'react'

const OSEProfile = () => {
  useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
  }, [])

  if (typeof window === 'undefined') return null
  const screenWidth = window.innerWidth
  let embedWidth = 550

  if (screenWidth < 580) {
    embedWidth = screenWidth - 30
    if (embedWidth < 220) {
      embedWidth = 220
    }
  }
  return (
    <a
      className="twitter-timeline"
      data-width={embedWidth}
      data-dnt="true"
      data-theme="light"
      data-tweet-limit="10"
      data-chrome="noheader"
      href="https://twitter.com/OSE_Uruguay?ref_src=twsrc%5Etfw">
    </a>
  )
}

export default OSEProfile