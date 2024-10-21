import { useState } from 'react';
import BoutonAdd from '../../component/BoutonAdd'
import AddClient from './components/AddClient';
import DataTableUser from './components/DataTableUser';

const Clients = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <div className='flex justify-between m-1'>
                <span className=' text-[24px] text-[#212B36]'>Liste des clients</span>
                {/* <BoutonAdd Composant={AddClient} open={open} setOpen={setOpen} /> */}
            </div>

            <DataTableUser />
        </div>
    )
}

export default Clients