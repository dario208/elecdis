import { XMarkIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { RiDashboard2Fill } from "react-icons/ri";
import BoutonMobile from "./BoutonMobile";
import { FaHandsHelping } from "react-icons/fa";
import { HiDocumentCheck } from "react-icons/hi2";
import { FaDollarSign } from "react-icons/fa";
import { AiOutlineGroup } from "react-icons/ai";
import { BsFillEvStationFill } from "react-icons/bs";
import { RiReservedFill } from "react-icons/ri";
import {
    ArrowsRightLeftIcon, BellIcon, BoltIcon, DocumentPlusIcon, DocumentTextIcon,
    IdentificationIcon, LockClosedIcon, UserGroupIcon
} from '@heroicons/react/16/solid'
import { Context } from "@/common/config/configs/Context";

const MobileNav = ({ setSection }) => {
    const { nav, closeNav, } = useContext(Context);
    const animation = nav ? "translate-x-0" : "translate-x-[-100%]";

    return (
        <div
            className={` absolute ${animation} h-[100vh] transform transition-all duration-300 top-0 left-0 right-0 bottom-0 z-[10000] bg-[#09101a] backdrop-blur-md flex justify-center `}
            style={{ backgroundColor: "rgba(9, 16, 26, 0.7)" }}>

            <div className="flex items-center justify-center w-full ">
                <div className="overflow-auto custom-scrollbar  h-[100vh]">
                    <BoutonMobile IconButton={RiDashboard2Fill} label='Tableau de bord' setSection={setSection} namePage='TableauDeBord' />
                    <BoutonMobile IconButton={LockClosedIcon} label='Autorisations' setSection={setSection} namePage='Autorisations' />
                    <BoutonMobile IconButton={RiReservedFill} label='Réservations' setSection={setSection} namePage='Réservations' />
                    <BoutonMobile IconButton={BoltIcon} label='Sessions  de recharge' setSection={setSection} namePage='sessionRecharge' />
                    <BoutonMobile IconButton={ArrowsRightLeftIcon} label='Transactions' setSection={setSection} namePage='Transaction' />
                    <BoutonMobile IconButton={UserGroupIcon} label='Users' setSection={setSection} namePage='Users' />
                    <BoutonMobile IconButton={IdentificationIcon} label='Etiquettes RFID' setSection={setSection} namePage='EtiquettesRFID' />
                    <BoutonMobile IconButton={DocumentTextIcon} label='Réçus' setSection={setSection} namePage='Reçus' />
                    <BoutonMobile IconButton={BsFillEvStationFill} label='Points de charges' setSection={setSection} namePage='PointsDecharges' />
                    <BoutonMobile IconButton={BellIcon} label='CP Notices' setSection={setSection} namePage='CpNotices' />
                    <BoutonMobile IconButton={DocumentPlusIcon} label='CP Templates' setSection={setSection} namePage='CpTemplates' />
                    <BoutonMobile IconButton={FaHandsHelping} label='Partenaires' setSection={setSection} namePage='Partenaires' />
                    <BoutonMobile IconButton={HiDocumentCheck} label='Contrats' setSection={setSection} namePage='Contrats' />
                    <BoutonMobile IconButton={AiOutlineGroup} label='Groupes des tarifs' setSection={setSection} namePage='GroupesDestarifs' />
                    <BoutonMobile IconButton={FaDollarSign} label='Tarifs' setSection={setSection} namePage='Tarifs' />
                    
                </div>
            </div>

            <div
                onClick={closeNav}
                className="absolute cursor-pointer top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-yellow-400"
            >
                <XMarkIcon />
            </div>
        </div>
    );
};
export default MobileNav;