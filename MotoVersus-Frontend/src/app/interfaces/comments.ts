export interface Comments {
  _id: string;
  texto: string;
  usuario: {
    _id: string;
    nombre: string;
    fotoPerfil: string;
  };
  fecha: string | Date;
  __v?: number;
}