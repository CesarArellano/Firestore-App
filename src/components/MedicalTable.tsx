import { ChangeEvent, useEffect, useState } from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { query, where } from 'firebase/firestore';
import { collectionRef, getMedicalRecords } from '../firebase/firebase';
import { MedicalModel } from '../interfaces/medical.model';
import { RowContainer } from '../MainApp';
import { useForm } from '../hooks/useForm';
import { CircularProgressIndicator } from './shared/CircularProgressIndicator';
import { NoDataText } from './shared/NoDataText';

export const MedicalTable = () => {
  const { values, handleInputChange } = useForm({
    age: '0'
  })

  const [ isLoading, setIsLoading ] = useState(false);
  const [ medicalList, setMedicalList ] = useState<MedicalModel[]>([]);

  const handleSearch = async () => {
    setIsLoading( true );
    setMedicalList( await getMedicalRecords(query(collectionRef, where("age", ">=", parseInt(values.age) )) ) );
    setIsLoading( false );
  }

  useEffect(() =>{
    const getMedicalHistory = async () => {
      setIsLoading( true );
      setMedicalList( await getMedicalRecords( collectionRef ) );
      setIsLoading( false );
    }
    
    getMedicalHistory()
  }, [])

  return (
    <div
      style={{ width: '100%' }}
    >
      <RowContainer
        style={{ margin: 0, justifyContent: 'space-between' }}
      >
        <TextField 
          label="Filtra por edad"
          variant="filled"
          onChange={({target}: ChangeEvent<HTMLInputElement>) => handleInputChange(target.value, 'age')}
        />
        <Box sx={{ height: 10 }}/>
        <Button variant="contained" onClick={ handleSearch }> Buscar </Button>
      </RowContainer>
      <Box sx={{ height: 15 }}/>
        {
          ( isLoading )
          ? <CircularProgressIndicator />
          : ( medicalList.length === 0 )
            ? <NoDataText />
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
