import { UsuarioModel } from './usuario.js';
//import bcrypt from 'bcrypt';

const resolversUsuario = {
  Query: {
    Usuarios: async (parent, args) => {
      const usuarios = await UsuarioModel.find().populate([
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
      //const salt = await bcrypt.genSalt(10);
      //const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await UsuarioModel.create({
        correo: args.correo,
        nombreCompleto: args.nombreCompleto,
        identificacion: args.identificacion,
        tipo: args.tipo,
        //password: hashedPassword,
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