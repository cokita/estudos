import { Injectable, computed, signal } from '@angular/core';
import { ProgressoMateria, RespostaUsuario } from '../models';

const STORAGE_KEY = 'estudo-bncc-progresso';

@Injectable({ providedIn: 'root' })
export class ProgressoService {
  private respostas = signal<Record<string, RespostaUsuario[]>>(this.carregar());

  readonly percentualPorMateria = computed(() => {
    const mapa: Record<string, number> = {};
    const dados = this.respostas();
    for (const materia of Object.keys(dados)) {
      const lista = dados[materia];
      if (lista.length === 0) { mapa[materia] = 0; continue; }
      const acertos = lista.filter(r => r.acertou).length;
      mapa[materia] = Math.round((acertos / lista.length) * 100);
    }
    return mapa;
  });

  readonly totalRespostas = computed(() =>
    Object.values(this.respostas()).flat().length
  );

  registrarResposta(materia: string, questaoId: string, acertou: boolean): void {
    this.respostas.update(atual => {
      const lista = atual[materia] ?? [];
      const jaExiste = lista.some(r => r.questaoId === questaoId);
      const nova: RespostaUsuario = { questaoId, acertou, respondidoEm: Date.now() };
      const novaLista = jaExiste
        ? lista.map(r => r.questaoId === questaoId ? nova : r)
        : [...lista, nova];
      const atualizado = { ...atual, [materia]: novaLista };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizado));
      return atualizado;
    });
  }

  progressoPorMateria(materia: string): ProgressoMateria {
    const lista = this.respostas()[materia] ?? [];
    return { total: lista.length, acertos: lista.filter(r => r.acertou).length };
  }

  private carregar(): Record<string, RespostaUsuario[]> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }
}
