import {TableCell, TableRow} from "@mui/material";

function PageTableHead(props) {
    return (
        <TableRow className="h-48 sm:h-64">
            {props.headerRows?.map((row) => {
                return (
                    <TableCell
                        className="p-4 md:p-16"
                        key={row.id}
                        align={row.align}
                        padding={row.disablePadding ? 'none' : 'normal'}
                    >
                        {row.label}
                    </TableCell>
                )
            })}
        </TableRow>
    )
}

export default PageTableHead;