import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function App() {
    const [students, setStudents] = useState("")
    const [searchName, setSearchName] = useState("")

    useEffect(() => {
        axios.get("/api/students").then((res) => {
            return setStudents(res.data.students)
        })
    }, [])

    console.log(searchName)

    return (
        <div className="relative max-h-[90vh] overflow-y-scroll rounded-tl-xl rounded-bl-xl border sm:max-h-[85vh] sm:overflow-y-scroll md:max-h-[80vh]">
            <div className="z-2 sticky top-0 left-0 right-0 z-50 self-center bg-white px-4">
                <input
                    type="search"
                    placeholder="Search by name"
                    onChange={(event) => setSearchName(event.target.value)}
                    value={!searchName ? "" : searchName }
                    className="z-50 max-h-[50px] min-h-[50px] min-w-full border-b-2 bg-white px-2 pt-1 text-lg outline-0 focus-visible:border-black"
                />
            </div>
            <div className="max-h-full mt-5">
                {students !== "" &&
                    students.map((student, i) => {
                        const src = student.pic
                        const name = student.firstName + " " + student.lastName
                        // convert incoming array of strings to array of numbers
                        const numbers = student.grades.map((num) => Number(num))
                        // reducer function to total up the numbers and divide by length of array to obtain average
                        const gradeAvg =
                            numbers.reduce((a, b) => a + b, 0) / numbers.length

                        return (
                            <div
                                key={student.id}
                                className="flex max-w-[100vw] flex-col gap-2 border-b p-5 sm:min-w-[85vw] sm:flex-row sm:items-center md:gap-8 md:px-10 lg:min-w-[65vw]"
                            >
                                <div className="z-1 min-w-[80px] max-w-[125px] flex-1 self-center overflow-hidden rounded-full border">
                                    <Image
                                        loader={() => src}
                                        unoptimized
                                        src={src}
                                        alt="Students selected image"
                                        width={50}
                                        height={50}
                                        layout="responsive"
                                        className="z-1"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold sm:text-2xl md:text-4xl">
                                        {name.toUpperCase()}
                                    </h1>
                                    <div className="ml-3  sm:ml-4 md:ml-5">
                                        <p>Email: {student.email}</p>
                                        <p>Company: {student.company}</p>
                                        <p>Skill: {student.skill}</p>
                                        <p>Average: {gradeAvg}%</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
