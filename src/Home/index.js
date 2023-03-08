import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

export const Home = () => {
    const [data, setData] = useState();



    useEffect(()=>{
        async function getData() {
            return fetch('https://iot-project.herokuapp.com/slots', {
                method: 'GET'
            })
        } 
        getData()
        .then(res => res.json())
        .then(res => setData(res))
    },[])

    return data? (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                    <StyledTableCell align="right">Slots</StyledTableCell>
                    <StyledTableCell align="right">Action</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                    <StyledTableRow key={row.name}>
                        <StyledTableCell align="right">{row.slots}</StyledTableCell>
                        <StyledTableCell align="right">{row.action}</StyledTableCell>
                        <StyledTableCell align="right">{row.date}</StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <h3 style={{ margin: '0 auto', paddingTop: 16, paddingLeft: 400 }}>Disponibilidad de Slots </h3>
            <div style={{ width: 200, height: 200, margin: '0 auto', paddingTop: 16 }}>
                <CircularProgressbar
                width={100}
                value={75}
                text={'75%'}
                circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
                styles={{
                    trail: {
                    strokeLinecap: 'butt',
                    transform: 'rotate(-126deg)',
                    transformOrigin: 'center center',
                    },
                    path: {
                    strokeLinecap: 'butt',
                    transform: 'rotate(-126deg)',
                    transformOrigin: 'center center',
                    },
                    text: {
                    fill: '#333',
                    },
                }}
                strokeWidth={10}
                />
            </div>
        </>
    ) 
    : (<></>)
}