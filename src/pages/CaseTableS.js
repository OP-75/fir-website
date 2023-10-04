import React, { useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import CaseModal from "./caseModal";
import NotificationModal from './NotificationModal';
import "./notification.css"

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

    const {fetched_data, handleDelete} = props;

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
        columns:columns,
        data:fetched_data
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
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <table {...getTableProps()} className='center'>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                        {cell.column.id === 'viewDetails' ? (
                          <button onClick={() => {
                              openModal(row.original);
                              openNotificationModal();
                            }}>View Details</button>
                        ) : (
                          cell.render('Cell')
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
        {selectedCase && (<NotificationModal
          isOpen={notificationModalOpen}
          onClose={closeModal}
          caseDetails={selectedCase} // Pass selectedCase to NotificationModal
        />)}
      </div>
    );
  }



  // Sample data (replace with your actual data)
// const data = [
//     {
//       plaintiffName: 'John Doe',
//       victimName: 'Jane Smith',
//       crimeCommitted: 'Robbery',
//       cityOfCrime: 'New York',
//       crimeIncident: 'Bank Robbery',
//       timeOfIncident: '2023-09-16 10:00 AM',
//       reportFiledOn: '2023-09-17',
//       assignedOfficersID: '12345',
//       assignedOfficersName: 'Officer Smith',
//       editStatusOfCase: 'Edit',
//       viewDetails: 'View',
//       dropCase: 'Drop',
//     },
//     {
//       plaintiffName: 'Alice Johnson',
//       victimName: 'Bob Wilson',
//       crimeCommitted: 'Assault',
//       cityOfCrime: 'Los Angeles',
//       crimeIncident: 'Street Fight',
//       timeOfIncident: '2023-09-15 3:30 PM',
//       reportFiledOn: '2023-09-16',
//       assignedOfficersID: '54321',
//       assignedOfficersName: 'Officer Johnson',
//       editStatusOfCase: 'Edit',
//       viewDetails: 'View',
//       dropCase: 'Drop',
//     },
//     {
//       plaintiffName: 'Mark Wilson',
//       victimName: 'Olivia Taylor',
//       crimeCommitted: 'Robbery',
//       cityOfCrime: 'San Francisco',
//       crimeIncident: 'Bank Heist',
//       timeOfIncident: '2023-09-25 11:30 AM',
//       reportFiledOn: '2023-09-25',
//       assignedOfficersID: '86420',
//       assignedOfficersName: 'Officer Anderson',
//       caseStatus: 'Closed',
//       editStatusOfCase: 'Edit',
//       viewDetails: 'View',
//       dropCase: 'Drop',
//     },
//     {
//       plaintiffName: 'Lisa Anderson',
//       victimName: 'Robert Johnson',
//       crimeCommitted: 'Homicide',
//       cityOfCrime: 'Miami',
//       crimeIncident: 'Shooting',
//       timeOfIncident: '2023-09-22 8:15 PM',
//       reportFiledOn: '2023-09-23',
//       assignedOfficersID: '24680',
//       assignedOfficersName: 'Officer Martinez',
//       caseStatus: 'Open',
//       editStatusOfCase: 'Edit',
//       viewDetails: 'View',
//       dropCase: 'Drop',
//     },
//     {
//       plaintiffName: 'Michael Davis',
//       victimName: 'Emily White',
//       crimeCommitted: 'Fraud',
//       cityOfCrime: 'Houston',
//       crimeIncident: 'Identity Theft',
//       timeOfIncident: '2023-09-20 10:30 AM',
//       reportFiledOn: '2023-09-21',
//       assignedOfficersID: '13579',
//       assignedOfficersName: 'Officer Garcia',
//       caseStatus: 'Pending',
//       editStatusOfCase: 'Edit',
//       viewDetails: 'View',
//       dropCase: 'Drop',
//     },
//     {
//       plaintiffName: 'Sarah Smith',
//       victimName: 'David Brown',
//       crimeCommitted: 'Burglary',
//       cityOfCrime: 'Chicago',
//       crimeIncident: 'Home Invasion',
//       timeOfIncident: '2023-09-18 2:45 AM',
//       reportFiledOn: '2023-09-18',
//       assignedOfficersID: '67890',
//       assignedOfficersName: 'Officer Wilson',
//       caseStatus: 'Open',
//       editStatusOfCase: 'Edit',
//       viewDetails: 'View',
//       dropCase: 'Drop',
//     }
//     // Add more case objects as needed
//   ];
  
