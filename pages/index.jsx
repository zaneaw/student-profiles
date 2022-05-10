import Head from "next/head"
import App from "../components/App"
import GitHubComponent from "../components/GitHubComponent"

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>Student Profiles</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GitHubComponent />
            <App />
        </div>
    )
}
