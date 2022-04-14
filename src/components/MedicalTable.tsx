import { ChangeEvent, useEffect, useState } from 'react'
import { Box, Button, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { onSnapshot, query, where } from 'firebase/firestore';
import { collectionRef, getMedicalRecords } from '../firebase/firebase';
import { MedicalModel } from '../interfaces/medical.model';
import { RowContainer } from '../MainApp';
import { useForm } from '../hooks/useForm';
import { CircularProgressIndicator } from './shared/CircularProgressIndicator';
import { NoDataText } from './shared/NoDataText';
import Swal from 'sweetalert2';

export const FullContainer = styled('div')(() => ({
  width: '100%'
}));

export const MedicalTable = () => {
  const { values, handleInputChange } = useForm({
    age: ''
  })

  const [ isLoading, setIsLoading ] = useState(false);
  const [ medicalList, setMedicalList ] = useState<MedicalModel[]>([]);

  const { age } = values;

  const handleSearch = async () => {
    if( !age.match(/^[0-9]+$/) ){
      return Swal.fire('Upps', 'Atención, inserte sólo dígitos', 'error');
    }
    setIsLoading( true );
    setMedicalList( await getMedicalRecords(query(collectionRef, where("age", ">=", parseInt(age ?? 0) )) ) );
    setIsLoading( false );
  }

  useEffect(() =>{
    onSnapshot(collectionRef, (snapshot) => {
      setMedicalList( snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }) as MedicalModel
      ))
    });
  }, [])

  return (
    <FullContainer>
      <RowContainer
        style={{ margin: 0 }}
      >
        <TextField
          fullWidth
          label="Buscar por edad mínima"
          value={ age }
          variant="filled"
          onChange={({target}: ChangeEvent<HTMLInputElement>) => handleInputChange(target.value, 'age')}
        />
        <Box sx={{ height: 10 }}/>
        <Button variant="contained" endIcon={ <SearchIcon /> } onClick={ handleSearch } > Buscar </Button>
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
                        hover
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
    </FullContainer>
  )
}
