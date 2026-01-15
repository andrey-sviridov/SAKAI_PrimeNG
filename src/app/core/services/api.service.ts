import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cattle } from '@/layout/component/custom-cattle-table/custom-cattle-table';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private http = inject(HttpClient);
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com'; // Ваш базовый URL

    get<T>(path: string, params: any = {}): Observable<T> {
        const httpParams = new HttpParams({ fromObject: params });
        return this.http.get<T>(`${this.baseUrl}${path}`, { params: httpParams });
    }

    post<T>(path: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}${path}`, body);
    }

    put<T>(path: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}${path}`, body);
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}${path}`);
    }

    list(query: any): Observable<{ data: Cattle[]; totalRows: number }> {
        // Здесь должен быть реальный HTTP запрос
        return of({ data: [], totalRows: 0 });
    }

}
