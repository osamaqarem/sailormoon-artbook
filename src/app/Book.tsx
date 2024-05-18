"use client"

import Vibrant from "node-vibrant"
import React, { useMemo, useRef, useState } from "react"
import Lightbox, { ThumbnailsRef } from "yet-another-react-lightbox"
import Counter from "yet-another-react-lightbox/plugins/counter"
import "yet-another-react-lightbox/plugins/counter.css"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import { Thumbnails } from "yet-another-react-lightbox/plugins"

export const Book = ({ fileNames }: { fileNames: Array<string> }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const slides = useMemo(
    () => fileNames.map((name) => ({ src: "/sailor-moon/" + name })),
    [fileNames]
  )
  const colors = useImageColors(slides[activeIndex].src)

  const thumbnailsRef = useRef<ThumbnailsRef>(null)

  return (
    <Lightbox
      on={{
        view: ({ index }) => {
          setActiveIndex(index)
        },
        click: () => {
          ;(thumbnailsRef.current?.visible
            ? thumbnailsRef.current?.hide
            : thumbnailsRef.current?.show)?.()
        },
      }}
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
          background: `radial-gradient(${colors?.LightVibrant}, ${colors?.Vibrant})`,
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
      plugins={[Counter, Thumbnails]}
      thumbnails={{ ref: thumbnailsRef }}
      counter={{ container: { style: { top: "unset", bottom: 0 } } }}
      render={{
        buttonPrev: () => null,
        buttonNext: () => null,
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
