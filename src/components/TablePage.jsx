import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

function TablePage() {
  const { items } = useSelector((state) => state.data);
  console.log(items);

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Avg', accessor: 'avg' },
      { Header: 'Total', accessor: 'total' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: items,
  });

  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Avg', key: 'avg', width: 15 },
      { header: 'Total', key: 'total', width: 15 },
    ];

    const dataToExport = items.map(item => ({
      name: String(item.name),
      date: String(item.date),
      avg: Number(item.avg),
      total: Number(item.total),
    }));

    // Add rows to worksheet
    worksheet.addRows(dataToExport);

    // Style header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4CAF50' }, // Green background
    };

    // Generate and download file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'table-data.xlsx');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Table Page</h1>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-full overflow-x-auto">
        <table {...getTableProps()} className="w-full border-collapse text-sm sm:text-base">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="border p-2 sm:p-3 bg-gray-200 font-semibold whitespace-nowrap"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="border p-2 sm:p-3 whitespace-nowrap"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          onClick={handleDownload}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}

export default TablePage;