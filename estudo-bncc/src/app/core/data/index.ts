import { Assunto, Questao } from '../models';
import { ASSUNTOS_HISTORIA_7ANO, QUESTOES_HISTORIA_7ANO } from './historia.data';
import { ASSUNTOS_MATEMATICA_7ANO, QUESTOES_MATEMATICA_7ANO } from './matematica.data';

const ASSUNTOS: Record<string, Assunto[]> = {
  'historia/7ano': ASSUNTOS_HISTORIA_7ANO,
  'matematica/7ano': ASSUNTOS_MATEMATICA_7ANO,
};

const QUESTOES: Record<string, Questao[]> = {
  'historia/7ano': QUESTOES_HISTORIA_7ANO,
  'matematica/7ano': QUESTOES_MATEMATICA_7ANO,
};

export function getAssuntos(materia: string, ano: string): Assunto[] {
  return ASSUNTOS[`${materia}/${ano}`] ?? [];
}

export function getQuestoes(materia: string, ano: string): Questao[] {
  return QUESTOES[`${materia}/${ano}`] ?? [];
}
