export interface Alternativa {
  texto: string;
  correta: boolean;
}

export interface Questao {
  id: string;
  habilidade: string;
  titulo: string;
  enunciado: string;
  alternativas: Alternativa[];
  explicacao: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
}

export interface Assunto {
  id: string;          // kebab-case — bate com nome do .md
  titulo: string;
  habilidades: string[];
  descricao: string;
}

export interface Materia {
  id: string;
  nome: string;
  cor: string;
  corClasse: string;      // classe Tailwind para bg
  corIcone: string;       // classe Tailwind para text
  corBorda: string;       // classe Tailwind para border
  iconeLucide: string;    // nome do ícone Lucide
  anos: string[];
}

export interface RespostaUsuario {
  questaoId: string;
  acertou: boolean;
  respondidoEm: number;
}

export interface ProgressoMateria {
  total: number;
  acertos: number;
}
