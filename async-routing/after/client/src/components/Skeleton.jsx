import { Fragment, Suspense } from "react"
import { Await } from "react-router-dom"

export function Skeleton({ short, inline }) {
  return (
    <div
      className="skeleton"
      style={{
        width: short ? "15em" : undefined,
        display: inline ? "inline-block" : undefined,
      }}
    />
  )
}

export function SkeletonBtn() {
  return <div className="skeleton-btn skeleton" />
}

export function SkeletonInput() {
  return <div className="skeleton-input skeleton" />
}

export function SimpleSkeletonText({ resolve, children }) {
  return (
    <Suspense fallback={<Skeleton short inline />}>
      <Await resolve={resolve}>{children}</Await>
    </Suspense>
  )
}

export function SkeletonList({ amount, children }) {
  const child = children ?? <Skeleton />

  return (
    <>
      {Array.from({ length: amount }).map((_, i) => (
        <Fragment key={i}>{child}</Fragment>
      ))}
    </>
  )
}
