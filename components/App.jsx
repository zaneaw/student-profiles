import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function App() {
    const [students, setStudents] = useState("")

    useEffect(() => {
        axios.get("/api/students").then((res) => {
            return setStudents(res.data.students)
        })
    }, [])

    return (
        <div>
            {students !== "" &&
                students.map((student, i) => {
                    const src = student.pic

                    // convert incoming array of strings to array of numbers
                    const numbers = student.grades.map((num) => Number(num))
                    // reducer function to total up the numbers and divide by length of array to obtain average
                    const gradeAvg =
                        numbers.reduce((a, b) => a + b, 0) / numbers.length

                    return (
                        <div key={student.id}>
                            <Image
                                loader={() => src}
                                unoptimized
                                src={src}
                                alt="Students selected image"
                                width={50}
                                height={50}
                            />
                            <h4>
                                {student.firstName} {student.lastName}
                            </h4>
                            <p>Email: {student.email}</p>
                            <p>Company: {student.company}</p>
                            <p>Skill: {student.skill}</p>
                            <p>Average: {gradeAvg}%</p>
                        </div>
                    )
                })}
        </div>
    )
}
