import { useLocalStorage } from "@/hooks/useLocalStorage"
import { JobPostingCard } from "./features/job-posting/components/JobPostingCard"

const JOBS = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    salary: "$150,000",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    title: "Software Engineer",
    company: "Facebook",
    location: "Menlo Park, CA",
    salary: "$150,000",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "3",
    title: "Software Engineer",
    company: "Apple",
    location: "Cupertino, CA",
    salary: "$150,000",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
]

export default function App() {
  const [hiddenJobIds, setHiddenJobIds] = useLocalStorage<string[]>(
    "hiddenJobIds",
    []
  )
  const [favoriteJobIds, setFavoriteJobIds] = useLocalStorage<string[]>(
    "favoriteJobIds",
    []
  )

  return (
    <div className="container my-4">
      <div className="flex flex-col sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
        {JOBS.map(job => (
          <JobPostingCard
            key={job.id}
            isHidden={hiddenJobIds.includes(job.id)}
            isFavorite={favoriteJobIds.includes(job.id)}
            toggleFavorite={() =>
              setFavoriteJobIds(ids => {
                if (ids.includes(job.id)) {
                  return ids.filter(id => job.id !== id)
                }
                return [...ids, job.id]
              })
            }
            setHidden={isHidden =>
              setHiddenJobIds(ids => {
                if (isHidden && !ids.includes(job.id)) {
                  return [...ids, job.id]
                }
                return ids.filter(id => id !== job.id)
              })
            }
          />
        ))}
      </div>
    </div>
  )
}
