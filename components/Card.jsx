import { FaPlus, FaMinus } from "react-icons/fa"
import Image from "next/image"

export default function Card({
    student,
    tabs,
    setTabs,
    i,
    searchQuery,
    nameQuery,
    tagQuery,
    handleChange,
}) {
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
            className={`relative flex min-w-full max-w-full flex-col gap-2 border-b bg-white p-5 sm:w-[85vw] sm:flex-row sm:items-center md:gap-8 md:px-10 lg:w-[65vw]
                                     ${searchQuery(
                                         nameQuery,
                                         tagQuery,
                                         nameLower,
                                         tags
                                     )}
                                `}
        >
            {/* 
                Button displays based on state of the tab 
            */}
            <div className="absolute right-6 top-6">
                {/* onClick add this tab to the tabs array */}
                <button
                    className={`${active ? "hidden" : "block"}`}
                    onClick={() => setTabs([...tabs, i])}
                >
                    <FaPlus
                        size={25}
                        className="fill-gray-400 hover:fill-black"
                    />
                </button>
                {/* onClick hide this tab by filtering out current index from tabs array */}
                <button
                    className={`${!active ? "hidden" : "block"}`}
                    onClick={() => setTabs(tabs.filter((tab) => tab !== i))}
                >
                    <FaMinus
                        size={25}
                        className="fill-gray-400 hover:fill-black"
                    />
                </button>
            </div>

            {/* 
                Students Image container and Image here 
            */}
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

            {/* 
                Student Information: Name, Email, Tags, etc.
             */}
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

                {/* 
                    Display only if active is true, active is true if 'i' is in tabs array
                    Student Tests and Grade Percentages are displayed here
                */}
                {active && (
                    <div
                        className={`mt-4 ml-1 text-sm sm:ml-3 sm:text-base md:ml-5 ${
                            tabs.includes(i) ? "block" : "hidden"
                        }`}
                    >
                        {grades.map((grade, i) => {
                            return (
                                <p key={i}>
                                    <span className="mr-10">Test {i + 1}:</span>{" "}
                                    <span>{grade}%</span>
                                </p>
                            )
                        })}
                    </div>
                )}

                {/* 
                    Student Tags displayed if they exist for the student, flex wrap if too long
                */}
                {student.tags && (
                    <div className="mt-2 mb-3 flex flex-wrap gap-2">
                        {student.tags.map((tag, tagId) => {
                            return (
                                <span
                                    key={tag}
                                    className="cursor-pointer rounded bg-gray-300 py-2 px-3 text-sm duration-100 ease-in-out hover:scale-110 hover:bg-red-500 sm:text-base"
                                    onClick={(e) => handleChange(e, i, tagId)}
                                >
                                    {tag}
                                </span>
                            )
                        })}
                    </div>
                )}

                {/* 
                    Tag input field
                */}
                <input
                    className="border-b-2 pb-1 text-sm outline-0 focus-visible:border-black md:text-base"
                    type="text"
                    placeholder="Add a tag"
                    value={!tagInput ? "" : tagInput}
                    name="tagInput"
                    onChange={(e) => handleChange(e, i)}
                    onKeyPress={(e) => e.key === "Enter" && handleChange(e, i)}
                />
            </div>
        </div>
    )
}
