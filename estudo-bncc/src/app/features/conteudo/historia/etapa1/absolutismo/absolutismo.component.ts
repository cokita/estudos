import { Component } from '@angular/core';
import { LucideAngularModule, AlertTriangle, Lightbulb, Quote } from 'lucide-angular';

@Component({
  selector: 'app-conteudo-absolutismo',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './absolutismo.component.html',
  styleUrl: './absolutismo.component.scss',
})
export class AbsolutismoComponent {
  icons = { AlertTriangle, Lightbulb, Quote };
}
