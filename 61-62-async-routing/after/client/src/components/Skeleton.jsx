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

export function SkeletonButton() {
  return <div className="skeleton skeleton-btn" />
}

export function SkeletonInput() {
  return <div className="skeleton skeleton-input" />
}

export function SkeletonList({ amount, children }) {
  return (
    <>
      {Array.from({ length: amount }).map((_, i) => (
        <Fragment key={i}>{children}</Fragment>
      ))}
    </>
  )
}
export function SimpleSkeletonText({ resolve, children }) {
  return (
    <Suspense fallback={<Skeleton short inline />}>
      <Await resolve={resolve}>{children}</Await>
    </Suspense>
  )
}
