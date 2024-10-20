import {
    ArrowsRightLeftIcon, BellIcon, BoltIcon, DocumentPlusIcon, DocumentTextIcon,
    IdentificationIcon, LockClosedIcon, UserCircleIcon, UserGroupIcon
} from '@heroicons/react/16/solid'
import { FaHandsHelping } from "react-icons/fa";
import { HiDocumentCheck } from "react-icons/hi2";
import { FaDollarSign } from "react-icons/fa";
import { AiOutlineGroup } from "react-icons/ai";
// import { TbLogout2 } from "react-icons/tb";
// import { IoMdPersonAdd } from "react-icons/io";
// import { MdLockReset } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { BsFillEvStationFill } from "react-icons/bs";
import BoutonNav from './BoutonNav'
import Logo from "@/assets/logo1.png"

const Nav = ({ setSection }) => {
    return (
        <div className='w-full flex flex-col text-[14px] pl-3 truncate'>
            <div className='mt-2'>
                <img src={Logo} alt="" />
            </div>
            <div onClick={() => setSection('UserProfil')} className=' flex items-center h-[72px] bg-[#919EAB] bg-opacity-10 p-2 rounded-md space-x-2 font-semibold mt-8'>
                <UserCircleIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer text-gray-500" />
                <span>John Doe</span>
            </div>
            <div className=' flex items-center h-[44px] text-[#637381] rounded-md space-x-2 font-semibold mt-8'>
                <BoutonNav IconButton={RiDashboard2Fill} label='Tableau de bord' setSection={setSection} namePage='TableauDeBord' />
            </div>
            <div className='mt-5 font-semibold text-[#637381] '>
                <span className='text-[#4188eb] font-bold ml-4'>ACTIVITE</span>
                <BoutonNav IconButton={LockClosedIcon} label='Autorisations' setSection={setSection} namePage='Autorisations' />
                {/* <BoutonNav IconButton={RiReservedFill} label='Réservations' setSection={setSection} namePage='Réservations' /> */}
                <BoutonNav IconButton={BoltIcon} label='Sessions  de recharge' setSection={setSection} namePage='sessionRecharge' />
                <BoutonNav IconButton={ArrowsRightLeftIcon} label='Transactions' setSection={setSection} namePage='Transaction' />
            </div>
            <div className='mt-5 font-semibold text-[#637381] '>
                <span className='text-[#4188eb] font-bold ml-4 '>GRC</span>
                <BoutonNav IconButton={UserGroupIcon} label='Clients' setSection={setSection} namePage='Clients' />
                <BoutonNav IconButton={IdentificationIcon} label='Etiquettes RFID' setSection={setSection} namePage='EtiquettesRFID' />
                <BoutonNav IconButton={DocumentTextIcon} label='Réçus' setSection={setSection} namePage='Reçus' />
            </div>
            <div className='mt-5 font-semibold text-[#637381] '>
                <span className='text-[#4188eb] font-bold ml-4 '>ACTIFS</span>
                <BoutonNav IconButton={BsFillEvStationFill} label='Points de charges' setSection={setSection} namePage='PointsDecharges' />
                {/* <BoutonNav IconButton={MapPinIcon} label='Locations' setSection={setSection} namePage='Locations' /> */}
                <BoutonNav IconButton={BellIcon} label='CP Notices' setSection={setSection} namePage='CpNotices' />
                <BoutonNav IconButton={DocumentPlusIcon} label='CP Templates' setSection={setSection} namePage='CpTemplates' />
            </div>
            <div className='mt-5 font-semibold text-[#637381] '>
                <span className='text-[#4188eb] font-bold ml-4 '>PARTENAIRES</span>
                <BoutonNav IconButton={FaHandsHelping} label='Partenaires' setSection={setSection} namePage='Partenaires' />
                <BoutonNav IconButton={HiDocumentCheck} label='Contrats' setSection={setSection} namePage='Contrats' />
            </div>
            <div className='mt-5 font-semibold text-[#637381] '>
                <span className='text-[#4188eb] font-bold ml-4 '>TARIFS & VOUCHERS</span>
                <BoutonNav IconButton={AiOutlineGroup} label='Groupes des tarifs' setSection={setSection} namePage='GroupesDestarifs' />
                <BoutonNav IconButton={FaDollarSign} label='Tarifs' setSection={setSection} namePage='Tarifs' />
            </div>
            {/* <div className='mt-5 font-semibold text-[#637381] '>
                <span className='text-[#4188eb] font-bold ml-4 '>AUTHENTIFICATIONS</span>
                <BoutonNav IconButton={TbLogout2} label='Connexion' setSection={setSection} namePage='Connexion' />
                <BoutonNav IconButton={IoMdPersonAdd} label='Inscription' setSection={setSection} namePage='Inscription' />
                <BoutonNav IconButton={MdLockReset} label='Réinitialiser mot de passe' setSection={setSection} namePage='RéinitialiserMotDepasse' />
            </div> */}
        </div>
    )
}
export default Nav