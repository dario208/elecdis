import { useMemo } from "react";
import {
  FaDollarSign,  // Import de l'icône pour les revenus
} from "react-icons/fa";
import TransactionList from "./components/TransactionList";

// Données statiques (à remplacer par un appel API dans un environnement de production)
const transactionsData = [
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
    id: "TXN002",
    client: "Jane Smith",
    montant: 30.50,
    date: "2024-10-04",
    heure: "11:20",
    type: "Recharge",
    methode: "PayPal",
    statut: "Failed",
  },
  {
    id: "TXN003",
    client: "Alice Johnson",
    montant: 25.75,
    date: "2024-10-03",
    heure: "16:15",
    type: "Recharge",
    methode: "Carte de débit",
    statut: "Success",
  },
  {
    id: "TXN004",
    client: "Michael Brown",
    montant: 80.00,
    date: "2024-10-02",
    heure: "09:45",
    type: "Recharge",
    methode: "Apple Pay",
    statut: "Pending",
  },
  {
    id: "TXN005",
    client: "Sarah Lee",
    montant: 60.25,
    date: "2024-10-01",
    heure: "13:30",
    type: "Recharge",
    methode: "Google Pay",
    statut: "Success",
  },
  {
    id: "TXN006",
    client: "Robert Wilson",
    montant: 45.50,
    date: "2024-09-30",
    heure: "15:50",
    type: "Recharge",
    methode: "Carte de crédit",
    statut: "Failed",
  },
  {
    id: "TXN007",
    client: "Emily Davis",
    montant: 72.00,
    date: "2024-09-29",
    heure: "18:20",
    type: "Recharge",
    methode: "Carte de débit",
    statut: "Success",
  },
  {
    id: "TXN008",
    client: "David Harris",
    montant: 35.75,
    date: "2024-09-28",
    heure: "10:15",
    type: "Recharge",
    methode: "PayPal",
    statut: "Pending",
  },
  // Ajoute d'autres transactions si nécessaire
];

const Transactions = () => {
 

  const totalRevenue = useMemo(() => {
    return transactionsData
      .filter((transaction) => transaction.statut === "Success")
      .reduce((total, transaction) => total + transaction.montant, 0)
      .toFixed(2);
  }, []);


  return (
    <div className="w-full h-auto p-6">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow-lg mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <FaDollarSign className="text-4xl mr-4" />
          <div>
            <h3 className="text-2xl font-semibold">Revenus totaux</h3>
            <p className="text-lg">{totalRevenue} €</p>
          </div>
        </div>
      </div>

      <h2 className="text-[#212B36] text-xl mb-6">Transactions de paiement</h2>
<TransactionList transactionsData={transactionsData} />
      
    </div>
  );
};

export default Transactions;