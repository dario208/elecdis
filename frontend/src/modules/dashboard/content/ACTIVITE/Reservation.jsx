import BoutonAdd from '../../component/BoutonAdd'

const Reservation = () => {
    // const handleClick = () => alert("hello");
    return (
        <div>
            <div className='flex justify-between m-1'>
                <span className=' text-[24px] text-[#212B36]'>Réservations</span>
                <BoutonAdd action={handleClick} />
            </div>
        </div>
    )
}
export default Reservation 