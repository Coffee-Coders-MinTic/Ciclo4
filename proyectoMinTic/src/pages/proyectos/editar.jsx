import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import { CREAR_AVANCE } from 'graphql/avances/mutations';
import Textarea from 'components/Textarea';
import CardAvance from 'components/CardAvance';
import moment from 'moment';
import PrivateComponent from 'components/PrivateComponent';
import { useUser } from 'context/userContext';
import { Dialog } from '@mui/material';



const EditarProyecto = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  const { userData } = useUser();
  const [showCrearAvances, setShowCrearAvances] = useState(false);

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { _id },
  });



  const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_PROYECTO);

  const submitProyectForm = (e) => {
    e.preventDefault();
    formData.presupuesto = parseFloat(formData.presupuesto);

    editarProyecto({
      variables: { _id, campos: formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el proyecto');
    }

    if (queryError) {
      toast.error('Error consultando el proyecto');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  // Change format date to input date fields
  const fechaInicio = moment(queryData.Proyecto.fechaInicio).format('YYYY-MM-DD');
  const fechaFinal = moment(queryData.Proyecto.fechaFinal).format('YYYY-MM-DD');

  // Enable or disable edit fields depends of rol
  const DisableEditInput = (userData.tipo === 'ESTUDIANTE') ? true : false;

  return (
    <>

      <div className='flew flex-col w-full items-center justify-center p-10'>
        <div>
          <Link to='/proyectos' className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'>
            Volver
          </Link>
        </div>
        <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Información del Proyecto</h1>
        <form
          onSubmit={submitProyectForm}
          onChange={updateFormData}
          ref={form}
          className='flex flex-col items-center justify-center'
        >
          <div>
            <span>Lider del Proyecto: <br /></span>
            <span>{queryData.Proyecto.lider.nombreCompleto}</span>
          </div>

          <Input
            label='Nombre del proyecto:'
            type='text'
            name='nombreProyecto'
            defaultValue={queryData.Proyecto.nombreProyecto}
            required={true}
            disabled={DisableEditInput}
          />

          <Input
            label='Presupuesto del Proyecto:'
            type='number'
            name='presupuesto'
            defaultValue={queryData.Proyecto.presupuesto}
            required={true}
            disabled={DisableEditInput}
          />

          <Input
            label='Fecha de Inicio:'
            type='date'
            name='fechaInicio'
            defaultValue={fechaInicio}
            required={true}
            disabled={DisableEditInput}
          />
          <Input
            label='Fecha de Fin:'
            type='date'
            name='fechaFinal'
            defaultValue={fechaFinal}
            required={true}
            disabled={DisableEditInput}
          />
          <Textarea name='objGenerales'
            label='Objetivos Generales'
            required={true}
            defaultValue={queryData.Proyecto.objGenerales}
            disabled={DisableEditInput}
          />
          <Textarea name='objEspecificos'
            label='Objetivos Especificos'
            required={true}
            defaultValue={queryData.Proyecto.objEspecificos}
            disabled={DisableEditInput}
          />
          <PrivateComponent roleList={['LIDER']}>
            <ButtonLoading
              disabled={Object.keys(formData).length === 0}
              loading={mutationLoading}
              text='Confirmar'
            />
          </PrivateComponent>
        </form>
        <div id='proyecto-avances' className='flex flex-col items-center justify-center mb-5'>
          <div className="relative w-full">
            <h4 className='m-4 text-2xl text-gray-800 font-bold text-center'>Avances</h4>
            <PrivateComponent roleList={['ESTUDIANTE']}>
              <button className="absolute bottom-0 right-0 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCrearAvances(true);
                }}>
                Crear avance
              </button>

            </PrivateComponent>
          </div>
          {queryData.Proyecto.avances.length ? (
            queryData.Proyecto.avances.map(function (avance) {
              return <CardAvance avance={avance} />;
            })) : (
            <div>No hay avances para este proyecto</div>
          )}
        </div>
      </div>
      <Dialog
        open={showCrearAvances}
        onClose={() => {
          setShowCrearAvances(false);
        }}
      >
        <FormCrearAvances proyecto={queryData.Proyecto} />
      </Dialog>
    </>
  );
};

const FormCrearAvances = ({ proyecto }) => {
  const { form, formData, updateFormData } = useFormData();
  const [crearAvance, { data: mutationData, loading, error: mutationError }] = useMutation(CREAR_AVANCE);
  const { userData } = useUser();

  const submitCrearAvanceForm = (e) => {
    e.preventDefault();
    crearAvance({
      variables: {
        descripcion: formData.descripcion,
        proyecto: proyecto._id,
        creador: userData._id,
      },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Avance creado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error creando el avance');
    }

  }, [mutationError]);


  return (
    <div className='p-4'>
      <h2 className='font-bold'>Nuevo avance</h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitCrearAvanceForm}
        className='flex flex-col items-center w-96'
      >
        <Textarea
          className="w-96"
          name='descripcion'
          label='Descripción'
          required={true}
          type='text'
        />

        <ButtonLoading disabled={false} loading={loading} text='Crear' />
      </form>
    </div>
  );
};

export default EditarProyecto;
