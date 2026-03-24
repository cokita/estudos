import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  CheckCircle2, XCircle, ChevronRight,
  RotateCcw, Trophy, ArrowLeft, Lightbulb
} from 'lucide-angular';
import { ConteudoService } from '../../core/services/conteudo.service';
import { ProgressoService } from '../../core/services/progresso.service';
import { Assunto, Questao } from '../../core/models';

type EstadoAlternativa = 'neutro' | 'correta' | 'errada' | 'revelada';

@Component({
  selector: 'app-questoes',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './questoes.component.html',
  styleUrl: './questoes.component.scss',
})
export class QuestoesComponent implements OnInit {
  id     = input.required<string>();   // matéria id
  topico = input.required<string>();   // assunto id (kebab-case)

  private conteudo  = inject(ConteudoService);
  private progresso = inject(ProgressoService);

  icons = { CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy, ArrowLeft, Lightbulb };

  // Estado
  questoes           = signal<Questao[]>([]);
  indiceAtual        = signal(0);
  alternativaSelecionada = signal<number | null>(null);
  respondida         = signal(false);
  mostrarExplicacao  = signal(false);
  carregando         = signal(true);
  finalizado         = signal(false);
  acertos            = signal(0);
  erros              = signal(0);

  // Título do assunto (carregado via assuntos.json)
  tituloAssunto = signal<string>('');

  // Derivados
  readonly questaoAtual = computed(() => this.questoes()[this.indiceAtual()]);
  readonly total        = computed(() => this.questoes().length);
  readonly progresso$   = computed(() =>
    this.total() > 0 ? Math.round((this.indiceAtual() / this.total()) * 100) : 0
  );

  readonly estadoAlternativas = computed((): EstadoAlternativa[] => {
    const q = this.questaoAtual();
    if (!q || !this.respondida()) return q?.alternativas.map(() => 'neutro') ?? [];
    const sel = this.alternativaSelecionada();
    return q.alternativas.map((alt, i) => {
      if (alt.correta) return 'correta';
      if (i === sel && !alt.correta) return 'errada';
      return 'revelada';
    });
  });

  readonly percentualAcerto = computed(() => {
    const t = this.acertos() + this.erros();
    return t === 0 ? 0 : Math.round((this.acertos() / t) * 100);
  });

  ngOnInit(): void {
    // Carrega assuntos para pegar o título e as habilidades do tópico
    this.conteudo.getAssuntos(this.id(), '7ano').subscribe({
      next: (assuntos) => {
        const assunto = assuntos.find(a => a.id === this.topico());
        if (assunto) {
          this.tituloAssunto.set(assunto.titulo);
          this.carregarQuestoesFiltradas(assunto);
        } else {
          this.carregando.set(false);
        }
      },
      error: () => this.carregando.set(false),
    });
  }

  private carregarQuestoesFiltradas(assunto: Assunto): void {
    this.conteudo.getQuestoes(this.id(), '7ano').subscribe({
      next: (todas) => {
        const filtradas = todas.filter(q =>
          assunto.habilidades.includes(q.habilidade)
        );
        this.questoes.set(this.embaralhar(filtradas.length ? filtradas : todas));
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false),
    });
  }

  selecionar(idx: number): void {
    if (this.respondida()) return;
    this.alternativaSelecionada.set(idx);
    this.respondida.set(true);

    const q   = this.questaoAtual();
    const acertou = q.alternativas[idx].correta;
    if (acertou) this.acertos.update(v => v + 1);
    else         this.erros.update(v => v + 1);

    // Salva progresso com chave matéria__tópico
    this.progresso.registrarResposta(`${this.id()}__${this.topico()}`, q.id, acertou);
  }

  proximo(): void {
    if (this.indiceAtual() < this.total() - 1) {
      this.indiceAtual.update(v => v + 1);
      this.alternativaSelecionada.set(null);
      this.respondida.set(false);
      this.mostrarExplicacao.set(false);
    } else {
      this.finalizado.set(true);
    }
  }

  reiniciar(): void {
    this.questoes.update(qs => this.embaralhar([...qs]));
    this.indiceAtual.set(0);
    this.alternativaSelecionada.set(null);
    this.respondida.set(false);
    this.mostrarExplicacao.set(false);
    this.finalizado.set(false);
    this.acertos.set(0);
    this.erros.set(0);
  }

  toggleExplicacao(): void {
    this.mostrarExplicacao.update(v => !v);
  }

  private embaralhar<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  labelLetra(i: number): string {
    return ['A', 'B', 'C', 'D'][i] ?? String(i + 1);
  }

  nomeMateria(): string {
    const mapa: Record<string, string> = {
      matematica: 'Matemática', portugues: 'Português',
      ciencias: 'Ciências',    historia: 'História',
      geografia: 'Geografia',  ingles: 'Inglês',
    };
    return mapa[this.id()] ?? this.id();
  }

  corMateria(): string {
    const mapa: Record<string, string> = {
      matematica: '#6366f1', portugues: '#ec4899',
      ciencias: '#10b981',   historia: '#f59e0b',
      geografia: '#3b82f6',  ingles: '#8b5cf6',
    };
    return mapa[this.id()] ?? '#6366f1';
  }
}
