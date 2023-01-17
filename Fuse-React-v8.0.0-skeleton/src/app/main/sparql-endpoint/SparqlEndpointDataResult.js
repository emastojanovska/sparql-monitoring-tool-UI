import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import PageTable from "app/shared-components/table/PageTable";
import {Button} from "@mui/material";
import ArrowBack from '@mui/icons-material/ArrowBack';

const SparqlEndpointDataResult = ({queryData}) => {
    const navigate = useNavigate();
    const dataResultObject = queryData
    const [headerResults, setHeaderResults] = useState([])
    const [rowResults, setRowResults] = useState([])

    const goBack = () => {
        navigate('/sparql');
    };

    useEffect(()=>{
        const headerTmp = []
        const rowsFinal = []
        Object.entries(dataResultObject[0]).map(x =>
            headerTmp.push(x[0])
        )
        setHeaderResults(headerTmp)
        // eslint-disable-next-line array-callback-return
        Object.entries(dataResultObject).map(item => {
            const tmpRow = []
            // eslint-disable-next-line array-callback-return
            Object.entries(item[1]).map(res => {
                const obj = {
                    name: res[0],
                    value: res[1].value
                }
                tmpRow.push(obj)
            })
            rowsFinal.push(tmpRow)

        })

        setRowResults(rowsFinal)
    }, [])


    const headerRows = headerResults.map((data) => {
        return {
            id: data,
            align: "left",
            disablePadding: false,
            label: data,
            sort: false,
        }
    })



    const dataRows = rowResults.map((data, idx) => {
        const tmpValues = []

        data.forEach(x => tmpValues.push({
            type: "text",
            name: x.name,
            id: x.name,
            value: x.value
        }))

        return {
            id: idx,
            values: tmpValues
        }
    })

    return(<Box>
        <div>
            {dataResultObject.length > 0 && headerRows && dataRows &&
            dataResultObject[0] !== undefined && (
                <>
                    <Box
                        m={1}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <Button variant="contained"
                                color="inherit"
                                endIcon={<ArrowBack />}
                                onClick={() => goBack()}>
                            Back
                        </Button>
                    </Box>

                    <PageTable
                        headerRows={headerRows}
                        rows={dataRows}
                        clickable={false}
                        link="sparql/result-data"
                    />
                </>
            )}
        </div>
    </Box>)
}

function mapStateToProps(state) {
    return ({
        queryData: state.queryData.queryData
    })
}

export default connect(mapStateToProps, null)(SparqlEndpointDataResult);