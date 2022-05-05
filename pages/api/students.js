import axios from "axios"

export default async function fetchStudents(req, res) {
    const data = await axios
        .get("https://api.hatchways.io/assessment/students")
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            // handle error
            console.error(error)
            return error
        })
    res.json(data)
}
