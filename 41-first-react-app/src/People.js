import { useEffect, useState } from 'react'

export default function People() {
    
    const [people, setPeople] = useState([
        {id: 1, name: 'Irene'},
        {id: 2, name: 'Rohit'},
        {id: 3, name: 'Leila'},
        {id: 4, name: 'Boy'}
    ])

    const getPeople = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await response.json()
        // console.log(result);
        setPeople(result)
    }

    useEffect(() => {
        getPeople()
    }, [])
    
    return <>
    <h1>Hello people!</h1>
    <ul>
        {people.map((person) => <li key={person.id}> {person.name} </li>)}
    </ul>
    </>
}