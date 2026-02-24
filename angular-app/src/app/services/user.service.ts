import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    year?: string;
    department?: string;
    createdAt?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:5000/api/users';

    constructor(private http: HttpClient) { }

    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, user);
    }

    login(credentials: any): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/login`, credentials);
    }

    getUser(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`);
    }

    updateUser(id: string, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, user);
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }
}
