import { UsuarioModel } from './usuario.js';


const resolversUsuario = {
  Query: {
    Usuarios: async (parent, args) => {
      const usuarios = await UsuarioModel.find({ ...args.filtro }).populate([
        {
          path: 'inscripciones',
          populate: {
            path: 'proyecto',
            populate: [{ path: 'lider' }, { path: 'avances' }],
          },
        },
        {
          path: 'proyectosLiderados',
        },
      ]);
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await UsuarioModel.findOne({ _id: args._id });
      return usuario;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const usuarioCreado = await UsuarioModel.create({
        correo: args.correo,
        nombreCompleto: args.nombreCompleto,
        identificacion: args.identificacion,
        tipo: args.tipo,
      });

      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UsuarioModel.findByIdAndUpdate(
        args._id,
        {
          correo: args.correo,
          nombreCompleto: args.nombreCompleto,
          identificacion: args.identificacion,
          estado: args.estado,
        },
        { new: true }
      );

      return usuarioEditado;
    },
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await UsuarioModel.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const usuarioEliminado = await UsuarioModel.findOneAndDelete({ correo: args.correo });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };