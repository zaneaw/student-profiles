import axios from "axios"
import { useEffect, useState } from "react"
import Cards from "./Cards"

export default function App() {
    const [students, setStudents] = useState("")
    const [query, setQuery] = useState("")
    const [tabs, setTabs] = useState([])

    useEffect(() => {
        axios.get("/api/students").then((res) => {
            return setStudents(res.data.students)
        })
    }, [])

    return (
        <div className="relative h-full w-full rounded-tl-xl rounded-bl-xl border sm:h-[80vh] sm:max-w-[80vw] sm:overflow-y-scroll md:h-[75vh] md:w-[75vw]">
            <div className="z-2 sticky top-0 left-0 right-0 z-50 self-center bg-white px-4">
                <input
                    type="search"
                    placeholder="Search by name"
                    onChange={(event) => setQuery(event.target.value)}
                    value={!query ? "" : query}
                    className="z-50 max-h-[50px] min-h-[50px] min-w-full border-b-2 bg-white px-2 pt-1 text-lg outline-0 focus-visible:border-black"
                />
            </div>
            <Cards students={students} query={query} tabs={tabs} setTabs={setTabs} />
        </div>
    )
}
