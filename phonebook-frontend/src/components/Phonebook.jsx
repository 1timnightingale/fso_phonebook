import Person from "./Person"

const Phonebook = ({ phonebook, deletePerson }) => {

    return (
        <div>
            <table>
                <thead>

                    {phonebook.map((person, index) =>
                        <Person key={index} person={person} deletePerson={(person) => deletePerson(person)} />
                    )}

                </thead>
            </table>
        </div>
    )
}

export default Phonebook