//Definir la clase task
export class Tarea{
    descripcion: string;
    completado: boolean;

    //Constructor de la clase Tarea
    constructor(descripcion: string) {
        this.descripcion = descripcion;
        this.completado = false;
    }

    
//Método para marcar la tarea como completado
    tareaCompletada(){
        this.completado = !this.completado;
    }
}
