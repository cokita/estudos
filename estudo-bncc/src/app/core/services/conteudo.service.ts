import { Injectable, inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assunto, Questao } from '../models';

@Injectable({ providedIn: 'root' })
export class ConteudoService {
  private http = inject(HttpClient);
  private baseHref = (inject(APP_BASE_HREF, { optional: true }) ?? '/').replace(/\/$/, '');

  private url(path: string): string {
    return `${this.baseHref}/assets/content/${path}`;
  }

  getAssuntos(materia: string, ano: string): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(this.url(`${materia}/${ano}/assuntos.json`));
  }

  getQuestoes(materia: string, ano: string): Observable<Questao[]> {
    return this.http.get<Questao[]>(this.url(`${materia}/questoes/${ano}.json`));
  }

  getResumoMd(materia: string, ano: string, topico: string): Observable<string> {
    return this.http.get(this.url(`${materia}/${ano}/${topico}.md`), {
      responseType: 'text',
    });
  }
}
