import { Injectable, inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Assunto, Questao } from '../models';
import { getAssuntos, getQuestoes } from '../data';

@Injectable({ providedIn: 'root' })
export class ConteudoService {
  private http = inject(HttpClient);
  private baseHref = (inject(APP_BASE_HREF, { optional: true }) ?? '/').replace(/\/$/, '');

  getAssuntos(materia: string, ano: string): Observable<Assunto[]> {
    return of(getAssuntos(materia, ano));
  }

  getQuestoes(materia: string, ano: string): Observable<Questao[]> {
    return of(getQuestoes(materia, ano));
  }

  getResumoMd(materia: string, ano: string, topico: string): Observable<string> {
    const url = `${this.baseHref}/assets/content/${materia}/${ano}/${topico}.md`;
    return this.http.get(url, { responseType: 'text' });
  }
}
