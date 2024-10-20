import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import Filters from "@/components/Privates/forms/tables/Filters.jsx";
import { MdOutlineFirstPage } from "react-icons/md";
import { MdOutlineLastPage } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useDispatch } from "react-redux";
import ButtonStopTransaction from "@/modules/dashboard/component/ButtonStopTransaction";
import ButtonFilterTable from "@/modules/dashboard/component/ButtonFilterTable";
/**
 * Génère un tableau paginé avec des actions.
 *
 * @param {string[]} columns - Liste des titres de colonnes.
 * @param {Object} datas - Objet contenant les données et les informations de pagination.
 * @param {Object[]} datas.data - Liste des objets de données.
 * @param {Object} datas.pagination - Informations sur la pagination.
 * @param {Object[]} actions - Liste des objets d'actions, chaque objet doit contenir au moins une clé `name`.
 * @param {Function} ButtonAction - Fonction pour gérer les actions des boutons.
 * @param {Function} nextPage - Action Redux pour aller à la page suivante.
 * @param {Function} previousPage - Action Redux pour revenir à la page précédente.
 * @param {Function} totalPage - Action Redux pour obtenir le nombre total de pages.
 * @param {Function} resetPage - Action Redux pour réinitialiser la pagination.
 * @param {Array} listFilter - List des value de filtre
 * @param {String} filter - nom du filtre
 * @param {Boolean} onFilter - afficher ou cacher le filtre
 * @param {Function} selectPage - Action Redux pour sélectionner une page spécifique.
 * @returns {JSX.Element} Le tableau paginé avec actions.
 */

function DataTable({
  columns,
  datas,
  actions,
  ButtonAction,
  nextPage,
  previousPage,
  totalPage,
  resetPage,
  selectPage,
  filter,
  listFilter,
  onFilter = false,
}) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    setData(datas.data);
    setPagination(datas.pagination);
  }, [datas]);
  const [globalFilter, setGlobalFilter] = useState("");
  const red = "bg-red-100 text-red-800 hover:bg-red-100 cursor-pointer";
  const green = "bg-green-100 text-green-800 hover:bg-green-100 cursor-pointer";
  const yellow =
    "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 cursor-pointer";
  const orange =
    "bg-amber-100 text-amber-800 hover:bg-amber-100 cursor-pointer";
  const defaultColor =
    "bg-gray-100 text-gray-800 hover:bg-gray-100 cursor-pointer";
  const blue = "bg-blue-100 text-blue-800 hover:bg-blue-100 cursor-pointer";

  const dispatch = useDispatch();
  const customFilterFn = (row, columnId, filterValue) => {
    const cellValue = row.getValue(columnId);
    if (typeof cellValue == "string") {
      return cellValue.toLowerCase().includes(filterValue.toLowerCase());
    }
    return false;
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    state: {
      globalFilter: globalFilter,
    },
    globalFilterFn: customFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    filterFns: {
      customFilter: customFilterFn,
    },
  });
  const pageIndex = selectPage;
  const nxPage = pageIndex + 1;

  const prevPage = pageIndex - 1;
  const pageSize = pagination?.limit;
  const totalPages = pagination?.total_pages;
  const rowCount = pagination?.total_items;

  return (
    <div className="w-full py-6 shadow-combined rounded-lg overflow-x-auto bg-[#fffe]">
      <div className="w-full mb-4 flex gap-2 items-center">
        <Filters value={globalFilter} onChange={setGlobalFilter} />
        {onFilter && (
          <ButtonFilterTable filter={filter} listFilter={listFilter} />
        )}
      </div>
      <div className="w-full">
        <Table className="w-full text-center bg-[#fffe] overflow-x-auto">
          <TableHeader className="bg-[#F4F6F8] text-center">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="w-full">
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const cellValue = cell.getValue();
                  const id = row.original.id;
                  let cellClass = "";
                  const rowData = row.original;
                  if (cell.column.id === "Urgence") {
                    if (rowData.statuts == "en cours") {
                      return (
                        <TableCell key={cell.id} className="text-center">
                          <ButtonStopTransaction
                            chargPointId={rowData.charge_point_id}
                            transactionId={rowData.id}
                          />
                        </TableCell>
                      );
                    }
                  }
                  if (
                    cell.column.id === "start_time" ||
                    cell.column.id === "end_time"
                  ) {
                    const rawValue = cell.getValue();
                    if (rawValue === null || rawValue === undefined) {
                      return (
                        <TableCell key={cell.id} className="text-center">
                          Non disponible
                        </TableCell>
                      );
                    }

                    const date = new Date(rawValue);
                    if (!isNaN(date.getTime())) {
                      const cellValue = date.toLocaleString("fr-FR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                      return (
                        <TableCell key={cell.id} className="text-center">
                          {cellValue}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={cell.id} className="text-center">
                          Date invalide
                        </TableCell>
                      );
                    }
                  }

                  if (cell.column.columnDef.header === "Actions") {
                    return (
                      <TableCell key={cell.id} className="text-center">
                        <ButtonAction buttonProperty={actions} Id={id} />
                      </TableCell>
                    );
                  }

                  if (
                    cell.column.id === "status" ||
                    cell.column.id === "statuts" ||
                    cell.column.id === "connector1" ||
                    cell.column.id === "connector2" ||
                    cell.column.id === "heartBeat" ||
                    cell.column.id === "statut"
                  ) {
                    switch (cellValue) {
                      case "En attente":
                      case "En cours":
                      case "en cours":
                        cellClass = orange;
                        break;
                      case "Disponible":
                      case "Available":
                      case "available":
                      case "Terminée":
                      case "terminé":
                      case "Complétée":
                      case "Accepté":
                      case "active":
                        cellClass = green;
                        break;
                      case "Échouée":
                      case "inactive":
                      case "Bloqué":
                      case "Hors service":
                      case "Unavailable":
                        cellClass = red;
                        break;
                      case "maintenance":
                      case "Occupe":
                        cellClass = yellow;
                        break;
                      case "Preparing":
                      case "preparing":
                      case "Charging":
                      case "charging":
                        cellClass = blue;
                        break;
                      default:
                        cellClass = defaultColor;
                    }
                    return (
                      <TableCell key={cell.id} className="text-center">
                        <Badge className={cellClass}>{cellValue}</Badge>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="w-full flex items-center justify-between gap-4 p-2 m-3 max-md:flex-col max-md:justify-center">
        <span className="text-sm text-[#64748b] ">
          Page {pageIndex} sur {totalPages}, affichage de {pageSize} resultats
          sur un total de {rowCount}
        </span>

        <div className="flex items-center gap-2 ">
          <Button
            type="button"
            disabled={pageIndex === 1}
            onClick={() => dispatch(resetPage())}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <MdOutlineFirstPage size={20} />
          </Button>
          <Button
            type="button"
            disabled={!pagination?.has_previous}
            onClick={() => {
              dispatch(previousPage(prevPage));
            }}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <GrFormPrevious size={20} />
          </Button>
          <Button
            type="button"
            disabled={!pagination?.has_next}
            onClick={() => {
              dispatch(nextPage(nxPage));
            }}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <MdNavigateNext size={20} />
          </Button>
          <Button
            type="button"
            disabled={pageIndex === totalPages}
            onClick={() => {
              dispatch(totalPage(totalPages));
            }}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <MdOutlineLastPage size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
