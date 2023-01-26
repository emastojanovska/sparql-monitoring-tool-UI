import { useTheme} from '@mui/material/styles';
import {  connect , useSelector} from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {selectContrastMainTheme} from "app/store/fuse/settingsSlice";
import PageTable from "app/shared-components/table/PageTable";

const Availability = ({endpointsList}) => {
    const theme = useTheme();
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
        colors: [contrastTheme.palette.secondary.light],
        dataLabels: {
            enabled: false,
        },
        fill: {
            colors: [contrastTheme.palette.secondary.dark],
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
                name: '% of availability',
                data: endpointsList.map(x => parseInt((x.numAvailable / (x.numUnavailable + x.numAvailable)) * 100, 10))
            }
        ],
        xaxis: {
            categories: endpointsList.map(x => x.name),

        },
        yaxis: {
            min: 0,
            max: 100,
        },
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
            label: "Available last 24h",
            sort: false,
        },
        {
            id: "percentageAvailable",
            align: "left",
            disablePadding: false,
            label: "% available",
            sort: false,
        }
    ]

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
                    name: "percentageAvailable",
                    id: "percentageAvailable",
                    value: `${parseInt((endpoint.numAvailable / (endpoint.numUnavailable + endpoint.numAvailable)) * 100, 10)  }%`
                }
                ]
        }
    })

    return(
       <div>
           <>
               <div className="p-24 row">
                   <div className="col-6">
                       <h4><b>AVAILABILITY</b></h4>
                   </div>
               </div>
               <div id='chart'>
                   <ReactApexChart options={options} series={options.series} type="bar" height={350} />
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
           </>
       </div>


   );
}
function mapStateToProps(state) {
    return ({
        endpointsList: state.endpoint.endpointsList
    })
}
export default connect(mapStateToProps, null)(Availability);
