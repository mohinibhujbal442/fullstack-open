const Notification = ({ message, error }) => {
  if (message === null && error === null) {
    return null
  }

  if (error !== null) {
    return (
      <div style={{ color: 'red' }}>
        {error}
      </div>
    )
  }

  return (
    <div style={{ color: 'green' }}>
      {message}
    </div>
  )
}

export default Notification