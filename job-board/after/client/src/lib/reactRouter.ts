import { ReactNode } from "react"
import {
  Await as AwaitReactRouter,
  AwaitProps,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
} from "react-router-dom"

export function deferredLoader<T extends Record<string, unknown>>(
  dataFunc: (args: LoaderFunctionArgs) => T
) {
  return (args: LoaderFunctionArgs) =>
    defer(dataFunc(args)) as Omit<ReturnType<typeof defer>, "data"> & {
      data: T
    }
}

export function Await<T>(
  props: Omit<AwaitProps, "children" | "resolve"> & {
    children: (data: Awaited<T>) => ReactNode
    resolve: Promise<T>
  }
): JSX.Element {
  return AwaitReactRouter(props)
}

export function useDeferredLoaderData<
  T extends ReturnType<typeof deferredLoader>
>() {
  return useLoaderData() as ReturnType<T>["data"]
}
