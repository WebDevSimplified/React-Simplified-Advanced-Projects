import { useCallback, useEffect, useRef, useState } from "react"
import { parseLinkHeader } from "./parseLinkHeader"
import "./styles.css"

const LIMIT = 50

export default function App() {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState([])
  const nextPhotoLinkRef = useRef()

  async function getPhotos(url, { overwrite = false } = {}) {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const res = await fetch(url)
      nextPhotoLinkRef.current = parseLinkHeader(res.headers.get("Link")).next

      const photos = await res.json()
      setPhotos(prevPhotos => (overwrite ? photos : [...prevPhotos, ...photos]))
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const lastElementRef = useCallback(element => {
    if (element == null || nextPhotoLinkRef.current == null) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        observer.unobserve(element)
        getPhotos(nextPhotoLinkRef.current)
      }
    })

    observer.observe(element)
  }, [])

  useEffect(() => {
    getPhotos(`http://localhost:3000/photos?_page=1&_limit=${LIMIT}`, {
      overwrite: true,
    })
  }, [])

  return (
    <div className="grid">
      {photos.map((photo, index) => (
        <img
          ref={index === photos.length - 1 ? lastElementRef : undefined}
          src={photo.url}
          key={photo.id}
        />
      ))}
      {isLoading &&
        Array.from({ length: LIMIT }, (_, index) => index).map(n => (
          <div className="skeleton" key={n}>
            Loading...
          </div>
        ))}
    </div>
  )
}
