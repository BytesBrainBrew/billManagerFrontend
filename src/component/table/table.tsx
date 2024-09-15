import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
export function TableComponent({
  column,
  tableData,
}: {
  column: any;
  tableData: any;
}) {
  const theme = useTheme();

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(column).map((keyName: string, index: number) => (
              <TableCell
                key={index}
                align="center"
                style={{
                  fontWeight: "bold",
                  backgroundColor: theme.palette.grey[200],
                }}
              >
                {keyName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData &&
            tableData?.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor:
                    index % 2 === 0
                      ? theme.palette.grey[100]
                      : theme.palette.background.default,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                {Object.keys(column)?.map((keyName) => (
                  <TableCell  align="center">{row[keyName]}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
