import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaPlus, FaMinus } from "react-icons/fa"
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
                    //for testing
                    if (i === 0) {
                        student["tagInput"] = ""
                        student["tags"] = ["test1", "Test2"]
                    }
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
        <div className="relative h-full w-full rounded-tl-xl rounded-bl-xl border sm:h-[80vh] sm:max-w-[80vw] sm:overflow-y-scroll md:h-[75vh] md:w-[75vw]">
            <Search
                nameQuery={nameQuery}
                setNameQuery={setNameQuery}
                tagQuery={tagQuery}
                setTagQuery={setTagQuery}
            />
            <div className="max-h-full">
                {students !== "" &&
                    students.map((student, i) => {
                        // returns true if the '+' has been clicked
                        const active = tabs.includes(i)
                        const src = student.pic
                        const name = student.firstName + " " + student.lastName
                        // for nameQuery testing
                        const nameLower = name.toLowerCase()

                        // convert incoming array of strings to array of grades
                        const grades = student.grades.map((num) => Number(num))
                        // reducer function to total up the grades and divide by length of array to obtain average
                        const gradesTotal = grades.reduce((a, b) => a + b, 0)
                        const gradesAvg = gradesTotal / grades.length

                        const tagInput = student.tagInput
                        const tags = student.tags

                        return (
                            <div
                                key={student.id}
                                // render logic for searching by name is a function call. See function at top of file
                                className={`relative flex min-w-full max-w-full flex-col gap-2 border-b p-5 sm:w-[85vw] sm:flex-row sm:items-center md:gap-8 md:px-10 lg:w-[65vw]
                                     ${searchQuery(
                                         nameQuery,
                                         tagQuery,
                                         nameLower,
                                         tags
                                     )}
                                `}
                            >
                                {/* Button displays based on state of the tab */}
                                <div className="absolute right-6 top-6">
                                    {/* onClick add this tab to the tabs array */}
                                    <button
                                        className={`${
                                            active ? "hidden" : "block"
                                        }`}
                                        onClick={() => setTabs([...tabs, i])}
                                    >
                                        <FaPlus
                                            size={25}
                                            className="fill-gray-400 hover:fill-black"
                                        />
                                    </button>
                                    {/* onClick hide this tab by filtering out current index from tabs array */}
                                    <button
                                        className={`${
                                            !active ? "hidden" : "block"
                                        }`}
                                        onClick={() =>
                                            setTabs(
                                                tabs.filter((tab) => tab !== i)
                                            )
                                        }
                                    >
                                        <FaMinus
                                            size={25}
                                            className="fill-gray-400 hover:fill-black"
                                        />
                                    </button>
                                </div>

                                <div className="relative min-w-[100px] max-w-[125px] self-center overflow-hidden rounded-full border sm:absolute sm:top-7">
                                    <Image
                                        loader={() => src}
                                        unoptimized
                                        src={src}
                                        alt="Students selected image"
                                        width={50}
                                        height={50}
                                        layout="responsive"
                                    />
                                </div>
                                <div className="sm:ml-32 md:ml-40">
                                    <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-4xl">
                                        {name.toUpperCase()}
                                    </h1>
                                    <div className="ml-1 text-sm sm:ml-3 sm:text-base md:ml-5">
                                        <p>Email: {student.email}</p>
                                        <p>Company: {student.company}</p>
                                        <p>Skill: {student.skill}</p>
                                        <p>Average: {gradesAvg}%</p>
                                    </div>

                                    {/* Display only if active -> active = 'i' in tabs array */}
                                    {active && (
                                        <div
                                            className={`mt-4 ml-1 text-sm sm:ml-3 sm:text-base md:ml-5 ${
                                                tabs.includes(i)
                                                    ? "block"
                                                    : "hidden"
                                            }`}
                                        >
                                            {grades.map((grade, i) => {
                                                return (
                                                    <p key={i}>
                                                        <span className="mr-10">
                                                            Test {i + 1}:
                                                        </span>{" "}
                                                        <span>{grade}%</span>
                                                    </p>
                                                )
                                            })}
                                        </div>
                                    )}
                                    {student.tags && (
                                        <div className="mt-2 mb-3 flex gap-2">
                                            {student.tags.map((tag, tagId) => {
                                                return (
                                                    <span
                                                        key={tag}
                                                        className="rounded bg-gray-300 py-2 px-3 cursor-pointer text-sm ease-in-out duration-100 hover:scale-110 hover:bg-red-500 sm:text-base"
                                                        onClick={(e) =>
                                                            handleChange(
                                                                e,
                                                                i,
                                                                tagId
                                                            )
                                                        }
                                                    >
                                                        {tag}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    )}
                                    <input
                                        className="border-b-2 pb-1 text-sm outline-0 focus-visible:border-black md:text-base"
                                        type="text"
                                        placeholder="Add a tag"
                                        value={!tagInput ? "" : tagInput}
                                        name="tagInput"
                                        onChange={(e) => handleChange(e, i)}
                                        onKeyPress={(e) =>
                                            e.key === "Enter" &&
                                            handleChange(e, i)
                                        }
                                    />
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
