import { forwardRef, useState, useEffect, useRef } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Importation des icônes

// eslint-disable-next-line react/display-name
const Input = forwardRef(({ id, type = 'text', value = '', onChange, label }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe
  const inputRef = ref || useRef(null);

  useEffect(() => {
    if (value && inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  }, [value, inputRef]);

  const hasValue = Boolean(value);

  // Fonction pour basculer l'affichage du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type === 'password' && showPassword ? 'text' : type} // Change le type à 'text' si showPassword est true
        ref={inputRef}
        className="peer input-style pr-10" // Ajoute de l'espace à droite pour l'icône
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <label
        htmlFor={id}
        className={`absolute left-2 text-base bg-white px-2 py-0 transition-all duration-300 transform ${isFocused || hasValue
          ? '-translate-y-3 scale-90 text-[#F2505D]'
          : 'max-sm:translate-y-[1vh] translate-y-[1.2vh] 2xl:translate-y-[1rem] scale-100 text-simpleText'
          }`}
      >
        {label}
      </label>

      {/* Ajout de l'icône œil pour afficher/masquer le mot de passe */}
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="h-5 w-5" /> // Icône pour cacher le mot de passe
          ) : (
            <AiOutlineEye className="h-5 w-5" /> // Icône pour afficher le mot de passe
          )}
        </button>
      )}
    </div>
  );
});

export default Input;
