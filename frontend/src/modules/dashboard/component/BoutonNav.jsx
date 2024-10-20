import { Context } from '@/common/config/configs/Context';
import { useContext } from 'react';

const BoutonNav = ({ IconButton, label, setSection, namePage }) => {
    const { isActive, setActive } = useContext(Context);
    const css = "flex items-center h-[50px] bg-opacity-60 p-2 rounded-md space-x-2 hover:shadow-[#e4dfdf] hover:text-[#F2505D] hover:shadow-sm hover:bg-[#ffebeb] w-full ";
    return (
        <button className={isActive === namePage ? (css + 'bg-[#ffebeb] text-[#F2505D]') : (css)}
            onClick={() => {
                setSection(namePage);
                setActive(namePage);
            }}>
            {IconButton && <IconButton className="w-[1.5rem] h-[1.5rem] cursor-pointer" />}
            <span>{label}</span>
        </button>
    );
}

export default BoutonNav;