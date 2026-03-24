import { Component, Type, effect, inject, input, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { LucideAngularModule, ArrowLeft, Play, AlertCircle } from 'lucide-angular';
import { ConteudoService } from '../../core/services/conteudo.service';
import { CONTEUDO_REGISTRY } from '../conteudo/conteudo.registry';

@Component({
  selector: 'app-assunto',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, MarkdownModule, NgComponentOutlet],
  templateUrl: './assunto.component.html',
  styleUrl: './assunto.component.scss',
})
export class AssuntoComponent {
  id     = input.required<string>();
  topico = input.required<string>();

  private conteudo = inject(ConteudoService);

  icons = { ArrowLeft, Play, AlertCircle };

  // Componente rico (registry)
  componenteRico  = signal<Type<unknown> | null>(null);

  // Fallback markdown
  conteudoMd     = signal<string>('');
  usarMarkdown   = signal(false);
  carregando     = signal(true);
  erro           = signal(false);
  tituloAssunto  = signal<string>('');

  constructor() {
    effect(() => {
      const id     = this.id();
      const topico = this.topico();
      const chave  = `${id}/${topico}`;

      // Reset
      this.componenteRico.set(null);
      this.usarMarkdown.set(false);
      this.carregando.set(true);
      this.erro.set(false);

      const loader = CONTEUDO_REGISTRY[chave];

      if (loader) {
        loader()
          .then(comp => {
            this.componenteRico.set(comp as Type<unknown>);
            this.carregando.set(false);
          })
          .catch(() => {
            this.carregarMarkdown(id, topico);
          });
      } else {
        this.carregarMarkdown(id, topico);
      }
    });
  }

  private carregarMarkdown(id: string, topico: string): void {
    this.usarMarkdown.set(true);
    this.conteudo.getResumoMd(id, '7ano', topico).subscribe({
      next: md => {
        const match = md.match(/^titulo:\s*(.+)$/m);
        if (match) this.tituloAssunto.set(match[1].trim());
        this.conteudoMd.set(md.replace(/^---[\s\S]*?---\n?/, ''));
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(true);
        this.carregando.set(false);
      },
    });
  }

  nomeMateriaFormatado(): string {
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
