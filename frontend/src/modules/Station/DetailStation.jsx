
import { FaRegCheckCircle } from "react-icons/fa";
import { RiChargingPile2Line } from "react-icons/ri";
import { BiLoaderCircle, BiSolidSend } from "react-icons/bi";
import { CgUnavailable } from "react-icons/cg";
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { IoPlayOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import StatistiqueBarChart from "../dashboard/content/T_BORD/components/StatistiqueBarChart";
import { Context } from "@/common/config/configs/Context";
import { usePercent } from "@/lib/hoocks/usePercent";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import { STATISTIQUECONF } from "../dashboard/content/T_BORD/config/StatistiqueConfig";
import { YEARLABEL } from "@/_mock/constant";


function DetailStation({ IdStation }) {

    const { filters, filterYear } = useContext(Context);
    const [isStart, setIsStart] = useState(false);
    const [idTag, setITag] = useState('');
    const {
        data: donuteData,
        error: errorDonute,
        isPending: loadingDonute,
      } = useQuery({
        queryKey: ["donuteChart"],
        queryFn: () =>
          axiosInstance
            .get("/connector/graph_connector_status")
            .then((res) => res.data),
        refetchInterval: 1000,
      });

    /**
     *  GrapheMensuel
     */

    const {
        data: monthData,
        error: errorMonth,
        isPending: monthLoading,
      } = useQuery({
        queryKey: ["monthDataChart"],
        queryFn: () =>
          axiosInstance
            .get(`/cp/graph_conso_energie_status/${IdStation}?CurrentYear=${filterYear}`)
            .then((res) => res.data),
        refetchInterval: 5000,
      });

      /**
       * GrapheTrimestriel
       */

      const {
        data: trimestreDataQuery,
        error: errorTrimestre,
        isPending: trimestreLoading,
      } = useQuery({
        queryKey: ["trimestreDataChart"],
        queryFn: () =>
          axiosInstance
            .get(`/cp/graph_trimestriel_conso_energie_status/${IdStation}/?CurrentYear=${filterYear}`)
            .then((res) => res.data),
        refetchInterval: 5000,
      });
      /**
       * GrapheSemestriel
       */
      const {
        data: semestreData,
        error: errorSemestre,
        isPending: semestreLoading,
      } = useQuery({
        queryKey: ["semestreDataChart"],
        queryFn: () =>
          axiosInstance
            .get(`/cp/graph_semestriel_conso_energie_status/${IdStation}/?CurrentYear=${filterYear}`)
            .then((res) => res.data),
        refetchInterval: 5000,
      });



    const { isPending: isrepostat, data: adminData, error: errorStat } = useQuery({
        queryKey: ['repoStat', IdStation],
        queryFn: () => axiosInstance.get(`/cp/read_cp/${IdStation}`)
            .then((res) => res.data),
        refetchInterval: 1000,
    });
    const { refetch: remoteStart, isPending: ispost, data: dataStart, error: errorStart } = useQuery({
        queryKey: ['start', IdStation, idTag, adminData],
        queryFn: () => axiosInstance.post(`/cp/send_remoteStartTransaction/${IdStation}/${idTag}/${adminData[0].id_connecteur}`)
            .then((res) => res.data),
        enabled: false,
    });

    const isLoading =
    loadingDonute || monthLoading || trimestreLoading || semestreLoading;
  const [trimestreData, setTrimestreData] = useState(trimestreDataQuery || []);
  const [semestredata, setSemestreData] = useState(semestreData || []);
  const [statistiqueData, setStatistiqueData] = useState(monthData || []);
  const [percentData, setPercentData] = useState(monthData || []);
  useEffect(() => {
    if (filterYear) {
      setTrimestreData(trimestreDataQuery);
      setSemestreData(semestreData);
    }
  }, [filterYear, filters, trimestreDataQuery, semestreData]);
  useEffect(() => {
    if (filters.bar === "Annuel") {
      setStatistiqueData(monthData);
      setPercentData(monthData);
    } else if (filters.bar === "Trimestriel") {
      setStatistiqueData(trimestreData);
      setPercentData(trimestreData);
    } else if (filters.bar === "Semestriel") {
      setStatistiqueData(semestredata);
      setPercentData(semestredata);
    } else {
      setStatistiqueData(monthData);
      setPercentData(monthData);
    }
  }, [filters, filterYear, monthData, trimestreData, semestredata]);

  const { percentVal } = usePercent(percentData);

  const [litleDescri, setlitleDescri] = useState(null);

  useEffect(() => {
    if (filters.bar === "Annuel" || filters.bar === "Mensuel") {
      if (percentVal === "∞") {
        setlitleDescri(
          <div className="w-full flex items-center gap-1 text-[14px] text-[#637381]">
            Augmentation infinie par rapport à l'année dernière
          </div>
        );
      } else {
        setlitleDescri(
          <div className="w-full flex items-center gap-1 text-[14px] text-[#637381]">
            {percentVal} que l'année dernière
          </div>
        );
      }
    } else {
      setlitleDescri(null);
    }
  }, [filters, percentVal]);
  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <PulseLoader color="#3498db" size={15} />
      </div>
    );
  }
  if (errorDonute || errorMonth || errorSemestre || errorTrimestre) {
    Swal.fire({
      title: "Oops !",
      icon: "error",
      text: "Une erreur est survenue, veuillez réessayer plus tard",
    });
    return null;
  }

    console.log(adminData)

    if (isrepostat) {
        return (<p>Loading</p>)
    }
    if (errorStat || errorStart) {
        return (<p>error</p>)
    }




    return (
        <div className="container h-screen">
            {/* {adminData.map((item,index)=>( */}
                <div
                className="text-[#637381] grid grid-cols-3 max-md:grid-cols-1 mb-6 pt-10 gap-6 max-sm:grid-cols-1 max-sm:p-4 max-md:mt-[50px] mt-[50px]">
                <div className="text-[#637381] col-span-1 bg-[#ffffff] shadow-lg rounded-2xl p-6 ">
                    <h1 className="text-2xl font-bold text-red-600 text-start">Stations</h1>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-gray-800 text-start ">
                        <div>
                            <p>Modele</p>
                            <p>Marque</p>
                            <p>Numero de serie</p>
                            <p>Location</p>
                        </div>

                        <div>
                            <p className="truncate">{adminData[0].charge_point_model}</p>
                            <p className="truncate"> {adminData[0].charge_point_vendors}</p>
                            <p className="truncate">{adminData[0].id_charge_point}</p>
                            <p className="truncate">{adminData[0].adresse}</p>
                            {/* <p>Andraharo</p> */}
                        </div>
                        
                    </div>
                </div>
                <div className="col-span-2 bg-[#ffffff] shadow-lg rounded-2xl max-sm:col-span-1">
                    <div className="grid grid-cols-2 p-4 max-md:grid-cols-1 max-md:w-full">
                        {adminData.map((item,index)=>(
                            <div key={index}>
                            <div className="flex items-start justify-center gap-4 ">
                                {
                                    (item.status_connector === "Unavailable" || item.status_connector === "unavalaible") && (
                                        <div className="flex space-x-5">
                                            <div>
                                                <CgUnavailable color="#F44336" size={117} />
                                                <p className="text-[#F44336] font-bold mt-2 ">{item.status_connector}</p>
                                            </div>
                                            <div className="text-center">
                                                <h1 className="mb-2 font-medium text-center">Connecteur {item.id_connecteur}</h1>
                                                <div
                                                    className="flex flex-col items-center justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r from-red-200 to-red-300">
                                                    <p>Energie</p>
                                                    <p>{item.energie_delivre} Wh</p>
                                                </div>
                                            </div>
                                        </div>)
                                }

                                {
                                    (item.status_connector === "SuspendedEVSE" || item.status_connector === "suspendedEVSE") && (
                                        <div className="flex space-x-5">
                                            <div>
                                                <CgUnavailable color="#F44336" size={117} />
                                                <p className="text-[#F44336] font-bold mt-2 ">{item.status_connector}</p>
                                            </div>
                                            <div className="text-center">
                                                <h1 className="mb-2 font-medium text-center">Connecteur {item.id_connecteur}</h1>
                                                <div
                                                    className="flex flex-col items-center justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r from-red-200 to-red-300">
                                                    <p>Energie</p>
                                                    <p>{item.energie_delivre} Wh</p>
                                                </div>
                                            </div>
                                        </div>)
                                }
                                {
                                    (item.status_connector === "available" || item.status_connector === "Available") && (
                                        <div className="flex space-x-5">
                                            <div>
                                                <FaRegCheckCircle color="#4CAF50" size={117} />
                                                <p className="text-[#4CAF50] font-bold mt-2 ">Connecteur {item.id_connecteur}</p>
                                            </div>
                                            <div className="text-center">
                                                <h1 className="mb-2 font-medium text-center">Connecteur {item.id_connecteur}</h1>
                                                <div
                                                    className="flex flex-col items-center justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r from-green-200 to-green-300">
                                                    <p>Energie</p>
                                                    <p>{item.energie_delivre} Wh</p>
                                                </div>
                                            </div>
                                        </div>)
                                }
                                {
                                    (item.status_connector === "charging" || item.status_connector === "Charging") && (
                                        <div className="flex space-x-5">
                                            <div>
                                                <RiChargingPile2Line color="#2196F3" size={117} />
                                                <p className="text-[#2196F3] font-bold mt-2 ">{item.status_connector}</p>
                                            </div>
                                            <div className="text-center">
                                                <h1 className="mb-2 font-medium text-center">Connecteur {item.id_connecteur}</h1>
                                                <div
                                                    className="flex flex-col items-center justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r from-blue-200 to-blue-300">
                                                    <p>Energie</p>
                                                    <p>{item.energie_delivre} Wh</p>
                                                </div>
                                            </div>
                                        </div>)
                                }{
                                    (item.status_connector === "preparing" || item.status_connector === "Preparing") && (
                                        <div className="flex space-x-5">
                                            <div>
                                                <BiLoaderCircle color="#2196F3" size={117} />
                                                <p className="text-[#2196F3] font-bold mt-2 ">{item.status_connector}</p>
                                            </div>
                                            <div className="text-center">
                                                <h1 className="mb-2 font-medium text-center">Connecteur {item.id_connecteur}</h1>
                                                <div
                                                    className="flex flex-col items-center justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r from-blue-200 to-blue-300">
                                                    <p>Energie</p>
                                                    <p>{item.energie_delivre} Wh</p>
                                                </div>
                                            </div>
                                        </div>)
                                }
                            </div>
                        </div>
                        ))}
                        
                        {/* <div>

                            <div className="flex items-start justify-center gap-4 ">
                                <div>
                                    <IoMdAddCircleOutline color="#2196F3" size={117} />
                                    <p className="text-[#53A7E3] font-bold mt-2 ">En Charge</p>
                                </div>
                                <div className="text-center">
                                    <h1 className="mb-2 font-medium">Connecteur 3</h1>
                                    <div
                                        className="flex flex-col items-center justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r from-blue-200 to-blue-300">
                                        <p>Energie</p>
                                        <p>209 Wh</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* ))} */}
            
            <div
                className="text-[#637381] bg-[#ffffff] shadow-lg border rounded-2xl max-md:place-items-center grid grid-cols-3 max-sm:grid-cols-1 max-sm:p-4 gap-6">

                <div className="w-full col-span-1 p-6 text-gray-800 rounded-2xl ">
                    <h1 className="text-2xl font-bold text-red-600 text-start">Websocket</h1>
                    <div className="grid w-full grid-cols-2 gap-4 mt-2 text-start max-md:gap-6">
                        <div>
                            <p>Backend URL:</p>
                            <p>Chargeur Box ID:</p>
                            <p>Cle d&apos;autorisation:</p>
                            <p>Certificat CA:</p>
                            <p>Ping intervalle:</p>
                            <p>Intervalle de reconnection:</p>
                        </div>
                        <div>
                            <p>ws://localhost:9220</p>
                            <p>Chargeur-1</p>
                            <p>EV98jh</p>
                            <p>TEST</p>
                            <p>5</p>
                            <p>10</p>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>

                <div className="text-[#fefefe] col-span-1 rounded-2xl p-6 w-full ">
                    <h1 className="text-2xl font-bold text-red-600 text-start">Firmware</h1>
                    <div className="grid w-full grid-cols-1 gap-4 mt-2 text-gray-800 text-start max-md:gap-6">
                        <div className="flex gap-4">
                            <div>
                                <p>Systeme d'exploitation:</p>
                                <p>Protocole ocpp:</p>
                            </div>
                            <div>
                                <p>Ubuntu 22.04 LTS</p>
                                <p>1.6</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-[#fefefe]  rounded-2xl p-6 w-full  ">
                    <h1 className="text-2xl font-bold text-red-600 text-start">Urgence</h1>
                    <div className="grid w-full grid-cols-1 gap-4 mt-2 text-gray-800 text-start max-md:gap-6">
                        <div className="flex gap-8">
                            <button className="text-[#4CAF50]" onClick={() => setIsStart(isstart => !isstart)}>
                                <IoPlayOutline size={50} />
                            </button>

                            {isStart ? (
                                <div className="flex space-x-2 transition-opacity duration-300 ease-in-out border-b opacity-100 animate-fade-in">
                                    <input
                                        onChange={(e) => setITag(e.target.value)}
                                        placeholder="Id Tag"
                                        className="text-xl h-[50px] p-1 outline-none"
                                        type="text"
                                    />
                                    <button onClick={() => {
                                        remoteStart();
                                        setIsStart(false); // Close input after sending
                                    }}>
                                        <BiSolidSend size={30} />
                                    </button>
                                </div>
                            ) : null}
                        </div>

                    </div>
                </div>
            </div>
            <div className="text-[#fefefe] col-span-1 rounded-2xl py-6">
                <h1 className="text-2xl font-bold text-red-600 text-start">Statistiques</h1>
                {/* <ChartSection /> */}
                <div className="col-span-2 max-sm:w-full max-sm:col-span-1 h-full">
        <StatistiqueBarChart
          chartData={statistiqueData}
          statiStiqueConfig={STATISTIQUECONF}
          description={litleDescri}
          listFilterYearly={YEARLABEL}
          title="Énergie délivrée par kWh"
          loading={isLoading}
          className="h-full"
        />
      </div>
            </div>
        </div>
    );
}

export default DetailStation;