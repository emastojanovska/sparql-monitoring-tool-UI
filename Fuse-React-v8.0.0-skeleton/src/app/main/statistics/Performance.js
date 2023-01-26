import React, {useEffect, useState} from 'react'
import ReactApexChart from "react-apexcharts";
import PageTable from "app/shared-components/table/PageTable";
import {useTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {selectContrastMainTheme} from "app/store/fuse/settingsSlice";
import QueryRepository from "../../repository/QueryRepository";


const Performance = () => {
    const [queryTypes, setQueryTypes] = useState(null)
    const [endpointQueries, setEndpointQueries]  = useState(null)
    const theme = useTheme();
    const dispatch = useDispatch();
    const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));
    const options = {
        chart: {
            fontFamily: 'inherit',
            foreColor: 'inherit',
            width: '100%',
            height: '100%',
            type: 'bar',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },

        grid: {
            show: true,
            position: 'back',

        },
        stroke: {
            width: 2,
        },
        series: [
            {
                name: 'Average response time in ms',
                data: queryTypes != null ? queryTypes.map(x => x.time)  : null
            }
        ],
        xaxis: {
            categories: queryTypes != null ? queryTypes.map(x => x.type) : null,

        },
        yaxis: {
            min: 0,
            max: 15,
        },
    }
    useEffect(()=> {
        getQueryTypes()
        getEndpointQueries()
    }, [])

    const headerRows = [
        {
            id: "name",
            align: "left",
            disablePadding: false,
            label: "Name",
            sort: false,
        },
        {
            id: "aggregate",
            align: "left",
            disablePadding: false,
            label: "AGGREGATION",
            sort: false,
        },
        {
            id: "subquery",
            align: "left",
            disablePadding: false,
            label: "SUBQUERY",
            sort: false,
        },
        {
            id: "ask",
            align: "left",
            disablePadding: false,
            label: "ASK",
            sort: false,
        },
        {
            id: "negation",
            align: "left",
            disablePadding: false,
            label: "NEGATION",
            sort: false,
        },
        {
            id: "select",
            align: "left",
            disablePadding: false,
            label: "SELECT",
            sort: false,
        },


    ]

    const dataRows = endpointQueries !== null && endpointQueries.map(endpoint => {
        const queries = endpoint.queries.map(x => {
            return(
                {
                    type: "text",
                    name: x.type,
                    id: "type",
                    value: `${(x.responseTime / x.numExecuted).toFixed(2)}ms`
                }
            )
        })
        return{
            id: endpoint.endpointId,
            values: [
                {
                    type: "link",
                    name: endpoint.endpointURL,
                    id: "url",
                    value: endpoint.endpointURL
                },
                ...queries
            ]
        }
    })


    const getQueryTypes = () =>{
        QueryRepository.getAllResponseTimes()
            .then(res => {setQueryTypes(res.data)
        })
    }

    const getEndpointQueries = () => {
        QueryRepository.getAllByEndpoint()
            .then(res => {
                setEndpointQueries(res.data)
            })
    }
    return(
        <div>
            <>
                <div className="p-24 row">
                    <div className="col-6">
                        <h4><b>PERFORMANCE</b></h4>
                    </div>
                </div>
                <div id='chart'>
                    <ReactApexChart options={options} series={options.series} type="bar" height={350} />
                </div>
                <div>
                    {
                        endpointQueries &&
                        (
                            <PageTable
                                headerRows={headerRows}
                                rows={dataRows}
                                clickable={false}
                                link="performance"
                            />
                        )                    }
                </div>
            </>
        </div>

    )
}

export default Performance;
