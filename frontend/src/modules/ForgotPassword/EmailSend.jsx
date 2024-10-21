import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";

export default function EmailSend() {
  const [isFocused, setIsFocused] = useState(false);
  const [val, setValue] = useState('');
  const handleValue = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="max-sm:shadow-none w-[400px] 2xl:w-[500px] shadow-xl p-6 bg-white rounded-lg">
        <div className="w-full flex justify-center items-center p-3">
            <MdOutlineEmail color="#F2505D" className="w-[20%] h-auto" />
        </div>
        <h2 className="text-center text-importantText text-xl mb-6">Vérifiez votre adresse e-mail</h2>

        <p className="text-center text-simpleText">
        Veuillez consulter l'adresse e-mail kevinrakoto77@gmail.com pour savoir comment réinitialiser votre mot de passe.
        </p>
        <div className="w-full relative mt-4">
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
            className={`absolute left-2 text-base bg-white  px-2 py-0 transition-all duration-300 transform ${
              isFocused
                ? "-translate-y-3 scale-90 text-[#F2505D]"
                : "max-sm:translate-y-[1vh] translate-y-[1.2vh] 2xl:translate-y-5 scale-100 text-simpleText"
            }`}
          >
            Adresse email*
          </label>
        </div>
        <button className="text-gray-500 hover:text-simpleText bg-gray-100 border-gray-400 hover:bg-gray-200 w-full h-[6vh] rounded-md text-base font-medium">Renvoyer un email*</button> 
      </div>
    </div>
  );
}
