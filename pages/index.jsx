import Head from "next/head"
import { useState } from "react"
import App from "../components/App"
import GitHubComponent from "../components/GitHubComponent"

export const getStaticProps = async () => {
    const res = await fetch("https://api.hatchways.io/assessment/students")
    const data = await res.json()
    const studentsData = await data.students
    studentsData.map((student) => {
        student["tagInput"] = ""
        student["tags"] = []
        return { props: { data: data } }
    })
    return { props: { studentsData: studentsData } }
}

export default function Home({ studentsData }) {
    const [students, setStudents] = useState(studentsData)
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>Student Profiles</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GitHubComponent />
            <App students={students} setStudents={setStudents} />
        </div>
    )
}
