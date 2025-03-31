import { Component } from '@angular/core';
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent {
  cuentaId: number = 1; // Puedes cambiarlo
  transacciones: any[] = [];

  constructor(private cuentaService: CuentaService) {}

  obtenerTransacciones() {
    this.cuentaService.getTransacciones(this.cuentaId).subscribe(
      (data) => {
        this.transacciones = data;
      },
      (error) => {
        console.error('Error al obtener transacciones', error);
      }
    );
  }
}
