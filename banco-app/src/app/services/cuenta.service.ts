import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private apiUrl = 'http://localhost:8080/api/cuentas'; // Ajusta según la URL de tu API

  constructor(private http: HttpClient) { }

  getSaldo(cuentaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${cuentaId}/saldo`);
  }

  depositar(cuentaId: number, monto: number): Observable<any> {
    const depositoDTO = { monto };
    return this.http.post<any>(`${this.apiUrl}/${cuentaId}/depositar`, 
      depositoDTO);
  }

  retirar(cuentaId: number, monto: number): Observable<any> {
    const retiroDTO = { monto };
    return this.http.post<any>(`${this.apiUrl}/${cuentaId}/retirar`, 
      retiroDTO);
  }

  getTransacciones(cuentaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${cuentaId}/transacciones`);
  }
}