import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Question } from '../models/question';

@Injectable({ providedIn: 'root' })
export class RestService {
  constructor(private httpClient: HttpClient) {}

  public getQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>('/api');
  }
}
