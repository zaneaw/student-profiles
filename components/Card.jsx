import { FaPlus, FaMinus } from "react-icons/fa"
import Image from "next/image"
import { useMemo, useState } from "react"

export default function Card({
    i,
    student,
    searchQuery,
    nameQuery,
    tagQuery,
    handleChange,
}) {
    const [tab, setTab] = useState(false)

    const name = student.firstName + " " + student.lastName
    const nameLower = name.toLowerCase()

    const grades = student.grades
    // Memoize expensive function
    const gradesAvg = useMemo(() => {
        return grades.reduce((a, b) => Number(a) + Number(b), 0) / grades.length
    }, [grades])

    const tags = student.tags

    return (
        <div
            className={`relative flex min-w-full max-w-full flex-col gap-2 border-b bg-white p-5 sm:w-[85vw] sm:flex-row sm:items-center md:gap-8 md:px-10 lg:w-[65vw]
                                     ${searchQuery(
                                         nameQuery,
                                         tagQuery,
                                         nameLower,
                                         tags
                                     )}
                                `}
        >
            <div className="absolute right-6 top-6">
                {/* onClick add this tab to the tabs array */}
                <button
                    className={`${tab ? "hidden" : "block"}`}
                    onClick={() => setTab((tab) => !tab)}
                >
                    <FaPlus
                        size={25}
                        className="fill-gray-400 hover:fill-black"
                    />
                </button>
                {/* onClick hide this tab by filtering out current index from tabs array */}
                <button
                    className={`${!tab ? "hidden" : "block"}`}
                    onClick={() => setTab((tab) => !tab)}
                >
                    <FaMinus
                        size={25}
                        className="fill-gray-400 hover:fill-black"
                    />
                </button>
            </div>
            <div className="relative min-w-[100px] max-w-[125px] self-center overflow-hidden rounded-full border sm:absolute sm:top-7">
                <Image
                    loader={() => student.pic}
                    unoptimized
                    src={student.pic}
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
                {tab && (
                    <div
                        className={`mt-4 ml-1 text-sm sm:ml-3 sm:text-base md:ml-5 ${
                            tab ? "block" : "hidden"
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
                <input
                    className="border-b-2 pb-1 text-sm outline-0 focus-visible:border-black md:text-base"
                    type="text"
                    placeholder="Add a tag"
                    value={!student.tagInput ? "" : student.tagInput}
                    name="tagInput"
                    onChange={(e) => handleChange(e, i)}
                    onKeyPress={(e) => e.key === "Enter" && handleChange(e, i)}
                />
            </div>
        </div>
    )
}
