import React from "react";
import Swal from "sweetalert2";


interface TableProps {
    data: { id:string; status: string; createdAt: string; userInfo: string; message: string; timeElapsed: string;  }[];
}


const handleAction = (message: string) => {
    Swal.fire("Notification Info", `${message}`, "info");
    // Add retry logic here
};


const Table: React.FC<TableProps> = ({ data }) => {


    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black">
                <thead className="bg-gray-300 text-black">
                <tr className="border border-black">
                    <th className="px-4 py-2 text-left w-10 border border-black header-style">#</th>
                    <th className="px-4 py-2 text-left border border-black header-style">Message</th>
                    <th className="px-4 py-2 text-left border border-black header-style">Time Elapsed</th>
                    <th className="px-4 py-2 text-left border border-black header-style">Status</th>
                    <th className="px-4 py-2 text-left border border-black header-style">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="border border-black bg-gray-100 hover:bg-gray-200 text-black table-content-style">
                        <td className="px-4 py-2 border border-black table-content-style">{index + 1}</td>
                        <td className="px-4 py-2 border border-black table-content-style">{item.message}</td>
                        <td className="px-4 py-2 border border-black table-content-style">{(item.timeElapsed)}</td>
                        <td className="px-4 py-2 border border-black table-content-style">
                            <span
                                className={`px-3 py-1 rounded text-white ${
                                    item.status === "pending"
                                        ? "bg-yellow-800"
                                        : item.status === "failed"
                                            ? "bg-red-800"
                                            : "bg-green-800"
                                }`}
                            >
                                {item.status}
                            </span>
                        </td>
                        <td className="px-4 py-2 table-content-style">
                            <button
                                className="px-3 py-1 button-4"
                                onClick={() => handleAction(item.message)}>
                                View
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );



};

export default Table;
