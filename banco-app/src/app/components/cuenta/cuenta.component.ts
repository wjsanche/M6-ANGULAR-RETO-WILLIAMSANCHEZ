import { Component } from '@angular/core';
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {
  cuentaId: number = 0; // 
  saldo: number = 0;
  monto: number = 0;
  mensaje: string = '';
  cuentaIdTransacciones: number = 0; // Para buscar transacciones

  constructor(private cuentaService: CuentaService) {}

  obtenerSaldo() {
    if (!this.cuentaId || this.cuentaId <= 0) {
      this.mensaje = 'Ingrese un ID de cuenta válido.';
      return;
    }
  
    this.cuentaService.getSaldo(this.cuentaId).subscribe({
      next: (response) => {
        this.saldo = response.saldo;
      // ✅ Mostrar mensaje SOLO si no hay otro mensaje activo
      if (!this.mensaje) {
        this.mensaje = 'Saldo obtenido correctamente';
        
        // 🔹 Limpiar mensaje después de 2 segundos
        setTimeout(() => {
          if (this.mensaje === 'Saldo obtenido correctamente') {
            this.mensaje = '';
          }
        }, 2000);
      }
      },
      error: (error) => {
        console.error('Error al obtener saldo:', error);
        this.mensaje = 'Error al consultar saldo. Verifique el ID de la cuenta.';
      }
    });
  }

  depositar() {
    if (this.monto <= 0) {
      this.mensaje = 'El monto debe ser mayor a 0';
      return;
    }
  
    this.cuentaService.depositar(this.cuentaId, this.monto).subscribe(
      (response) => {
        this.mensaje = response.mensaje || 'Deposito realizado con éxito';

        // ✅ Primero mostramos el mensaje del retiro
        setTimeout(() => {
          this.mensaje = '';
          // ✅ Luego consultamos el saldo SIN modificar el mensaje
          this.obtenerSaldo();
        }, 2000);
      },
      (error) => {
        console.error("Error en el deposito:", error); // 🔹 Verifica si hay errores en consola
        this.mensaje = error.error?.mensaje || 'Error al realizar el deposito';
      }
    );
  }
  

  retirar() {
    if (this.monto <= 0) {
      this.mensaje = 'El monto debe ser mayor a 0';
      return;
    }
  
    this.cuentaService.retirar(this.cuentaId, this.monto).subscribe(
      (response) => {
        this.mensaje = response.mensaje || 'Retiro realizado con éxito';

        // ✅ Primero mostramos el mensaje del retiro
        setTimeout(() => {
          this.mensaje = '';
          // ✅ Luego consultamos el saldo SIN modificar el mensaje
          this.obtenerSaldo();
        }, 2000);
      },
      (error) => {
        console.error("Error en el retiro:", error); // 🔹 Verifica si hay errores en consola
        this.mensaje = error.error?.mensaje || 'Error al realizar el retiro';
      }
    );
  }
  transacciones: any[] = [];

  buscarTransacciones() {
    if (!this.cuentaIdTransacciones) {
      this.mensaje = 'Debe ingresar un ID de cuenta para buscar transacciones';
      return;
    }
  
    this.cuentaService.getTransacciones(this.cuentaIdTransacciones).subscribe(
      (response) => {
        console.log('Transacciones recibidas:', response); // Para depuración
        this.transacciones = Array.isArray(response) ? response : []; // Asegura que sea un array
        this.mensaje = this.transacciones.length > 0 
          ? `Se encontraron ${this.transacciones.length} transacciones`
          : 'No hay transacciones para esta cuenta';
      },
      (error) => {
        console.error('Error al obtener transacciones:', error); // Para depuración
        this.mensaje = 'Error al obtener transacciones';
        this.transacciones = [];
      }
    );
  }

  limpiarBusqueda() {
    this.cuentaIdTransacciones = 0; // Borra el ID ingresado
    this.transacciones = []; // Vacía la lista de transacciones
    this.mensaje = ''; // Borra el mensaje de estado
  }
}
