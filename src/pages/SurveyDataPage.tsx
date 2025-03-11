import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "./Table.tsx"

const base_url = "http://192.168.214.175:7001/";
// const base_url = "http://0.0.0.0:7001/";

interface Notification {
    id:string; status: string; createdAt: string; userInfo: string; message: string; timeElapsed: string;
}

export default function SurveyDataPage() {
    const [file, setFile] = useState<File | null>(null);
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [processType, setProcessType] = useState<string>("");
    const [notifications, setNotifications] = useState<Notification[]>([]);


    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get<Notification[]>(`${base_url}data/api/v1/notification/`);
            setNotifications(response.data);
        } catch (error) {
            console.error("Error fetching notifications", error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]; // Get the first selected file
            setFile(file);
        }
    };

    const uploadFile = async () => {
        if (!file) {
            Swal.fire("Error", "Please select a file to upload", "error");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        try {
            await axios.post(`${base_url}json/api/v1/import`, formData);
            await Swal.fire("Success", "File uploaded successfully. Kindly Process the workbook.", "success");
        } catch (error) {
            console.log(error)
            await Swal.fire("Error", "Failed to upload file", "error");
        }
    };

    const processWorkbook = async () => {

        if (!emailAddress || !fileName || !processType) {
            Swal.fire("Error", "Please fill in all the required fields", "error");
            return;
        }

        try {
            await axios.get(`${base_url}data/api/v1/process-workbook`, {
                params: { emailAddress, fileName, processType },
            });
            await Swal.fire("Success", "Workbook processing initiated", "success");
        } catch (error) {
            console.log(error)
            await Swal.fire("Error", "Failed to process workbook", "error");
        }
    };

    // const showNotificationAlert = (id: string) => {
    //     Swal.fire("Notification Info", `Notification ID: ${id}`, "info");
    // };

    return (
        <div className="flex p-4">
            <div className="w-1/2 p-4">
                <div className="card">
                    <h4 className="header-style">Survey Data</h4>

                    <a href="http://192.168.214.114:8000/public/question/b8755475-7d2b-4b5e-b3de-44854ada2d9a"
                       target="_blank"
                       className="button-4 json-file-style">
                        Get Survey JSON File
                    </a>

                    {/* Horizontal line before Upload File */}
                    <hr className="my-4 border-t border-gray-300" />

                    <h4 className="header-style">Upload File</h4>

                    {/* Flex container for file input and upload button */}
                    <div className="flex items-center justify-between space-x-4">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                            className="choose-file-style"
                        />

                        {/* Display selected file name */}
                        {/*{file && <span className="text-gray-700">File Selected</span>}*/}

                        <button className="button-4" onClick={uploadFile}>
                            Upload
                        </button>
                    </div>

                </div>

                <div className="card">
                    <h3 className="header-style">Process Workbook</h3>

                    {/* Added flex flex-col for vertical alignment */}
                    <div className="flex flex-col space-y-4">
                        <select className="form-input-style" value={processType}
                                onChange={(e) => setProcessType(e.target.value)}>
                            <option value="">Select Process Type</option>
                            <option value="SURVEY">Survey</option>
                        </select>

                        <input type="email" placeholder="Email Address" className="form-input-style" value={emailAddress}
                               onChange={(e) => setEmailAddress(e.target.value)}/>

                        <input type="text" placeholder="File Name" className="form-input-style" value={fileName}
                               onChange={(e) => setFileName(e.target.value)}/>

                        <button className="button-choose-file" onClick={processWorkbook}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-1/2 p-4 card">
                <Table data={notifications} />
            </div>
        </div>
    );

}
