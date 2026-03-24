import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Calculator, BookOpen, FlaskConical, Landmark, Globe, Languages, Trophy, Zap } from 'lucide-angular';
import { ProgressoService } from '../../core/services/progresso.service';
import { Materia } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private progresso = inject(ProgressoService);

  icons = { Trophy, Zap, Calculator, BookOpen, FlaskConical, Landmark, Globe, Languages };

  readonly pct = this.progresso.percentualPorMateria;

  materias: Materia[] = [
    {
      id: 'matematica',
      nome: 'Matemática',
      cor: '#6366f1',
      corClasse: 'bg-indigo-50',
      corIcone: 'text-indigo-500',
      corBorda: 'border-indigo-200',
      iconeLucide: 'Calculator',
      anos: ['7ano'],
    },
    {
      id: 'portugues',
      nome: 'Português',
      cor: '#ec4899',
      corClasse: 'bg-pink-50',
      corIcone: 'text-pink-500',
      corBorda: 'border-pink-200',
      iconeLucide: 'BookOpen',
      anos: ['7ano'],
    },
    {
      id: 'ciencias',
      nome: 'Ciências',
      cor: '#10b981',
      corClasse: 'bg-emerald-50',
      corIcone: 'text-emerald-500',
      corBorda: 'border-emerald-200',
      iconeLucide: 'FlaskConical',
      anos: ['7ano'],
    },
    {
      id: 'historia',
      nome: 'História',
      cor: '#f59e0b',
      corClasse: 'bg-amber-50',
      corIcone: 'text-amber-500',
      corBorda: 'border-amber-200',
      iconeLucide: 'Landmark',
      anos: ['7ano'],
    },
    {
      id: 'geografia',
      nome: 'Geografia',
      cor: '#3b82f6',
      corClasse: 'bg-blue-50',
      corIcone: 'text-blue-500',
      corBorda: 'border-blue-200',
      iconeLucide: 'Globe',
      anos: ['7ano'],
    },
    {
      id: 'ingles',
      nome: 'Inglês',
      cor: '#8b5cf6',
      corClasse: 'bg-violet-50',
      corIcone: 'text-violet-500',
      corBorda: 'border-violet-200',
      iconeLucide: 'Languages',
      anos: ['7ano'],
    },
  ];

  getIcone(nome: string) {
    return this.icons[nome as keyof typeof this.icons];
  }

  getPercentual(materiaId: string): number {
    return this.pct()[materiaId] ?? 0;
  }
}
