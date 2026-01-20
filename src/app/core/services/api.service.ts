import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cattle, PaginatedResponse, QueryParams } from '@/core/models/api.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private http = inject(HttpClient);
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

    get<T>(path: string, params: QueryParams = {}): Observable<T> {
        const filteredParams: Record<string, string | number | boolean> = {};
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                filteredParams[key] = value;
            }
        });
        const httpParams = new HttpParams({ fromObject: filteredParams });
        return this.http.get<T>(`${this.baseUrl}${path}`, { params: httpParams });
    }

    post<T>(path: string, body: unknown): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}${path}`, body);
    }

    put<T>(path: string, body: unknown): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}${path}`, body);
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}${path}`);
    }

    list(query: QueryParams): Observable<PaginatedResponse<Cattle>> {
        return of({ 
            data: [], 
            totalRows: 0,
            page: query.page || 1,
            pageSize: query.pageSize || 10,
            totalPages: 0
        });
    }
}
