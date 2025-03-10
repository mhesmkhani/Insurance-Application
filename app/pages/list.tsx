'use client';
import React, {useEffect, useMemo, useState} from 'react';
import Services from "~/api/services";
import {AgGridReact} from "ag-grid-react";
import {ModuleRegistry} from "@ag-grid-community/core";
import {ClientSideRowModelModule} from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);


function List(props) {
    const [submissions, setSubmissions] = useState([])
    const services = new Services();

    useEffect(() => {
        const res = services.fetchAllSubmissions();
        res.then(result => {
            setSubmissions(result)
        })
    }, [])

    const columnDefs = [
        {
            field: "Full Name",
            headerName: "Full Name",
            width: 230,
            headerClass: "p-l-5",
            cellStyle: {textAlign: 'center'}
        },
        {
            field: "Age",
            headerName: "Age",
            width: 230,
            headerClass: "p-l-5",
            cellStyle: {textAlign: 'center'}
        },
        {
            field: "Gender",
            headerName: "Gender",
            width: 230,
            headerClass: "p-l-5",
            cellStyle: {textAlign: 'center'}
        },
        {
            field: "Insurance Type",
            headerName: "Insurance Type",
            width: 230,
            headerClass: "p-l-5",
            cellStyle: {textAlign: 'center'}
        },
        {
            field: "City",
            headerName: "City",
            width: 290,
            headerClass: "p-l-5",
            cellStyle: {textAlign: 'center'}
        },
    ]
    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            sortable: true,
            filter: true,
            resizable: true,
        };
    }, []);

    return (
        <div className="min-h-full">
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="ag-theme-alpine" style={{height: "20vh", width: "100%"}}>
                        <AgGridReact
                            modules={[ClientSideRowModelModule]}
                            rowData={submissions.data}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            rowModelType="clientSide"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default List;