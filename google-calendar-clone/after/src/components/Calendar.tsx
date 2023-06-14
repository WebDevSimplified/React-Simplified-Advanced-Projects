import {
  addMonths,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import { FormEvent, Fragment, useId, useMemo, useRef, useState } from "react"
import { cc } from "../utils/cc"
import { formatDate } from "../utils/formatDate"
import { OverflowContainer } from "./OverflowContainer"
import { Modal, ModalProps } from "./Modal"
import { UnionOmit } from "../utils/types"
import { Event } from "../context/Events"
import { EVENT_COLORS, useEvents } from "../context/useEvents"

export function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const { events } = useEvents()

  const calendarDays = useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth))
    const lastWeekStart = endOfWeek(endOfMonth(selectedMonth))
    return eachDayOfInterval({ start: firstWeekStart, end: lastWeekStart })
  }, [selectedMonth])

  function getEventsForDay(day: Date) {
    return events.filter(event => isSameDay(event.date, day))
  }

  return (
    <div className="calendar">
      <div className="header">
        <button className="btn" onClick={() => setSelectedMonth(new Date())}>
          Today
        </button>
        <div>
          <button
            className="month-change-btn"
            onClick={() => setSelectedMonth(m => subMonths(m, 1))}
          >
            &lt;
          </button>
          <button
            className="month-change-btn"
            onClick={() => setSelectedMonth(m => addMonths(m, 1))}
          >
            &gt;
          </button>
        </div>
        <span className="month-title">
          {formatDate(selectedMonth, { month: "long", year: "numeric" })}
        </span>
      </div>
      <div className="days">
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={day.getTime()}
            showWeekName={index < 7}
            day={day}
            events={getEventsForDay(day)}
            selectedMonth={selectedMonth}
          />
        ))}
      </div>
    </div>
  )
}

type CalendarDayProps = {
  day: Date
  showWeekName: boolean
  events: Event[]
  selectedMonth: Date
}

function CalendarDay({
  day,
  events,
  showWeekName,
  selectedMonth,
}: CalendarDayProps) {
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false)
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false)
  const { addEvent } = useEvents()
  const sortedEvents = useMemo(() => {
    const timeToNumber = (time: string) => parseFloat(time.replace(":", "."))

    return [...events].sort((a, b) => {
      if (a.allDay && b.allDay) {
        return 0
      } else if (a.allDay) {
        return -1
      } else if (b.allDay) {
        return 1
      } else {
        return timeToNumber(a.startTime) - timeToNumber(b.startTime)
      }
    })
  }, [events])

  return (
    <div
      className={cc(
        "day",
        !isSameMonth(day, selectedMonth) && "non-month-day",
        isBefore(endOfDay(day), new Date()) && "old-month-day"
      )}
    >
      <div className="day-header">
        {showWeekName && (
          <div className="week-name">
            {formatDate(day, { weekday: "short" })}
          </div>
        )}
        <div className={cc("day-number", isToday(day) && "today")}>
          {formatDate(day, { day: "numeric" })}
        </div>
        <button
          className="add-event-btn"
          onClick={() => setIsNewEventModalOpen(true)}
        >
          +
        </button>
      </div>
      {sortedEvents.length > 0 && (
        <OverflowContainer
          className="events"
          items={sortedEvents}
          renderOverflow={amount => (
            <>
              <button
                onClick={() => setIsViewMoreModalOpen(true)}
                className="events-view-more-btn"
              >
                +{amount} More
              </button>
              <ViewMoreCalendarEventsModal
                isOpen={isViewMoreModalOpen}
                onClose={() => setIsViewMoreModalOpen(false)}
                events={sortedEvents}
              />
            </>
          )}
          renderItem={event => <CalendarEvent event={event} key={event.id} />}
        />
      )}
      <EventFormModal
        date={day}
        isOpen={isNewEventModalOpen}
        onSubmit={addEvent}
        onClose={() => setIsNewEventModalOpen(false)}
      />
    </div>
  )
}

function CalendarEvent({ event }: { event: Event }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { updateEvent, deleteEvent } = useEvents()
  return (
    <>
      <button
        onClick={() => setIsEditModalOpen(true)}
        className={cc("event", event.color, event.allDay && "all-day-event")}
      >
        {!event.allDay && (
          <>
            <div className={`color-dot ${event.color}`} />
            <div className="event-time">
              {formatDate(parse(event.startTime, "HH:mm", event.date), {
                timeStyle: "short",
              })}
            </div>
          </>
        )}
        <div className="event-name">{event.name}</div>
      </button>
      <EventFormModal
        event={event}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={e => updateEvent(event.id, e)}
        onDelete={() => deleteEvent(event.id)}
      />
    </>
  )
}

type ViewMoreCalendarEventsModalProps = {
  events: Event[]
} & Omit<ModalProps, "children">

function ViewMoreCalendarEventsModal({
  events,
  ...modalProps
}: ViewMoreCalendarEventsModalProps) {
  if (events.length === 0) return null

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        {formatDate(events[0].date, { dateStyle: "short" })}
        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <div className="events">
        {events.map(event => (
          <CalendarEvent event={event} key={event.id} />
        ))}
      </div>
    </Modal>
  )
}

type EventFormModalProps = ({
  onSubmit: (event: UnionOmit<Event, "id">) => void
} & Omit<ModalProps, "children">) &
  (
    | {
        event: Event
        onDelete: () => void
        date?: never
      }
    | {
        date: Date
        onDelete?: never
        event?: never
      }
  )

function EventFormModal({
  onSubmit,
  onDelete,
  event,
  date,
  ...modalProps
}: EventFormModalProps) {
  const formId = useId()
  const isNew = event == null
  const [isAllDayChecked, setIsAllDayChecked] = useState(event?.allDay || false)
  const [selectedColor, setSelectedColor] = useState(
    event?.color || EVENT_COLORS[0]
  )
  const [startTime, setStartTime] = useState(event?.startTime || "")
  const nameRef = useRef<HTMLInputElement>(null)
  const endTimeRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const name = nameRef.current?.value
    const endTime = endTimeRef.current?.value

    if (name == null || startTime == null || endTime == null) {
      return
    }

    const commonProps = {
      name,
      date: date || event?.date,
      color: selectedColor,
    }
    let newEvent: UnionOmit<Event, "id">
    if (isAllDayChecked) {
      newEvent = {
        ...commonProps,
        allDay: true as const,
      }
    } else {
      newEvent = {
        ...commonProps,
        allDay: false as const,
        startTime,
        endTime,
      }
    }

    modalProps.onClose()
    onSubmit(newEvent)
  }

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <div>{isNew ? "Add Event" : "Edit Event"}</div>
        <small>{formatDate(date || event?.date, { dateStyle: "short" })}</small>
        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input
            required
            type="text"
            id={`${formId}-name`}
            ref={nameRef}
            defaultValue={event?.name}
          />
        </div>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id={`${formId}-all-day`}
            checked={isAllDayChecked}
            onChange={e => setIsAllDayChecked(e.target.checked)}
          />
          <label htmlFor={`${formId}-all-day`}>All Day?</label>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor={`${formId}-start-time`}>Start Time</label>
            <input
              type="time"
              id={`${formId}-start-time`}
              disabled={isAllDayChecked}
              required={!isAllDayChecked}
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`${formId}-end-time`}>End Time</label>
            <input
              type="time"
              id={`${formId}-end-time`}
              required={!isAllDayChecked}
              disabled={isAllDayChecked}
              ref={endTimeRef}
              min={startTime}
              defaultValue={event?.allDay === false ? event.endTime : ""}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Color</label>
          <div className="row left">
            {EVENT_COLORS.map(color => (
              <Fragment key={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  id={`${formId}-${color}`}
                  checked={selectedColor === color}
                  onChange={() => setSelectedColor(color)}
                  className="color-radio"
                />
                <label htmlFor={`${formId}-${color}`}>
                  <span className="sr-only">{color}</span>
                </label>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="row">
          <button className="btn btn-success" type="submit">
            {isNew ? "Add" : "Save"}
          </button>
          {onDelete != null && (
            <button onClick={onDelete} className="btn btn-delete" type="button">
              Delete
            </button>
          )}
        </div>
      </form>
    </Modal>
  )
}
