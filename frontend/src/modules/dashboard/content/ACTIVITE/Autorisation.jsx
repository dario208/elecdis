import BoutonAdd from '../../component/BoutonAdd';
import AutorisationTable from '../../component/AutorisationTable';
import AddAdmin from './components/AddAdmin';
import { useState } from 'react';


const Autorisation = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className='p-6 '>
            <div className='flex justify-between mb-6'>
                <span className=' text-[24px] text-[#212B36]'>Personnels</span>
                <BoutonAdd open={open} setOpen={setOpen} Composant={AddAdmin} />
            </div>
            <AutorisationTable />
        </div>
    )
}
export default Autorisation