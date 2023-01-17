import {connect, useDispatch} from 'react-redux';
import {removeEndpoint, setEndpoints} from "app/store/sparql-endpoints/endpointActions";
import PageTable from "app/shared-components/table/PageTable";
import AddEndpointModal from "../components/AddEndpointModal";

const AllEndpoints = ({endpointsList}) => {
    const dispatch = useDispatch();

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
            label: "Available last 24h",
            sort: false,
        },
        {
            id: "serverName",
            align: "left",
            disablePadding: false,
            label: "Server",
            sort: false,
        },
        {
            id: "removeEndpoint",
            align: "left",
            disablePadding: false,
            label: "",
            sort: false,
        },

    ]

    const getLinkDelete = (id) => {
        dispatch(removeEndpoint(id))
    }
    const dataRows = endpointsList.map(endpoint => {
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
                    name: "down24h",
                    id: "down24h",
                    value: !endpoint.down24h
                },
                {
                    type: "text",
                    name: "serverName",
                    id: "serverName",
                    value: endpoint.serverName
                },
                {
                    type: "remove-endpoint",
                    name: "removeEndpoint",
                    id: "removeEndpoint",
                }
            ]
        }
    })

    return(
        <>
            <div className="p-24 row">
                <div className="col-6">
                    <h4><b>All SPARQL endpoints URLs</b></h4>
                </div>
                <div className="col-6">
                    <AddEndpointModal/>
                </div>

            </div>
            <div>
                {
                    endpointsList &&
                    (
                        <PageTable
                            headerRows={headerRows}
                            rows={dataRows}
                            clickable={false}
                            linkDelete={getLinkDelete}
                            link="all-endpoints"
                        />
                    )                    }
            </div></>


    )
}

function mapStateToProps(state) {
    return ({
        endpointsList: state.endpoint.endpointsList
    })
}

export default connect(mapStateToProps)(AllEndpoints);