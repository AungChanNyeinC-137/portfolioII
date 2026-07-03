import React, { useEffect } from "react";
import { clsx } from "clsx";
import { Search } from "lucide-react";

import { WindowConrtols } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";

import { PHOTOS_LOCATION } from "#constants";

import useLocationStore from "#store/location";
import useWindowStore from "#store/window";

const Photos = () => {
  const { openWindow } = useWindowStore();
  const { photosActiveLocation, setPhotosActiveLocation } = useLocationStore();
  useEffect(() => {
    setPhotosActiveLocation(PHOTOS_LOCATION.children[0]);
  }, []);
  const renderList = (title, items) => (
    <div>
      <h3>{title}</h3>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setPhotosActiveLocation(item)}
            className={clsx(
              photosActiveLocation?.id === item.id
                ? "active"
                : "not-active"
            )}
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-4"
            />

            <p className="text-sm font-medium truncate">
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );

  const openItem = (item) => {
    if (item.kind === "folder")
      return setPhotosActiveLocation(item);

    if (item.fileType === "pdf")
      return openWindow("certificate", item);

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  return (
    <>
      <div id="window-header">
        <WindowConrtols target="photos" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <ul>
            {renderList(
              "Photos",
              PHOTOS_LOCATION.children
            )}
          </ul>
        </div>

        <ul className="gallery">
          {photosActiveLocation?.children?.map((item) => (
            <li key={item.id} onClick={() => openItem(item)}>
              {item.fileType === "pdf" ? (
                <div className="flex flex-col items-center justify-center h-40 gap-2">
                  <img src={item.icon} alt={item.name} className="w-16 h-16" />
                  <p className="text-sm text-center px-2 text-gray-700">
                    {item.name}
                  </p>
                </div>
              ) : (
                <>
                  <img src={item.imageUrl} alt={item.name} />
                </>


              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(
  Photos,
  "photos"
);

export default PhotosWindow;