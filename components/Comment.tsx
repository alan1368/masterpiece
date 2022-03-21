export default function Comment(props) {
  return (
    <div className="mb-3 flex border p-3">
      <img
        src="/alone.jpg"
        alt="author profile"
        className="mr-2 h-14 w-14 rounded-full"
      />
      <div className="mx-auto w-9/12 ">
        <div className="mb-4 flex justify-between ">
          <h2 className="font-normal">{props.name}</h2>
          <p className="font-thin">{props.date}</p>
        </div>

        <p className="font-light">{props.comment}</p>
      </div>
    </div>
  )
}
