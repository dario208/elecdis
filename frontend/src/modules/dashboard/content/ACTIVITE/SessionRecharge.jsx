import SessionChart from "./components/SessionChart";
import SessionTable from "./components/SessionTable";
const SessionRecharge = () => {
  return (
    <div className="w-full h-auto p-6">
      <h2 className="text-[#212B36] text-xl mb-6">Session de recharge</h2>
      <SessionChart /> 
      <SessionTable />
    </div>
  );
};

export default SessionRecharge;
