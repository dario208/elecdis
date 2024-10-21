import { useState } from "react";

const Reçus = () => {
  const receipts = [
    { id: 'R099', date: '2024-10-01', merchant: 'John Doe', amount: 24000, status: 'paid', paymentMethod: 'PayPal', category: 'Reservation' },
    { id: 'R100', date: '2024-10-05', merchant: 'Apple', amount: 20049, status: 'pending', paymentMethod: 'Credit Card', category: 'Purchase' },
    { id: 'R101', date: '2024-10-10', merchant: 'Netflix', amount: 1499, status: 'canceled', paymentMethod: 'Credit Card', category: 'Subscription' },
    { id: 'R102', date: '2024-09-10', merchant: 'Microsoft', amount: 9999, status: 'paid', paymentMethod: 'PayPal', category: 'Software' },
  ];

  const statusStyles = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    canceled: "bg-red-100 text-red-800",
  };

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction pour filtrer les reçus selon le statut sélectionné
  const filteredReceipts = receipts.filter((receipt) => {
    if (filter !== "all" && receipt.status !== filter) return false;
    if (searchTerm && !receipt.merchant.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full h-auto p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h2 className="text-[#212B36] text-xl">Liste des reçus</h2>
      </div>

      <div className="min-h-screen flex">
        <div className="flex-1 p-10 bg-gray-100">
          <header className="flex justify-between items-center mb-10">
            <div className="mb-6 flex space-x-4">
              <button
                className={`px-4 py-2 rounded ${
                  filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setFilter("all")}
              >
                Tous
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  filter === "paid" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setFilter("paid")}
              >
                Payé
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setFilter("pending")}
              >
                En attente
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  filter === "canceled" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setFilter("canceled")}
              >
                Annulé
              </button>
            </div>
            <input
              type="text"
              className="w-1/3 px-4 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Rechercher un reçu"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReceipts.length > 0 ? (
              filteredReceipts.map((receipt) => (
                <div key={receipt.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusStyles[receipt.status]}`}>
                      {receipt.status === 'paid' ? 'Payée' : receipt.status === 'pending' ? 'En attente' : 'Annulé'}
                    </span>
                    <span className="text-gray-500">{receipt.date}</span>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">{receipt.merchant}</h2>
                    <p className="mt-2 text-gray-600">{receipt.amount.toLocaleString()} Ar</p>
                    <p className="mt-2 text-gray-600">Méthode de paiement: {receipt.paymentMethod}</p>
                    <p className="mt-2 text-gray-600">Catégorie: {receipt.category}</p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button className="text-blue-500 hover:underline">Voir détails</button>
                    <button className="text-blue-500 hover:underline">Télécharger</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Aucun reçu trouvé</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reçus;
