import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const BoutonAdd = ({ open, Composant, setOpen }) => {
    return (
        <div>
            <button onClick={() => setOpen(n => !n)}
                className=' text-white  h-[45px] bg-[#212B36] hover:bg-[#0d1216] p-5 flex items-center font-semibold max-md:text-sm test-[14px]  rounded-md space-x-2'>
                <FaPlus className='w-[1.3rem] h-[1.3rem]' />

                <span>Ajouter nouveau</span>
            </button>
            {open && (
                <div className="flex">
                    <Composant setOpen={setOpen} />
                    <span
                        className="fixed z-50 cursor-pointer top-5 right-5"
                        onClick={() => setOpen(n => !n)}
                    >
                        <IoMdClose className="text-white hover:text-amber-400" size={50} />
                    </span>

                </div>)}
        </div>

    )
}

export default BoutonAdd