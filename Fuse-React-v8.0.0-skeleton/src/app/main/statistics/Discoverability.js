import React, {useEffect, useLayoutEffect, useState} from 'react'
import ReactApexChart from "react-apexcharts";
import PageTable from "app/shared-components/table/PageTable";
import {useTheme} from "@mui/material/styles";
import {connect, useDispatch, useSelector} from "react-redux";
import {selectContrastMainTheme} from "app/store/fuse/settingsSlice";
import {useNavigate} from "react-router-dom";
import {setEndpoint} from "app/store/sparql-endpoints/endpointActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import {Grid, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const Discoverability = ({endpointsList, noVoid, hasVoid}) => {
    const theme = useTheme();
    const [endpoints, setEndpoints] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

    const options = {
        chart: {
            fontFamily: 'inherit',
            foreColor: 'inherit',
            width: '100%',
            height: '100%',
            type: 'donut',
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
          noVoid,  hasVoid
        ],
        labels: [
            'Missing VoID document', 'Has VoID document'
        ]

    }

    const headerRows = [
        {
            id: "name",
            align: "left",
            disablePadding: false,
            label: "Name",
            sort: false,
        },
        {
            id: "url",
            align: "left",
            disablePadding: false,
            label: "URL",
            sort: false,
        },
        {
            id: "down",
            align: "left",
            disablePadding: false,
            label: "VoID document",
            sort: false,
        },
        {
            id: "percentageAvailable",
            align: "left",
            disablePadding: false,
            label: "Server Name",
            sort: false,
        }
    ]

    const navigateFn = (endpoint) => {
        if(endpoint.voID){
            window.open(`${endpoint.url.substring(0, endpoint.url.length - 7)  }/.well-known/void`,  '_blank')
        }
        else{
            navigate("/void-statistics")
        }
    }
    const dataRows = endpointsList.map(endpoint => {
        console.log("ENDPOINT", endpoint)
        return{
            id: endpoint.id,
            values: [
                {
                    type: "text",
                    name: "name",
                    id: "name",
                    value: endpoint.name
                },
                {
                    type: "link",
                    name: endpoint.url,
                    id: "url",
                    value: endpoint.url
                },
                {
                    type: "bool",
                    name: "voID",
                    id: "voID",
                    value: endpoint.voID
                },
                {
                    type: "text",
                    name: "serverName",
                    id: "serverName",
                    value: endpoint.serverName
                },
                {
                    type: "button",
                    name: "voidStatistic",
                    id: "voidStatistic",
                    text: "VoID",
                    function: () => {
                        dispatch(setEndpoint(endpoint))
                        navigateFn(endpoint)
                    }
                }
            ]
        }
    })
    return(
        <div>
            <>
                <div className="p-24 row">
                    <div className="col-6">
                        <h4><b>DISCOVERABILITY</b></h4>
                        <Grid container>
                            <Grid item xs={8}>
                                <div id='chart'>
                                    <ReactApexChart options={options} series={options.series} type="donut" height={300} width={600}/>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper elevation={3} sx={{ minHeight: '200px', marginRight: 2 }}>
                                    <Box sx={{ margin: 2 }}>
                                        <p style={{ margin: 2 , padding: 2}}>
                                            <br/>
                                            VoID is an RDF Schema vocabulary for expressing metadata about RDF datasets. It is intended as a bridge between the publishers and users of RDF data, with applications ranging from data discovery to cataloging and archiving of datasets. This document is a detailed guide to the VoID vocabulary. It describes how VoID can be used to express general metadata based on Dublin Core, access metadata, structural metadata, and links between datasets. It also provides deployment advice and discusses the discovery of VoID descriptions.
                                            <br/>
                                        </p>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        {
                            endpointsList &&
                            (
                                <PageTable
                                    headerRows={headerRows}
                                    rows={dataRows}
                                    clickable={false}
                                    link="availability"
                                />
                            )                    }
                    </div>



                </div>

            </>
        </div>
    )
}
function mapStateToProps(state) {
    return ({
        endpointsList: state.endpoint.endpointsList,
        noVoid: state.endpoint.noVoid,
        hasVoid: state.endpoint.hasVoid
    })
}
export default connect(mapStateToProps,null)(Discoverability);