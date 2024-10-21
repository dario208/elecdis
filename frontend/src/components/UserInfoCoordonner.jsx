
function UserInfoCoordonner({Icone, Value, className}) {
  return (
    <div className={`w-full ${className} ml-2 mb-2 flex justify-start gap-2 items-center text-[#637381]`}>
            <Icone size={24} />
            <p className="text-[16px]">{Value}</p>
    </div>
  )
}

export default UserInfoCoordonner
