//Definir la clase task
var Tarea = /** @class */ (function () {
    //Constructor de la clase Tarea
    function Tarea(descripcion) {
        this.descripcion = descripcion;
        this.completado = false;
    }
    //Método para marcar la tarea como completado
    Tarea.prototype.tareaCompletada = function () {
        this.completado = !this.completado;
    };
    return Tarea;
}());
export { Tarea };
