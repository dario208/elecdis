import UserIcon from "@/assets/userIcone.png";
import { FiPhone } from "react-icons/fi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineSubscriptions } from "react-icons/md";
import { LiaHandshakeSolid } from "react-icons/lia";
import { FiMail } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import InfoUser from "./InfoUser";
import UserInfoCoordonner from "./UserInfoCoordonner";
import TransactionList from "@/modules/dashboard/content/ACTIVITE/components/TransactionList";
import { useState } from "react";
import SessionTable from "@/modules/dashboard/content/ACTIVITE/components/SessionTable";
import UserTableSpecificRFID from "./UserTableSpecificRFID";
import useGetDataNoParams from "@/lib/hoocks/useGetDataNoParams";
import { PulseLoader } from "react-spinners";
function UserProfil({id}) {
  const dataTransactionHistorique = [
    {
        id: "TXN001",
        client: "John Doe",
        montant: 50.00,
        date: "2024-10-05",
        heure: "14:35",
        type: "Recharge",
        methode: "Carte de crédit",
        statut: "Success",
      },
      {
        id: "TXN001",
        client: "John Doe",
        montant: 50.00,
        date: "2024-10-03",
        heure: "14:35",
        type: "Recharge",
        methode: "Carte de crédit",
        statut: "Success",
      },
      {
        id: "TXN001",
        client: "John Doe",
        montant: 50.00,
        date: "2024-10-10",
        heure: "14:35",
        type: "Recharge",
        methode: "Carte de crédit",
        statut: "Success",
      },
      
]
const {data, error, isPending} = useGetDataNoParams(`/users/profile/${12}`, 'specific_user')


const [affiche, setAffiche] = useState("RFID")
const handleChangeAffichage = (name) => {
    setAffiche(name)
}
if(isPending)
  {
    return <PulseLoader color="#F2505D" />
  }
if(error)
{
  return <p>Erreur...</p>
}
  return (
    <div className="w-full p-6 relative">
      <h2 className="text-[#212B36] text-xl mb-10">Information {data.user.role}</h2>
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start gap-6 items-center">
          <div className="w-[20%]">
            <img
              src={UserIcon}
              className="w-[100%] h-auto rounded-full border-[#637381] border-4"
              alt=""
            />
          </div>
          <div className="w-[40%] flex justify-start items-center gap-6 flex-col">
            <h3 className="text-[#637381] font-bold text-[1.2vw] w-full">
              {data.user.first_name + " " + data.user.last_name}
            </h3>
            <div className="w-full flex justify-between items-center gap-6">
             <InfoUser Title="Recharge" Value={data.user.nombre_recharges} />
             <InfoUser Title="Energie Totale" Value={data.user.energie_recharge_total} />
             <InfoUser Title="Temps total" Value={data.user.temps_recharge_total} />
            </div>
          </div>
        </div>
        <button className="bg-[#F9FAFB] p-1 flex items-center justify-center gap-2 text-[#637381] border-[#637381] border-2 rounded-sm">
          Modifier
          <FiEdit size={14} color="#212B36" />
        </button>
      </div>
      <div className="w-full grid grid-cols-3 text-[#637381] gap-4 items-center bg-[#F9FAFB]">
        <button onClick={()=>handleChangeAffichage("RFID")} className="hover:bg-slate-100 border-r-4 p-2">RFID</button>
        <button onClick={()=>handleChangeAffichage("historyTransaction")} className="hover:bg-slate-100 border-r-4 p-2">Historique de transaction</button>
        <button onClick={()=>handleChangeAffichage("historySession")} className="hover:bg-slate-100 p-2">Historique de sessions</button>
      </div>
      <div className="mt-4 w-full grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-[#F9FAFB] p-6">
          <div className="w-full mb-5 flex justify-start gap-2 items-center text-[#637381]">
            <IoInformationCircleOutline size={24} />
            <p className="text-[18px]">A propos</p>
          </div>
          <UserInfoCoordonner Icone={FiPhone} Value={data.user.phone} />
          <UserInfoCoordonner Icone={FiMail} Value={data.user.email} />
          <UserInfoCoordonner Icone={MdOutlineSubscriptions} Value={data.user.subscription} />
          <UserInfoCoordonner Icone={LiaHandshakeSolid} Value={data.user.partner === null ? "not a partner" : data.user.partner} />
        </div>
        <div className="col-span-2 bg-[#F9FAFB] p-6">
          {affiche == "RFID" && <UserTableSpecificRFID id={12} />}
          {affiche == "historyTransaction" && <TransactionList transactionsData={dataTransactionHistorique} />}
          {affiche == "historySession" && <SessionTable />}
        </div>
      </div>
    </div>
  );
}

export default UserProfil;
