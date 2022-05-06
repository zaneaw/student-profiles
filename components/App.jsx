import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function App() {
    const [students, setStudents] = useState("")
    const [query, setQuery] = useState("")
    const [tabs, setTabs] = useState([])

    useEffect(() => {
        axios.get("/api/students").then((res) => {
            return setStudents(res.data.students)
        })
    }, [])

    console.log(tabs)

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
            <div className="max-h-full">
                {students !== "" &&
                    students.map((student, i) => {
                        const src = student.pic
                        const name = student.firstName + " " + student.lastName
                        const nameLower = name.toLowerCase()
                        // convert incoming array of strings to array of grades
                        const grades = student.grades.map((num) => Number(num))
                        // reducer function to total up the grades and divide by length of array to obtain average
                        const gradeAvg =
                            grades.reduce((a, b) => a + b, 0) / grades.length
                        // returns true if the '+' has been clicked
                        const active = tabs.includes(i)

                        return (
                            <div
                                key={student.id}
                                className={`relative flex max-w-full flex-col gap-2 border-b p-5 sm:w-[85vw] sm:flex-row sm:items-center md:gap-8 md:px-10 lg:w-[65vw] 
                                    ${
                                        query !== "" &&
                                        (nameLower.includes(query.toLowerCase())
                                            ? "block"
                                            : "hidden")
                                    }`}
                            >
                                <button
                                    className={`absolute right-6 top-6 ${
                                        active ? "hidden" : "block"
                                    }`}
                                    onClick={() => setTabs([...tabs, i])}
                                >
                                    X
                                </button>
                                <button
                                    className={`absolute right-6 top-6 ${
                                        !active ? "hidden" : "block"
                                    }`}
                                    onClick={() =>
                                        setTabs(tabs.filter((tab) => tab !== i))
                                    }
                                >
                                    -
                                </button>
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
                                    <h1 className="text-lg font-bold sm:text-2xl md:text-4xl">
                                        {name.toUpperCase()}
                                    </h1>
                                    <div className="ml-1 text-sm sm:ml-3 md:ml-5">
                                        <p>Email: {student.email}</p>
                                        <p>Company: {student.company}</p>
                                        <p>Skill: {student.skill}</p>
                                        <p>Average: {gradeAvg}%</p>
                                    </div>
                                    {active && (
                                        <div
                                            className={`mt-4 ml-1 text-sm sm:ml-3 md:ml-5 ${
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
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
