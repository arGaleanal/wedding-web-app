export type Asistencia = 'SI' | 'NO' | 'TALVEZ' ;

export interface ConfirmacionesArray {
  id: string;
  asistencia: Asistencia;
  nombreInvitado: string;
  numeroInvitados: number;
  createdAt: any;
}
