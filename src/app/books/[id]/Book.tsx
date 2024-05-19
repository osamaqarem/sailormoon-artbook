"use client"

import Vibrant from "node-vibrant"
import React, { useMemo, useRef, useState } from "react"
import Lightbox, { ThumbnailsRef } from "yet-another-react-lightbox"
import { Thumbnails, Zoom } from "yet-another-react-lightbox/plugins"
import Counter from "yet-another-react-lightbox/plugins/counter"
import "yet-another-react-lightbox/plugins/counter.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import "yet-another-react-lightbox/styles.css"

export const Book = ({ fileSources }: { fileSources: Array<string> }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const slides = useMemo(
    () => fileSources.map((name) => ({ src: name })),
    [fileSources]
  )
  const colors = useImageColors(slides[activeIndex].src)

  const thumbnailsRef = useRef<ThumbnailsRef>(null)

  if (typeof window === "undefined") return null

  return (
    <Lightbox
      on={{
        entering: () => {
          thumbnailsRef.current?.hide?.()
        },
        view: ({ index }) => {
          setActiveIndex(index)
        },
        click: () => {
          ;(thumbnailsRef.current?.visible
            ? thumbnailsRef.current?.hide
            : thumbnailsRef.current?.show)?.()
        },
      }}
      portal={{ root: document?.getElementsByTagName("main")[0] }}
      slides={slides}
      carousel={{
        imageFit: "contain",
        imageProps: {
          style: {
            maxWidth: "100%",
            maxHeight: "100%",
            width: "100%",
          },
        },
      }}
      styles={{
        slide: { padding: 0 },
        container: {
          background: colors?.LightMuted,
          transition: "background-color 1s",
        },

        thumbnailsContainer: {
          position: "absolute",
          bottom: 0,
          height: 200,
          width: "100%",
          background: "none",
          backdropFilter: "blur(3px)",
        },
        thumbnail: {
          background: "none",
          border: "none",
          height: 200,
        },
      }}
      open={true}
      toolbar={{ buttons: [] }}
      plugins={[Counter, Thumbnails, Zoom]}
      thumbnails={{ ref: thumbnailsRef, vignette: false }}
      counter={{
        container: { style: { top: "unset", bottom: 0, zIndex: 1 } },
      }}
      zoom={{
        maxZoomPixelRatio: 5,
        doubleClickDelay: 0,
      }}
      render={{
        buttonPrev: () => null,
        buttonNext: () => null,
        buttonZoom: () => null,
      }}
    />
  )
}

const useImageColors = (source: string) => {
  const [colors, setColors] = React.useState<Record<
    | "Vibrant"
    | "Muted"
    | "DarkVibrant"
    | "DarkMuted"
    | "LightVibrant"
    | "LightMuted",
    string
  > | null>(null)

  React.useEffect(() => {
    Vibrant.from(source)
      .getPalette()
      .then((p) =>
        setColors(
          Object.fromEntries(
            Object.keys(p).map((key) => [key, p[key]?.hex ?? "#000"])
          ) as typeof colors
        )
      )
  }, [source])

  return colors
}
