import WindowWrapper from '#hoc/WindowWrapper'
import React from 'react'

const Photos = () => {
  return (
    <div>Photos</div>
  )
}
const PhotosWindow = WindowWrapper(Photos,'photos');
export default PhotosWindow;