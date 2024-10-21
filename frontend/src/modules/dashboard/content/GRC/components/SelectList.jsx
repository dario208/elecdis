import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { IoSearch } from "react-icons/io5";


const SelectList = React.forwardRef(({ id, label, value, type = "text", onChange, datas }, forwardedRef) => {
    const [isFocused, setIsFocused] = useState(false);
    const [selectValue, setSelectValue] = useState();
    const [selectedLabel, setSelectedLabel] = useState(value); // Pour afficher la valeur sélectionnée
    const [searchTerm, setSearchTerm] = useState("");  // État pour le champ de recherche
    const inputRef = useRef();

    // search
    const [isActive, setActive] = useState(false);

    // Gestion du changement de sélection (on récupère l'ID et affiche le label)
    const handleSelectChange = (newId) => {
        const selectedItem = datas.find(item => item.id === newId);
        if (selectedItem) {
            setSelectValue(newId);          // On stocke l'ID sélectionné
            setSelectedLabel(selectedItem.type_subscription);  // On affiche la valeur (label)
            onChange?.(newId);              // On retourne l'ID avec onChange
        }
    };

    // Filtrage des éléments selon le terme de recherche
    const filteredData = datas.filter((item) =>
        item.type_subscription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (type === "select") {
        return (
            <div className="relative flex justify-between w-full">

                <div className="w-full">
                    <Select
                        onValueChange={handleSelectChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(selectValue !== "")}
                        className={`block w-full px-2.5 pb-2.5 pt-4 text-md bg-transparent border rounded-lg appearance-none focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus:border-primaryText peer ${isFocused || selectValue ? "border-primaryChart" : "border-gray-300"
                            }`}
                    >
                        <SelectTrigger id="status" className={`mt-1 focus:ring-0 bg-transparent border focus:ring-offset-0 h-[60px] ${isFocused || selectValue ? "border-primaryChart" : "border-gray-300"}`}>
                            {/* On affiche la valeur (label) sélectionnée */}
                            <SelectValue placeholder={value}>
                                {selectedLabel}
                            </SelectValue>
                        </SelectTrigger>

                        {/* Ajout du champ de recherche */}
                        {isActive && (
                            <Input
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full px-2.5 py-2 text-md border-b border-gray-300 focus:outline-none mt-4"
                            />
                        )}

                        <SelectContent className="focus:outline-none focus-visible:ring-white">
                            {/* Afficher les éléments filtrés */}
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    // On utilise l'ID comme valeur
                                    <SelectItem value={item.id} key={item.id}>
                                        {item.type_subscription}
                                    </SelectItem>
                                ))
                            ) : (
                                <p className="px-2 py-2 text-sm text-gray-500">Aucun résultat trouvé</p>
                            )}
                        </SelectContent>
                    </Select>
                    {/* Label pour le champ Select */}
                    <Label
                        htmlFor={id}
                        className={`absolute text-sm duration-300 bg-white transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primaryChart peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${isFocused || selectValue ? "text-primaryChart" : "text-gray-500"
                            }`}
                    >
                        {label}
                    </Label>
                </div>

                <div className="h-[60px] w-[60px] flex items-center justify-center text-gray-700">
                    <button onClick={() => { setActive(n => !n) }} >
                        <IoSearch size={30} />
                    </button>
                </div>

            </div>
        );
    }

    return (
        <div className="relative w-full">
            <Input
                id={id}
                ref={inputRef}
                type={type}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(value !== "")}
                onChange={onChange}
                className={`block w-full px-2.5 pb-2.5 pt-4 text-md bg-transparent border rounded-lg appearance-none focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus:border-primaryText peer ${isFocused || value ? "border-primaryChart" : "border-gray-300"
                    }`}
                placeholder=" "
            />

            <Label
                htmlFor={id}
                className={`absolute text-sm duration-300 bg-white transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primaryChart peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${isFocused || value ? "text-primaryChart" : "text-gray-500"
                    }`}
            >
                {label}
            </Label>
        </div>
    );
});

SelectList.displayName = 'SelectList';

export default SelectList;
