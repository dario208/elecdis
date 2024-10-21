import { useContext, useEffect, useState } from "react";
import { Context } from "@/common/config/configs/Context";
import { usePercent } from "@/lib/hoocks/usePercent";
import { YEARLABEL } from "@/_mock/constant";
import DonuteChart from "./DonuteChart";
import StatistiqueBarChart from "./StatistiqueBarChart";
import { DONUTECHARTCONFIG } from "../config/DonutChartConfig";
import { STATISTIQUECONF } from "../config/StatistiqueConfig";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
export default function ChartSection() {
  const { filters, filterYear } = useContext(Context);

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

  const {
    data: monthData,
    error: errorMonth,
    isPending: monthLoading,
  } = useQuery({
    queryKey: ["monthDataChart", filterYear],
    queryFn: () =>
      axiosInstance
        .get(`/cp/graph_conso_energie/?CurrentYear=${filterYear}`)
        .then((res) => res.data),
    refetchInterval: 5000,
  });

  const {
    data: trimestreDataQuery,
    error: errorTrimestre,
    isPending: trimestreLoading,
  } = useQuery({
    queryKey: ["trimestreDataChart", filterYear],
    queryFn: () =>
      axiosInstance
        .get(`/cp/graph_trimestriel_conso_energie/?CurrentYear=${filterYear}`)
        .then((res) => res.data),
    refetchInterval: 5000,
  });

  const {
    data: semestreData,
    error: errorSemestre,
    isPending: semestreLoading,
  } = useQuery({
    queryKey: ["semestreDataChart", filterYear],
    queryFn: () =>
      axiosInstance
        .get(`/cp/graph_semestriel_conso_energie/?CurrentYear=${filterYear}`)
        .then((res) => res.data),
    refetchInterval: 5000,
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
 
  if (errorDonute || errorMonth || errorSemestre || errorTrimestre) {
    Swal.fire({
      title: "Oops !",
      icon: "error",
      text: "Une erreur est survenue, veuillez réessayer plus tard",
    });
    return null;
  }

  return (
    <div className="grid max-sm:grid-cols-1 max-sm:place-items-center grid-cols-3 gap-6 w-full my-5 h-full">
      <div className="col-span-1 max-sm:w-full h-full">
        <DonuteChart
          chartConfig={DONUTECHARTCONFIG}
          chartData={donuteData}
          title="Statut des connecteurs"
          label="Connecteurs"
          className="w-full p-5 flex flex-col shadow-combined rounded-xl bg-pink-300 h-full"
        />
      </div>
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
  );
}
