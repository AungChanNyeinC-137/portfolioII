import { WindowConrtols } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import React from 'react'

const Photos = () => {
  return <>
    <div id="window-header">
      <WindowConrtols target='photos'/>
      
    </div>
    <div>
      <img src="/public/images/couple.jpg" alt="couple" />
    </div>
    </>
}
const PhotosWindow = WindowWrapper(Photos,'photos')
export default PhotosWindow