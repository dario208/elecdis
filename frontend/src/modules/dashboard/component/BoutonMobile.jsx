import { Context } from '@/common/config/configs/Context';
import { useContext } from 'react';

const BoutonMobile = ({ IconButton, label, setSection, namePage }) => {
    const { isActive, setActive, closeNav } = useContext(Context);

    const css = "bg-opacity-60 flex text-white  items-center space-x-2 rounded-md hover:text-[#F2505D] hover:shadow-sm nav-link-mobile";

    return (
        <button className={isActive === namePage ? (css + 'text-[#F2505D] nav-link-mobile ') : (css)}
            onClick={() => {
                setSection(namePage);
                setActive(namePage);
                closeNav();

            }}>
            {IconButton && <IconButton className="w-[1.5rem] h-[1.5rem]" />}
            <span>{label}</span>
        </button>
    );
}

export default BoutonMobile;
