import Image from "next/image"

export default function Cards({ students, query, tabs, setTabs }) {
    return (
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
                            className={`relative flex min-w-full max-w-full flex-col gap-2 border-b p-5 sm:w-[85vw] sm:flex-row sm:items-center md:gap-8 md:px-10 lg:w-[65vw] 
                                    ${
                                        query !== "" &&
                                        (nameLower.includes(query.toLowerCase())
                                            ? "block"
                                            : "hidden")
                                    }`}
                        >
                            {/* Button displays based on state of the tab */}
                            <div className="absolute right-6 top-6">
                                {/* onClick add this tab to the tabs array */}
                                <button
                                    className={active ? "hidden" : "block"}
                                    onClick={() => setTabs([...tabs, i])}
                                >
                                    X
                                </button>
                                {/* onClick hide this tab by filtering out current index from tabs array */}
                                <button
                                    className={!active ? "hidden" : "block"}
                                    onClick={() =>
                                        setTabs(tabs.filter((tab) => tab !== i))
                                    }
                                >
                                    -
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
                                <div className="ml-1 text-sm sm:ml-3 md:ml-5">
                                    <p>Email: {student.email}</p>
                                    <p>Company: {student.company}</p>
                                    <p>Skill: {student.skill}</p>
                                    <p>Average: {gradeAvg}%</p>
                                </div>
                                {/* Display only if active -> active = 'i' in tabs array */}
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
    )
}
