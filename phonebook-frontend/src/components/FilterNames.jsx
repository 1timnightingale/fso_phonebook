const FilterNames = (props) => {
    const filterName = props.filterName
    const onChange = props.onChange

    return (

        <div>
            <h1> Search for names</h1>
            <form>
                <div>
                    Name: <input value={filterName} onChange={onChange} />
                </div>
            </form>
        </div>
    )
}

export default FilterNames
