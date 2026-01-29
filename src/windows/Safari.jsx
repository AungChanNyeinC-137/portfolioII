import { WindowConrtols } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import React from 'react'

const Safari = () => {
  return (
    <>
    <div id="window-header">
      <WindowConrtols target='safari'/>
    </div>
    </>
  )
}
const SafariWindow= WindowWrapper(Safari,'safari')

export default SafariWindow;