import { Link } from "react-router-dom";
export default function Error() {
    return (
        <>
            <main
                className="min-h-full  bg-top sm:bg-top"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1653613583160-d7df45e91fee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-80">
                    <p className="text-sm font-semibold text-red-700 uppercase tracking-wide">error</p>
                    <h1 className="mt-2 text-4xl font-extrabold text-red-700 tracking-tight sm:text-5xl">
                        Uh oh! I think you’re lost.
                    </h1>
                    <p className="mt-2 text-lg font-medium text-red-700">
                        It looks like the page you’re looking for doesn't exist.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-100 "
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}