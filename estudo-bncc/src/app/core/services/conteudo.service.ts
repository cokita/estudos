import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assunto, Questao } from '../models';

@Injectable({ providedIn: 'root' })
export class ConteudoService {
  private http = inject(HttpClient);

  getAssuntos(materia: string, ano: string): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(`/assets/content/${materia}/${ano}/assuntos.json`);
  }

  getQuestoes(materia: string, ano: string): Observable<Questao[]> {
    return this.http.get<Questao[]>(`/assets/content/${materia}/questoes/${ano}.json`);
  }

  getResumoMd(materia: string, ano: string, topico: string): Observable<string> {
    return this.http.get(`/assets/content/${materia}/${ano}/${topico}.md`, {
      responseType: 'text',
    });
  }
}
