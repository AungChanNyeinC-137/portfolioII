import { WindowConrtols } from '#components'
import { blogPosts } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import { ChevronLeft, ChevronRight, Copy, PanelLeft, Plus, Search, Share, ShieldHalf } from 'lucide-react'
import React from 'react'

const Safari = () => {
  return (
    <>
    <div id="window-header">
      <WindowConrtols target='safari'/>
      <PanelLeft className='ml-10 icon'/>
      <div className="flex items-center gap-1 ml-5">
        <ChevronLeft className='icon'/>
        <ChevronRight className='icon'/>
      </div>
      <div className="flex-1 flex-center gap-3">
        <ShieldHalf className='icon'/>
        <div className="search">
          <Search className='icon'/>
          <input type="text" placeholder='Search or enter website name' className='flex-1' />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Share className='icon'/>
        <Plus className='icon'/>
        <Copy className='icon'/>
      </div>
    </div>
 <div className="blog">
  <h2 >
    My Developer Journey
  </h2>

  <div className="relative space-y-10">
    {/* vertical timeline line */}
    <div className="absolute left-6 top-0 h-full w-px bg-gray-200" />

    {blogPosts.map(({ id, image, title, date, description }) => (
      <div
        key={id}
        className="relative flex gap-6 items-start"
      >
        {/* timeline dot */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-red-500 ring-4 ring-white" />
        </div>

        {/* card */}
        <div className="flex gap-4 w-full rounded-xl bg-white/70 backdrop-blur-md shadow-md p-5 hover:shadow-lg transition">
          {/* logo */}
          <div className="size-14 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
            <img
              src={image}
              alt={title}
              className="size-10 object-contain"
            />
          </div>

          {/* content */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">
              {date}
            </span>

            <h3 className="text-base font-semibold text-gray-900">
              {title}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  )
}
const SafariWindow= WindowWrapper(Safari,'safari')

export default SafariWindow;