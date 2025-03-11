import React from "react";
import SurveyDataPage from "./pages/SurveyDataPage";
import Table from "./pages/Table.tsx";

const App: React.FC = () => {
    return (
        <div>
            <SurveyDataPage />
            <Table data={[]} />
        </div>
    );
};

export default App;
