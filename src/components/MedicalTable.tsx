import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { query, where } from 'firebase/firestore';
import { ChangeEvent, useEffect, useState } from 'react'
import { collectionRef, getMedicalRecords } from '../firebase/firebase';
import { MedicalModel } from '../interfaces/medical.model';
import { RowContainer } from '../MainApp';
import { CenterContainer, Container } from './shared/Container';
import { useForm } from '../hooks/useForm';

export const MedicalTable = () => {
  const { values, handleInputChange } = useForm({
    age: '0'
  })
  const [ isLoading, setIsLoading ] = useState(false);
  const [ medicalList, setMedicalList ] = useState<MedicalModel[]>([]);
  
  const getMedicalHistory = async () => {
    setIsLoading( true );
    setMedicalList( await getMedicalRecords(query(collectionRef, where("age", ">=", values.age )) ) );
    setIsLoading( false );
  }

  const handleSearch = () => {
    getMedicalHistory();
  }

  useEffect(() =>{
    getMedicalHistory()
  }, [ ])

  return (
    <div
      style={{ width: 'auto' }}
    >
      <RowContainer
        style={{ margin: 0, justifyContent: 'space-between' }}
      >
        <TextField 
          label="Filtra por edad"
          variant="filled" 
          onChange={({target}: ChangeEvent<HTMLInputElement>) => handleInputChange(target.value, 'age')}
        />
        <Button variant="contained" onClick={ handleSearch }> Buscar </Button>
        </RowContainer>
        <Box sx={{ height: 15 }}/>
        {
          ( isLoading )
          ? (
            <CenterContainer >
              <CircularProgress />
            </CenterContainer>
          )
          : ( medicalList.length === 0 )
            ? (
              <CenterContainer >
                <Typography>Sin información disponible</Typography>
              </CenterContainer>
            )
            : (
              <TableContainer component={Paper} sx={{ boxShadow: 4 }}>
                <Table sx={{ minWidth: '50%'}} aria-label="simple table">
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
    </div>
  )
}
