import React, { useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import NotificationModal from "./NotificationModal";
import "./notification.css";
import "./table.css"

import { AiFillEye } from "react-icons/ai";
import { IconContext } from "react-icons";

// Define your columns with the specific column names
const columns = [
  {
    Header: "Plaintiff's Name",
    accessor: "userName",
  },
  {
    Header: "Victim's Name",
    accessor: "victimName",
  },
  {
    Header: "Crime Committed",
    accessor: "crimeType",
  },
  {
    Header: "City of Crime",
    accessor: "crimeArea",
  },
  {
    Header: "Place of Crime",
    accessor: "crimeAddress",
  },
  {
    Header: "Time of Incident",
    accessor: "crimeDateTime",
  },
  {
    Header: "Assigned Officer's ID",
    accessor: "assignedOfficer",
  },
  {
    Header: "Assigned Officer's Name",
    accessor: "assignedOfficerName",
  },
  {
    Header: "Edit Status of Case",
    accessor: "editButton",
  },
  {
    Header: "View Details",
    accessor: "viewDetails",
  },
  {
    Header: "Drop Case",
    accessor: "deleteButton",
  },
];

export default function CaseTableS(props) {
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const { fetched_data, handleDelete } = props;

  console.log(fetched_data);

  // Function to open the modal
  const openModal = (caseData) => {
    setSelectedCase(caseData);
  };

  // Function to open the notification modal
  const openNotificationModal = () => {
    setNotificationModalOpen(true);
  };

  // Function to close the modals
  const closeModal = () => {
    setSelectedCase(null);
    setNotificationModalOpen(false);
  };

  // if (!fetched_data) {
  //   return <div>Loading...</div>;
  // }

  console.log(fetched_data);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: columns,
      data: fetched_data,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <div>
      <input
        id="searchbar"
        type="text"
        placeholder="Search for Details"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <table {...getTableProps()} className="center">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {/* Check if the current cell corresponds to the "View Details" column */}
                      {cell.column.id === "viewDetails" ? (
                        <IconContext.Provider
                          value={{ color: "black", size: "15px" }}
                        >
                          <AiFillEye
                            className="on-hover-pointer"
                            onClick={() => {
                              openModal(row.original);
                              openNotificationModal();
                            }}
                          />
                        </IconContext.Provider>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Render the CaseModal if a case is selected */}
      {/* {selectedCase && (
          <CaseModal caseDetails={selectedCase} onClose={closeModal} />
        )} */}
      {/* Render the NotificationModal */}
      {selectedCase && (
        <NotificationModal
          isOpen={notificationModalOpen}
          onClose={closeModal}
          caseDetails={selectedCase} // Pass selectedCase to NotificationModal
        />
      )}
    </div>
  );
}
