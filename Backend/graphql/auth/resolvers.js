import { UsuarioModel } from '../../models/usuarios/usuario.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/tokenUtils.js';

const resolversAutenticacion = {
  Mutation: {
    registro: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await UsuarioModel.create({
        nombreCompleto: args.nombreCompleto,
        identificacion: args.identificacion,
        correo: args.correo,
        tipo: args.tipo,
        password: hashedPassword,
      });
      console.log('usuario creado', usuarioCreado);
      return {
        token: generateToken({
          _id: usuarioCreado._id,
          nombre: usuarioCreado.nombre,
          apellido: usuarioCreado.apellido,
          identificacion: usuarioCreado.identificacion,
          correo: usuarioCreado.correo,
          tipo: usuarioCreado.tipo,
        }),
      };
    },

    login: async (parent, args) => {
      const usuarioEcontrado = await UsuarioModel.findOne({ correo: args.correo });
      if (await bcrypt.compare(args.password, usuarioEcontrado.password)) {
        return {
          token: generateToken({
            _id: usuarioEcontrado._id,
            nombre: usuarioEcontrado.nombre,
            apellido: usuarioEcontrado.apellido,
            identificacion: usuarioEcontrado.identificacion,
            correo: usuarioEcontrado.correo,
            tipo: usuarioEcontrado.tipo,
          }),
        };
      }
    },

    refreshToken: async (parent, args, context) => {
      console.log('contexto', context);
      if (!context.userData) {
        return {
          error: 'token no valido',
        };
      } else {
        return {
          token: generateToken({
            _id: context.userData._id,
            nombre: context.userData.nombre,
            apellido: context.userData.apellido,
            identificacion: context.userData.identificacion,
            correo: context.userData.correo,
            tipo: context.userData.tipo,
          }),
        };
      }
      // valdiar que el contexto tenga info del usuario. si si, refrescar el token
      // si no devolver null para que en el front redirija al login.
    },
  },
};

export { resolversAutenticacion };
