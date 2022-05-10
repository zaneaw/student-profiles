import axios from "axios"
import { useEffect, useState } from "react"
import { VscLoading } from "react-icons/vsc"
import Card from "./Card"
import Search from "./Search"

export default function App() {
    const [students, setStudents] = useState("")
    const [nameQuery, setNameQuery] = useState("")
    const [tagQuery, setTagQuery] = useState("")
    const [tabs, setTabs] = useState([])

    // get student data from api (hides key if one is used)
    // map over each student and add an empty 'tags' array
    // and an empty 'tagIput' field
    useEffect(() => {
        axios.get("/api/students").then((res) => {
            return setStudents(() => {
                return res.data.students.map((student, i) => {
                    student["tagInput"] = ""
                    student["tags"] = []
                    return student
                })
            })
        })
    }, [])

    // case-insensitive search for students name
    const nameSearch = (nameLower, nameQuery) => {
        if (nameLower.includes(nameQuery.toLowerCase())) {
            return true
        } else {
            return false
        }
    }

    // case-insensitive search for students tags
    const tagSearch = (tags, tagQuery) => {
        const tagMatch = false
        tags.map((tag) => {
            tag = tag.toLowerCase()
            if (tag.includes(tagQuery.toLowerCase())) {
                return (tagMatch = true)
            }
        })
        if (tagMatch) return true
        else return false
    }

    const searchQuery = (nameQuery, tagQuery, nameLower, tags) => {
        /* 
            logic for both name and tag being searched.
            Conditional check on both the tagSearch and the nameSearch,
            if both return true, the students card's container is set to 'display: block'.
            If either return false, the container is set to 'hidden' and not displayed.
        */
        if (nameQuery !== "" && tagQuery !== "") {
            if (tagSearch(tags, tagQuery) && nameSearch(nameLower, nameQuery)) {
                return "block"
            } else {
                return "hidden"
            }
            // logic for only tag being searched
            // same logic described above, but only for tag
        } else if (nameQuery === "" && tagQuery !== "") {
            if (tagSearch(tags, tagQuery)) {
                return "block"
            } else {
                return "hidden"
            }
            // logic for only name being searched
            // same logic described above, but only for name
        } else if (nameQuery !== "" && tagQuery === "") {
            if (nameSearch(nameLower, nameQuery)) {
                return "block"
            } else {
                return "hidden"
            }
        }
    }

    // event handler function
    const handleChange = (event, itemId, tagId) => {
        const value = event.target.value
        const clonedStudents = [...students]
        const currentStudent = clonedStudents[itemId]

        // onClick event handler for removing a tag
        // if it's a click event, splice the currentStudent (based on itemId)
        // and remove 1 item at the index of 'tagId', return clonedStudents
        // with the new array for the currentStudent
        if (event.type === "click") {
            currentStudent.tags.splice(tagId, 1)
            return setStudents(clonedStudents)
        }

        // handle change when typing in the input field
        if (event.key !== "Enter") {
            currentStudent.tagInput = value
            return setStudents(clonedStudents)

            // in case the user just hits enter on an empty tag input field
            // if they do, nothing happens :)
        } else if (value.length > 0) {
            // case-insensitive check if tag trying to be added exists, if it does ->
            // reset tagInput to an empty field. Else ->
            // add current value of tagInput to state and reset tagInput to empty field
            if (currentStudent.tags.includes(value)) {
                currentStudent.tagInput = ""
                return setStudents(clonedStudents)
            } else {
                currentStudent.tags = [...currentStudent.tags, value]
                currentStudent.tagInput = ""
                return setStudents(clonedStudents)
            }
        }
    }

    return (
        <div className="relative min-h-[95vh] rounded-xl border bg-gray-200 shadow-lg sm:max-h-[80vh] sm:min-h-[80vh] sm:min-w-[90vw] sm:overflow-y-scroll md:h-[75vh] md:w-[75vw]">
            <Search
                nameQuery={nameQuery}
                setNameQuery={setNameQuery}
                tagQuery={tagQuery}
                setTagQuery={setTagQuery}
            />
            <div className="max-h-full min-h-full">
                {students !== "" ? (
                    students.map((student, i) => {
                        return (
                            <Card
                                key={student.id}
                                student={student}
                                i={i}
                                tabs={tabs}
                                searchQuery={searchQuery}
                                nameQuery={nameQuery}
                                tagQuery={tagQuery}
                                handleChange={handleChange}
                                setTabs={setTabs}
                            />
                        )
                    })
                ) : (
                    // render this if nothing exists in students
                    <div className="mx-auto flex flex-col content-center pt-[33%]">
                        <p className=" text-center text-3xl text-gray-400">
                            Attempting to load
                        </p>
                        <span className="mx-auto mt-4 animate-spin">
                            <VscLoading className="text-gray-400" size={30} />
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
