const Notification = ({ message, level }) => {
    if (message === null) {
        return null
    } else {
        return (
            <div className={level}>
                {message}
            </div >
        )
    }
}

export default Notification