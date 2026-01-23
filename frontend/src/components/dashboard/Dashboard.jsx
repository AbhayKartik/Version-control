import React, { useState, useEffect } from 'react'
import "./Dashboard.css"
import Navbar from '../Navbar'
const Dashboard = () => {

    const [repositories, setRepositories] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [suggestedRepositories, setSuggestedRepositories] = useState([])
    const [searchResult, setSearchResult] = useState([])


    useEffect(() => {
        const userId = localStorage.getItem("userId")



        const fetchRepositories = async () => {
            try {
                const repository = await fetch(`http://localhost:3000/repo/user/${userId}`)
                const data = await repository.json()
                setRepositories(data.repositories)
            } catch (error) {
                console.error("error during fetching repos", error)
            }
        }

        const fetchSuggestedRepositories = async () => {
            try {
                const repository = await fetch(`http://localhost:3000/repo/all`)
                const data = await repository.json()
                console.log(data)
                setSuggestedRepositories(data)
            } catch (e) {
                console.error("Error during Suggesting repo", e)
            }
        }
        fetchSuggestedRepositories()
        fetchRepositories()

    }, [])

    useEffect(() => {
        if (searchQuery == "") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSearchResult(repositories)
        } else {
            const filteredRepo = repositories.filter((repo) => repo.name.toLowerCase().includes(searchQuery.toLowerCase()))
            setSearchResult(filteredRepo)
        }
    }, [searchQuery, repositories])
    return (
        <>            <Navbar />
            <section id='dashboard'>
                <aside>
                    <h3>Suggested Repositories </h3>
                    {suggestedRepositories.map((repo) => {

                        return (<div key={repo._id}>

                            <h4>{repo.name} </h4>
                            <h4>{repo.description} </h4>
                        </div>
                        )
                    }
                    )}
                </aside>
                <main>
                    <h3>Your Repos </h3>
                    <div id='search'>
                        <input type="text" value={searchQuery} placeholder='Search...' onChange={(e) => setSearchQuery(e.target.value)} />
                        <button > Serach</button>
                    </div>
                    {searchResult.map((repo) => {

                        return (<div key={repo._id}>

                            <h4>{repo.name} </h4>
                            <h4>{repo.description} </h4>
                        </div>
                        )
                    }
                    )}
                </main>
                <aside>
                    <h3>upcoming Event</h3>
                    <ul>
                        <li><p>tech 123 </p></li>
                        <li><p>tech 1234 </p></li>
                        <li><p>tech 12345</p></li>
                        <li><p>tech 123456 </p></li>
                    </ul>
                </aside>

            </section>
        </>

    )
}

export default Dashboard
