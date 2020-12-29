export interface Libro {
    activo?: boolean;
    _id?: string;
    titulo?: string;
    autor?: string;
    cantidad?: number;
    precio?: number;
    codigo?: string;
    __v?: number;
}
export interface getLibrosResponse {
    ok?: boolean;
    libros?: Libro[];
    totalReg?: number;
}

export interface Usuario {
  activo?: boolean;
  role?: string;
  _id?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  password?: any;
  __v?: number;
}

export interface getUsuariosResponse {
  ok?: boolean;
  usuarios?: Usuario[];
}

export interface loginResponse {
  ok?: boolean;
  usuario?: Usuario;
  token?: string;
}

export interface Cliente {
  nombre?: string;
  apellidos?: string;
  nroDoc?: string;
  email?: string;
  telefono?: string;
  _id?: string;
}

