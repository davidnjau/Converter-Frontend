import React from "react";


interface TableProps {
    data: { id:string; createdAt: string; message: string; status: string }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="notification-table-header">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left">#</th>
                    {/*<th className="px-4 py-2 text-left">Date</th>*/}
                    <th className="px-4 py-2 text-left">Status</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{index + 1}</td>
                        {/*<td className="px-4 py-2">{item.createdAt}</td>*/}
                        <td className="px-4 py-2">
                <span
                    className={`px-3 py-1 rounded text-white ${
                        item.status === "PENDING"
                            ? "bg-yellow-500"
                            : item.status === "FAILED"
                                ? "bg-red-500"
                                : "bg-green-500"
                    }`}
                >
                  {item.status}
                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
