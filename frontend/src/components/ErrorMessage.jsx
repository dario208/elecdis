
export default function ErrorMessage({message, className}) {
  return (
    <div className={`w-full text-left transition-all indent-2 ${className}`}>
        <p className='text-[#d87c7c]'>{message}</p>
    </div>
  )
}
