const PersonCheck = ({ newName, persons }) => {

    const matchList = persons.filter(person => person.name === newName)
    console.log(matchList)
    return (matchList)
}

export default PersonCheck