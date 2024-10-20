import AverageCharge from "./AverageCharge";
import SessionBarChart from "./SessionBarChart";
import HeurePoint from "./HeurePoint";
import { useGetDataByDay } from "../../T_BORD/features/BoxApi";
import useGetDataNoParams from "@/lib/hoocks/useGetDataNoParams";
import { useSelector } from "react-redux";
import { selectSessionDate } from "../features/chartSessionSelector";

export default function SessionChart() {

  const dateSession = useSelector(selectSessionDate)
  console.log(dateSession);
  

  const { data : dataSession, error : errorSession, isPending : loadingSession } = useGetDataByDay('/transaction/graphes_sessions', 'dataSession', dateSession);

  const { data : averageData, error : averageError, isPending : averagePending } = useGetDataNoParams('/transaction/average_duration', 'average');

  const { data : hpData, error : hpError, isPending : hpPending } = useGetDataNoParams('/transaction/heures_de_pointes', 'hp');


  const sessionConfig = {
    nombreSession: {
      label: "nombre de session",
      color: "#F2505D",
    },
    uniqueUsers: {
      label: "Utilisateurs uniques",
      color: "#26BF78",
    },
  };
  return (
    <div className="grid grid-cols-3 gap-6 w-full my-5">
    <div className="col-span-1 flex flex-col gap-6">
        <AverageCharge erreur={averageError} loading={averagePending} minSession={averageData?.min} maxSession={averageData?.max} averageSession={averageData?.avg} />
        <HeurePoint erreur={hpError} loading={hpPending} maxHour={'23:00:00'} minHour={'00:00:00'} averageHour={hpData} />
    </div>
    <div className="col-span-2">
        <SessionBarChart loading={loadingSession} erreur={errorSession} sessionConfig={sessionConfig} data={dataSession} />
    </div>
</div>
  );
}
