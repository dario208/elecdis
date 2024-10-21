import { MoonLoader } from "react-spinners";

export default function Boutton({label, className, isLoading}) {
  return (
    <>
      <button type='submit' className={`${className} flex justify-center items-center w-full h-[6vh] bg-[#F2505D] rounded-md text-white text-base font-medium hover:bg-[#df3846]`}>
        {isLoading ? <MoonLoader
        color="#ffffff"
        loading={true}
        size={20}
      /> : label}
      </button>
    </>
  )
}
