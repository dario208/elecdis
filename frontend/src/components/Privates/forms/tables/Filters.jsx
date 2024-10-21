import { Input } from "@/components/ui/input.jsx";
import { IoSearchOutline } from "react-icons/io5";
const Filters = ({ value, onChange }) => {
    return (
        <div className="ml-5 w-1/4 p-1  flex space-x-2 items-center border rounded-sm  max-md:w-full">
            <div className="text-[#919EAB]"><IoSearchOutline /></div>
            <Input type="text" className="focus-visible:ring-0 focus-visible:ring-white border-none h-[30px]"
                value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search..." />
        </div>
    )
}

export default Filters