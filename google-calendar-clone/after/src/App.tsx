import { Calendar } from "./components/Calendar"
import { EventsProvider } from "./context/Events"

export default function App() {
  return (
    <EventsProvider>
      <Calendar />
    </EventsProvider>
  )
}
