import {Table, TableHead} from "@mui/material";
import FuseScrollbars from "../../../@fuse/core/FuseScrollbars";
import withRouter from "../../../@fuse/core/withRouter";
import PageTableHead from "./PageTableHead";
import PageTableBody from "./PageTableBody";

function PageTable(props) {

    return (
        <div className="w-full flex flex-col">
            <FuseScrollbars className="grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <TableHead>
                        <PageTableHead headerRows={props.headerRows}/>
                    </TableHead>
                    <PageTableBody rows={props.rows}
                                   link={props.link}
                                   linkDelete={props.linkDelete}
                                   clickable={props.clickable}
                                   data={props.data}
                    />
                </Table>

            </FuseScrollbars>
        </div>
    )
}

export default withRouter(PageTable);