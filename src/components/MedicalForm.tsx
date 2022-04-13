import { Box, Button, Card, InputLabel, MenuItem, Select, SelectChangeEvent, styled, TextField, Typography } from '@mui/material';
import { ChangeEvent, SyntheticEvent } from 'react'
import { registerNewMedicalRecord } from '../firebase/firebase';
import { useForm } from '../hooks/useForm';
import { MedicalModel } from '../interfaces/medical.model';
import { Container } from './shared/Container';

export const CustomCard = styled(Card)(() => ({
  width: 500,
  marginLeft: 20,
  '@media screen and (max-width: 1200px)': {
    marginLeft: 0,
    marginTop: 20,
    width: '100%',
  },
}));

export const MedicalForm = () => {
  const { values, handleInputChange, reset } = useForm<MedicalModel>({
    name: '',
    doctorName: '',
    sex: 'Mujer',
    age: '',
    description: '',
  });

  const { name, description, doctorName, age } = values;

  const handleSubmit = async ( e:SyntheticEvent ) => {
    e.preventDefault();
    registerNewMedicalRecord(values);
    reset();
  }

  return (
    <CustomCard
      sx={{ boxShadow: 4 }}
    >
      <form
        onSubmit={ handleSubmit }
      >
        <Container>
          <Typography variant='h5'>Nuevo registro</Typography>
          <Box sx={{ height: 10 }} />
          <TextField
            label="Escribe el nombre del doctor"
            value={ doctorName }
            type="text"
            variant='filled'
            onChange={ ( { target }: ChangeEvent<HTMLInputElement> ) => handleInputChange(target.value, 'doctorName') }
            required
          />
          <Box sx={{ height: 20 }} />
          <TextField
            value={ name }
            type="text"
            label="Escribe el nombre"
            variant='filled'
            onChange={ ({ target }: ChangeEvent<HTMLInputElement> ) => handleInputChange(target.value, 'name') }
            required
          />
          <Box sx={{ height: 20 }} />
          <TextField
            value={ age }
            label="Escriba su edad"
            inputProps={{ pattern: "[0-9]{1,3}" }}
            variant='filled'
            onChange={ ( { target }: ChangeEvent<HTMLInputElement>  ) => handleInputChange(target.value, 'age') }
            required
          />
          <Box sx={{ height: 20 }} />
          <InputLabel>Seleccione el género</InputLabel>
          <Select
            variant='filled'
            onChange={ ( { target }: SelectChangeEvent<HTMLInputElement>  ) => handleInputChange(target.value as string, 'sex') }
          >
            <MenuItem value={'Hombre'}>Hombre</MenuItem>
            <MenuItem value={'Mujer'}>Mujer</MenuItem>
          </Select>
          <Box sx={{ height: 20 }} />
          <TextField
            multiline
            rows={4}
            value={ description }
            type="text"
            variant='filled'
            label="Escribe la descripción"
            onChange={ ( { target }: ChangeEvent<HTMLInputElement>  ) => handleInputChange(target.value, 'description') }
            required
          />
          <Box sx={{ height: 20 }} />
          <Button variant="contained" type="submit"> Registrar </Button>
        </Container>
        
      </form>
    </CustomCard>
  )
}
