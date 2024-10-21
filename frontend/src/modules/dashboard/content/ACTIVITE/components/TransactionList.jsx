import { useCallback, useMemo, useState } from "react";

function TransactionList({ transactionsData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("Tous");
  const itemsPerPage = 5;

  const filteredTransactions = useMemo(() => {
    return transactionsData
      .filter((transaction) =>
        transaction.client.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((transaction) =>
        filterStatus === "Tous" ? true : transaction.statut === filterStatus
      );
  }, [searchTerm, filterStatus, transactionsData]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredTransactions.length / itemsPerPage);
  }, [filteredTransactions.length]);

  const currentTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredTransactions]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const statusStyles = {
    Success: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
  };

  return (
    <>
      {/* Filtres */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Rechercher..."
          className="p-2 border rounded w-[30%]"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="relative inline-block">
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="appearance-none p-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out hover:border-blue-400 w-full"
          >
            <option value="Tous">Tous les statuts</option>
            <option value="Success">Succès</option>
            <option value="Pending">En attente</option>
            <option value="Failed">Échoué</option>
          </select>
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Liste des transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTransactions.length > 0 ? (
          currentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                <span>{transaction.date}</span>
                <span>{transaction.heure}</span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-[#212B36]">
                  {transaction.client}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    statusStyles[transaction.statut]
                  }`}
                >
                  {transaction.statut === "Success"
                    ? "Payée"
                    : transaction.statut === "Pending"
                    ? "En attente"
                    : "Annulé"}
                </span>
              </div>

              <p className="text-sm text-[#3b4853]">ID : {transaction.id}</p>
              <p className="text-sm text-[#3b4853]">
                Montant : {transaction.montant}€
              </p>
              <p className="text-sm text-[#3b4853]">
                Méthode : {transaction.methode}
              </p>

              <div className="mt-4 flex justify-between">
                <button className="text-blue-500 hover:text-blue-400 text-sm">
                  Détails
                </button>
                <button className="text-red-500 hover:text-red-400 text-sm">
                  Supprimer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#3b4853]">Aucune transaction trouvée</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="text-lg">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </>
  );
}

export default TransactionList;
