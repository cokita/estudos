import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  ArrowLeft, BookOpen, ChevronRight, CheckCircle2,
  Calculator, FlaskConical, Landmark, Globe, Languages,
  Shapes, Equal, Hash, Percent, Triangle
} from 'lucide-angular';
import { ConteudoService } from '../../core/services/conteudo.service';
import { ProgressoService } from '../../core/services/progresso.service';
import { Assunto } from '../../core/models';

const MATERIA_META: Record<string, { nome: string; cor: string; icone: string }> = {
  matematica: { nome: 'Matemática', cor: '#6366f1', icone: 'Calculator' },
  portugues:  { nome: 'Português',  cor: '#ec4899', icone: 'BookOpen' },
  ciencias:   { nome: 'Ciências',   cor: '#10b981', icone: 'FlaskConical' },
  historia:   { nome: 'História',   cor: '#f59e0b', icone: 'Landmark' },
  geografia:  { nome: 'Geografia',  cor: '#3b82f6', icone: 'Globe' },
  ingles:     { nome: 'Inglês',     cor: '#8b5cf6', icone: 'Languages' },
};

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './materia.component.html',
  styleUrl: './materia.component.scss',
})
export class MateriaComponent {
  id = input.required<string>();

  private conteudo  = inject(ConteudoService);
  private progresso = inject(ProgressoService);

  icons = { ArrowLeft, BookOpen, ChevronRight, CheckCircle2,
            Calculator, FlaskConical, Landmark, Globe, Languages,
            Shapes, Equal, Hash, Percent, Triangle };

  assuntos   = signal<Assunto[]>([]);
  carregando = signal(true);

  readonly meta = computed(() => MATERIA_META[this.id()] ?? { nome: this.id(), cor: '#6366f1', icone: 'BookOpen' });

  readonly pct = this.progresso.percentualPorMateria;

  constructor() {
    effect(() => {
      const id = this.id();
      this.carregando.set(true);
      this.conteudo.getAssuntos(id, '7ano').subscribe({
        next:  a  => { this.assuntos.set(a); this.carregando.set(false); },
        error: () => this.carregando.set(false),
      });
    });
  }

  getPercentualAssunto(assunto: Assunto): number {
    // Percentual baseado no progresso das questões deste assunto
    const chave = `${this.id()}__${assunto.id}`;
    return this.pct()[chave] ?? 0;
  }
}
