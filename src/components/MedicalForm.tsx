import Swal from 'sweetalert2';
import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, styled, TextField, Typography } from '@mui/material';
import { ChangeEvent, SyntheticEvent } from 'react'
import { registerNewMedicalRecord } from '../firebase/firebase';
import { useForm } from '../hooks/useForm';
import { MedicalModel } from '../interfaces/medical.model';
import { Container } from './shared/Container';

export const CustomCard = styled(Card)(() => ({
  marginLeft: 20,
  width: 600,
  '@media screen and (max-width: 900px)': {
    marginLeft: 0,
    marginTop: 10,
    padding: 20,
    width: 'auto'
  },
}));

export const MedicalForm = () => {
  const { values, handleInputChange, reset } = useForm<MedicalModel>({
    name: '',
    doctorName: '',
    sex: '',
    age: '',
    description: '',
  });

  const { name, description, doctorName, age, sex } = values;

  const genres = ['Hombre', 'Mujer'];

  const handleSubmit = async ( e:SyntheticEvent ) => {
    e.preventDefault();
    
    if( !genres.includes(sex) ) {
      return Swal.fire('¡Upps!', 'Seleccione un género', 'error');
    }

    registerNewMedicalRecord({
      name,
      doctorName,
      sex,
      age: parseInt(age as string),
      description,
    });
    
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
            label="Escribe el nombre del paciente"
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
          <FormControl variant="filled">
            <InputLabel id="demo-simple-select-filled">Seleccione el género</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={ sex as any }
              label="Seleccione el género"
              variant='filled'
              onChange={ ( { target }: SelectChangeEvent<HTMLInputElement>  ) => handleInputChange(target.value as string, 'sex') }
            > 
              <MenuItem value="Hombre">Hombre</MenuItem>
              <MenuItem value="Mujer">Mujer</MenuItem>
            </Select>
          </FormControl>
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
