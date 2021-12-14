import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PrivateComponent from 'components/PrivateComponent';
import { Dialog } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import ButtonLoading from 'components/ButtonLoading';
import { EDITAR_AVANCE } from 'graphql/avances/mutations';
import useFormData from 'hooks/useFormData';
import Textarea from './Textarea';
import { toast } from 'react-toastify';


const CardAvance = ({ avance }) => {
    const fechaAvance = moment(avance.fechaAvance).format('YYYY-MM-DD');
    const [showAvances, setShowAvances] = useState(false);
    return (
        <>
            <div className="max-w-sm w-full lg:max-w-full lg:flex mt-5">
                <div className="w-full border border-gray-400 lg:border lg:border-t lg:border-gray-400 bg-white p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-12">
                        <div className="text-gray-900 font-bold text-xl mb-2">Descripción del avance</div>
                        <p className="text-gray-700 text-base">{avance.descripcion}</p>
                    </div>
                    <div className="flex items-center">
                        <div className="text-sm">
                            <p className="text-gray-900 leading-none"><b>Creador avance:</b> {avance.creador.nombreCompleto}</p>
                            <p className="text-gray-600"><b>Fecha avance:</b> {fechaAvance}</p>
                        </div>
                    </div>
                    <PrivateComponent roleList={['ESTUDIANTE']}>
                        <div className="relative">
                            <button className="absolute bottom-0 right-0 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowAvances(true);
                                }}>
                                Editar avance
                            </button>

                        </div>
                    </PrivateComponent>



                    <div className="mt-6">
                        <hr />
                        <div className="text-gray-900 font-bold text-xl mt-3 mb-2">
                            Observaciones del lider
                            <PrivateComponent roleList={['LIDER']}>
                                <div className="relative">
                                    <button className="absolute bottom-0 right-0 text-sm bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowAvances(true);
                                        }}>
                                        {avance.observaciones ? (
                                            <span>Editar observación</span>
                                        ) : (
                                            <span>Crear observación</span>
                                        )}
                                    </button>

                                </div>
                            </PrivateComponent>

                        </div>
                        {avance.observaciones ? (
                            <p>{avance.observaciones}</p>
                        ) : (
                            <p>Aún no hay observaciones</p>
                        )}
                    </div>


                </div>
            </div>
            <Dialog
                open={showAvances}
                onClose={() => {
                    setShowAvances(false);
                }}
            >
                <FormEditAvances avance={avance} />
            </Dialog>
        </>
    )
}

const FormEditAvances = ({ avance }) => {
    const { form, formData, updateFormData } = useFormData();
    const [editarAvance, { data: dataMutation, loading, error: mutationError }] = useMutation(EDITAR_AVANCE);

    const _id = avance._id;

    const submitAvanceForm = (e) => {
        e.preventDefault();
        editarAvance({
            variables: {
                _id,
                descripcion: formData.descripcion,
                observaciones: formData.observaciones,
            },
        });
    };

    useEffect(() => {
        if (dataMutation) {
            toast.success('Avance creado correctamente');
        }
    }, [dataMutation]);

    useEffect(() => {
        if (mutationError) {
            toast.error('Error creando el avance');
        }

    }, [mutationError]);

    return (
        <div className='p-4'>
            <h2 className='font-bold'>Editar</h2>
            <form
                ref={form}
                onChange={updateFormData}
                onSubmit={submitAvanceForm}
                className='flex flex-col items-center w-96'
            >
                <PrivateComponent roleList={['ESTUDIANTE']}>
                    <Textarea
                        className="w-96"
                        name='descripcion'
                        label='Avance'
                        required={true}
                        type='text'
                        defaultValue={avance.descripcion}
                    />
                </PrivateComponent>

                <PrivateComponent roleList={['LIDER']}>
                    <Textarea
                        className="w-96"
                        name='observaciones'
                        label='Observaciones'
                        required={true}
                        type='text'
                        defaultValue={avance.observaciones}
                    />
                </PrivateComponent>

                <input type="hidden" name="id" defaultValue={avance._id} />

                <ButtonLoading disabled={false} loading={loading} text='Guardar' />
            </form>
        </div>
    );
};

export default CardAvance