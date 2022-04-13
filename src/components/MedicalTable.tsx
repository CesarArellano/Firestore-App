import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react'
import { getMedicalRecords } from '../firebase/firebase';
import { MedicalModel } from '../interfaces/medical.model';
import { CenterContainer } from './shared/Container';

export const MedicalTable = () => {
  const [ medicalList, setMedicalList ] = useState<MedicalModel[]>([]);
  
  useEffect(() =>{
    getMedicalHistory()
  }, [])
  
  const getMedicalHistory = async () => {
    setMedicalList( await getMedicalRecords() );
  }

  if( medicalList.length === 0) {
    return (
      <CenterContainer >
        <CircularProgress />
      </CenterContainer>
    )
  }
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 4}}>
    <Table sx={{ minWidth: 500, maxHeight: 300 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Nombre del doctor</TableCell>
          <TableCell>Paciente</TableCell>
          <TableCell>Edad</TableCell>
          <TableCell>Género</TableCell>
          <TableCell>Descripción</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {medicalList.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.doctorName}
            </TableCell>
            <TableCell>{ row.name }</TableCell>
            <TableCell>{ row.age ?? 'N/D' }</TableCell>
            <TableCell>{ row.sex ?? 'N/D' }</TableCell>
            <TableCell>{ row.description }</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
      
  )
}
