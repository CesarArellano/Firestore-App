import { useForm } from "./hooks/useForm"
import { MedicalModel } from './interfaces/medical.model';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { getMedicalRecords, registerNewMedicalRecord } from './firebase/firebase';

export const MainApp = () => {
  const [records, setRecords] = useState(0);
  const [ medicalList, setMedicalList ] = useState<MedicalModel[]>([]);
  const { values, handleInputChange, reset } = useForm<MedicalModel>({
    name: '',
    description: '',
    doctorName: '',
  });

  const { name, description, doctorName } = values;

  const handleSubmit = async ( e:SyntheticEvent ) => {
    e.preventDefault();
    registerNewMedicalRecord(values);
    setRecords(medicalList.length + 1);
    reset();
  }

  useEffect(() =>{
    getMedicalHistory()
  }, [ records ])
  
  const getMedicalHistory = async () => {
    setMedicalList( await getMedicalRecords() );
  }

  return (
    <>
      <h2>Registros</h2>
      <hr/>
      {
        (medicalList.length === 0)
          ? <h4>No hay registros médicos</h4>
          : medicalList.map((value: MedicalModel) => (
            <div key={ value.id }>
              <p>Nombre: { value.name }</p>
              <p>Nombre del doctor: { value.doctorName }</p>
              <p>Descripción: { value.description }</p>
            </div>
          ))
      }
      <form
        onSubmit={ handleSubmit }
      >
        <input
          value={ name }
          type="text"
          placeholder="Escribe el nombre"
          onChange={ ({ target }: ChangeEvent<HTMLInputElement> ) => handleInputChange(target.value, 'name') }
          required
        />
        <input
          value={ description }
          type="text"
          placeholder="Escribe la descripción"
          onChange={ ( { target }: ChangeEvent<HTMLInputElement>  ) => handleInputChange(target.value, 'description') }
          required
        />
        <input
          value={ doctorName }
          type="text"
          placeholder="Escribe el nombre del doctor"
          onChange={ ( { target }: ChangeEvent<HTMLInputElement> ) => handleInputChange(target.value, 'doctorName') }
          required
        />
        <button type="submit"> Registrar </button>
      </form>
    </>
  )
}
