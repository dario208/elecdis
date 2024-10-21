
export default function CheckBox({label, id, value, onChange}) {
  return (
    <div className="flex gap-2 w-full items-center">
      <input 
      type="checkbox" 
      name="" 
      className="w-4 h-4 form-checkbox rounded text-[#F2505D] checked:outline-none" 
      id={id}
      value={value}
      onChange={onChange}
      />
      <label className='text-simpleText text-base' htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
