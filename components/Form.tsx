import { useForm } from 'react-hook-form'

export default function Form({ _id }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  interface dataObject {
    name: string
    email: string
    text: string
  }
  const onSubmit = async (data: any) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify({ ...data, _id }),
    })
  }
  return (
    <div className="mt-20 w-7/12  max-w-4xl ">
      <h2 className=" my-5 text-xl text-gray-500">
        Leave a Comment on this Post
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
        <input
          {...register('name', { required: true })}
          type="text"
          placeholder="Name"
          className={`h-14 w-full overflow-hidden ${
            errors.name && 'border-2 border-rose-500'
          } rounded-md bg-slate-100 px-5 text-xl text-gray-500`}
        />
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="Email Address"
          className="my-5 h-14 w-full overflow-hidden rounded-md  bg-slate-100 px-5 text-xl text-gray-500"
        />
        <textarea
          {...register('text', { required: true })}
          id=""
          cols="30"
          rows="8"
          placeholder="Your Comment"
          className="overflow-hidden rounded-md bg-slate-100 p-5 text-xl text-gray-500"
        />
        <button className="my-5 h-10 w-32 rounded-md bg-green-500 text-lg tracking-wide text-white hover:bg-green-600">
          SUBMIT
        </button>
      </form>
    </div>
  )
}
