import OpenStreetMap from "@/modules/Station/OpenStreetMap";
import BoxSection from "./components/BoxSection";
import ChartSection from "./components/ChartSection";

const TableauDeBord = ({setSection}) => {

  return (
    <div className="w-full h-auto p-6">
      <h2 className="text-[#212B36] text-xl mb-6">Accueil/Tableau de bord</h2>
      <BoxSection setSection={setSection} />
      <ChartSection />
      <div className="w-ful">
        <OpenStreetMap />
      </div>
    </div>
  );
};

export default TableauDeBord;
