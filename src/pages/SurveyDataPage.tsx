import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "./Table.tsx"

const base_url = "http://0.0.0.0:7001/";

interface Notification {
    id: string;
    createdAt: string;
    message: string;
    status: string;
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
            setFile(e.target.files[0]);
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
            await Swal.fire("Success", "File uploaded successfully", "success");
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

                    <h3 className="header-style">Upload File</h3>

                    <input type="file" accept=".json" onChange={handleFileChange} className="choose-file-style"/>
                    <button className="button-4" onClick={uploadFile}>
                        Upload
                    </button>

                </div>

                <div className="card">

                    <h3 className="header-style">Process Workbook</h3>

                    <input type="email" placeholder="Email Address" className="form-input-style" value={emailAddress}
                           onChange={(e) => setEmailAddress(e.target.value)}/>
                    <input type="text" placeholder="File Name" className="form-input-style" value={fileName}
                           onChange={(e) => setFileName(e.target.value)}/>
                    <input type="text" placeholder="Process Type (SURVEY)" className="form-input-style" value={processType}
                           onChange={(e) => setProcessType(e.target.value)}/>
                    <button className="button-choose-file" onClick={processWorkbook}>
                        Submit
                    </button>

                </div>

            </div>

            <div className="w-1/2 p-4 card">
                {/*<h3 className="header-style">Notifications</h3>*/}
                <Table data={notifications} />
            </div>
        </div>
    );
}
