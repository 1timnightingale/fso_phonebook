
const AddPerson = (props) => {
    const onSubmit = props.onSubmit
    const newName = props.newName
    const newNumber = props.newNumber
    const handleNameChange = props.handleNameChange
    const handleNumberChange = props.handleNumberChange

    return (
        <div>
            <h1> Add a new name</h1>
            <form onSubmit={onSubmit}>
                <table>
                    <thead>
                        <tr>
                            <td>Name:</td>
                            <td><input value={newName} onChange={handleNameChange} /></td>
                        </tr>
                        <tr>
                            <td>Phone Number:</td>
                            <td><input value={newNumber} onChange={handleNumberChange} /></td>
                        </tr>
                        <tr>
                            <td />
                            <td><button type="submit">add</button></td>
                        </tr>
                    </thead>
                </table>
                {/*
                <div>
                    Name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    Phone Number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
   
                <div>
                    <button type="submit">add</button>
                </div>
   */}


            </form>
        </div>
    )
}

export default AddPerson