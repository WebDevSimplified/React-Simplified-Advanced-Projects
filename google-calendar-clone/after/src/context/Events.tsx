import { ReactNode, createContext, useEffect, useState } from "react"
import { UnionOmit } from "../utils/types"
import { EVENT_COLORS } from "./useEvents"

export type Event = {
  id: string
  name: string
  color: (typeof EVENT_COLORS)[number]
  date: Date
} & (
  | {
      allDay: false
      startTime: string
      endTime: string
    }
  | {
      allDay: true
      startTime?: never
      endTime?: never
    }
)

export type EventsContext = {
  events: Event[]
  updateEvent: (id: string, eventDetails: UnionOmit<Event, "id">) => void
  addEvent: (event: UnionOmit<Event, "id">) => void
  deleteEvent: (id: string) => void
}

export const Context = createContext<EventsContext | null>(null)

type EventsProviderProps = {
  children: ReactNode
}

export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useLocalStorage("EVENTS", [])

  function updateEvent(id: string, eventDetails: UnionOmit<Event, "id">) {
    setEvents(events => {
      return events.map(event =>
        event.id === id ? { id, ...eventDetails } : event
      )
    })
  }

  function addEvent(event: UnionOmit<Event, "id">) {
    setEvents(events => [...events, { ...event, id: crypto.randomUUID() }])
  }

  function deleteEvent(id: string) {
    setEvents(events => events.filter(event => event.id !== id))
  }

  return (
    <Context.Provider value={{ events, updateEvent, addEvent, deleteEvent }}>
      {children}
    </Context.Provider>
  )
}

function useLocalStorage(key: string, initialValue: Event[]) {
  const [value, setValue] = useState<Event[]>(() => {
    const value = localStorage.getItem(key)
    if (value == null) return initialValue
    return (JSON.parse(value) as Event[]).map(event => {
      if (event.date instanceof Date) return event
      return { ...event, date: new Date(event.date) }
    })
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as const
}
