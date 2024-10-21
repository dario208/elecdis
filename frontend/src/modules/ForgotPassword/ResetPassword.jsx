import { useState } from "react";
import Boutton from "../Login/components/Boutton";
import Logo from "@/assets/logo1.png"
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [isFocused, setIsFocused] = useState(false);
  const [val, setValue] = useState('');
  const handleValue = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="max-sm:shadow-none w-[400px] 2xl:w-[500px] shadow-xl p-6 bg-white rounded-lg">
        <div className="flex items-center justify-center w-full p-3">
          <img src={Logo} className="w-[40%] h-auto" alt="" />
        </div>
        <h2 className="mb-6 text-xl text-center text-importantText">Réinitialiser votre mot de passe</h2>

        <p className="text-center text-simpleText">
          Saisissez un nouveau mot de passe ci-dessous pour modifier votre mot de passe.
        </p>
        <div className="relative w-full mt-4">
          <input
            id="email"
            type="email"
            className={`peer w-full h-[6vh] rounded-md border-solid border-[#CDCBCB] border-[0.5px] indent-2 text-[#5a5858] text-base focus:outline-none focus:border-[#F2505D] mb-4`}
            value={val}
            onChange={handleValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => (val ? setIsFocused(true) : setIsFocused(false))}
          />
          <label
            htmlFor="email"
            className={`absolute left-2 text-base bg-white  px-2 py-0 transition-all duration-300 transform ${isFocused
              ? "-translate-y-3 scale-90 text-[#F2505D]"
              : "max-sm:translate-y-[1vh] translate-y-[1.2vh] 2xl:translate-y-5 scale-100 text-simpleText"
              }`}
          >
            Nouveau mot de pass*
          </label>
        </div>
        <div className="relative w-full">
          <input
            id="email"
            type="email"
            className={`peer w-full h-[6vh] rounded-md border-solid border-[#CDCBCB] border-[0.5px] indent-2 text-[#5a5858] text-base focus:outline-none focus:border-[#F2505D] mb-4`}
            value={val}
            onChange={handleValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => (val ? setIsFocused(true) : setIsFocused(false))}
          />
          <label
            htmlFor="email"
            className={`absolute left-2 text-base bg-white  px-2 py-0 transition-all duration-300 transform ${isFocused
              ? "-translate-y-3 scale-90 text-[#F2505D]"
              : "max-sm:translate-y-[1vh] translate-y-[1.2vh] 2xl:translate-y-5 scale-100 text-simpleText"
              }`}
          >
            Saisir à nouveau le nouveau mot de pass*
          </label>
        </div>
        <Link to="/emailSend"><Boutton label="Réinitialiser le mot de pass" /></Link>
      </div>
    </div>
  );
}
