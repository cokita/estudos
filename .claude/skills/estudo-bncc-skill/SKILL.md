---
name: estudo-bncc
description: >
  Skill para desenvolvimento do projeto estudo-bncc — plataforma de estudos pessoal
  para Ensino Fundamental II baseada na BNCC, construída com Angular 20, Signals,
  Tailwind CSS e SCSS. Use esta skill SEMPRE que estiver trabalhando no projeto
  estudo-bncc, criando componentes Angular, adicionando conteúdo BNCC (questões JSON
  ou resumos Markdown), configurando estilos, ou evoluindo qualquer parte deste projeto.
  Também use ao criar novos componentes standalone, services com signals, ou ao
  estruturar conteúdo por habilidade BNCC.
---

# Skill: estudo-bncc

Projeto de estudos pessoal para Ensino Fundamental II, baseado na BNCC.
Pai desenvolvedor construindo uma plataforma para o filho estudar.

## Stack e versões

| Tecnologia | Versão | Observação |
|---|---|---|
| Angular | 20+ | Standalone components, zoneless |
| TypeScript | 5.5+ | strict mode sempre |
| Tailwind CSS | 3.x | Utilitários no template HTML |
| SCSS | — | Estilos customizados e variáveis |
| Lucide Angular | latest | Ícones principais (free) |
| Material Icons | — | Via Google Fonts (fallback/complemento) |
| ngx-markdown | latest | Renderização dos resumos .md |
| Firebase Hosting | — | Deploy gratuito |

---

## Princípios do projeto

1. **Signals-first** — nunca usar Subject/BehaviorSubject para estado local; usar `signal()`, `computed()`, `effect()`
2. **Zoneless** — `provideZonelessChangeDetection()` está ativo; não introduzir Zone.js
3. **Tailwind para layout/spacing/cores** — classes utilitárias no template
4. **SCSS para lógica de estilo** — mixins, variáveis, seletores compostos, animações
5. **Standalone sempre** — sem NgModules; cada componente declara seus próprios imports
6. **Conteúdo como arquivo** — questões em `.json`, resumos em `.md`; zero banco de dados
7. **Mobile-first** — o filho acessa pelo celular; breakpoints começam pelo menor

---

## Estrutura de pastas

```
src/
├── app/
│   ├── core/
│   │   ├── models/index.ts            ← Todos os tipos TypeScript
│   │   └── services/
│   │       ├── progresso.service.ts   ← Signals + localStorage
│   │       └── conteudo.service.ts    ← Lê JSON/MD dos assets
│   ├── features/
│   │   ├── home/                      ← Tela inicial, cards de matérias
│   │   ├── materia/                   ← Lista de tópicos da matéria
│   │   └── questoes/                  ← Quiz interativo
│   └── shared/
│       ├── components/                ← Componentes reutilizáveis
│       └── pipes/                     ← Pipes customizados
├── styles/
│   ├── _variables.scss                ← Tokens de design (cores, tipografia)
│   ├── _mixins.scss                   ← Mixins reutilizáveis
│   └── _animations.scss              ← Keyframes globais
└── assets/
    └── content/
        ├── matematica/
        │   ├── questoes/7ano.json
        │   └── 7ano/equacoes-1-grau.md
        ├── portugues/
        ├── ciencias/
        ├── historia/
        ├── geografia/
        └── ingles/
```

---

## Padrões de código

Para detalhes completos de cada padrão, leia `references/padroes.md`.

### Componente — template rápido

```typescript
@Component({
  selector: 'app-nome',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './nome.component.html',
  styleUrl: './nome.component.scss'   // ← sempre arquivo separado
})
export class NomeComponent {
  // Injeção moderna
  private service = inject(NomeService);

  // Inputs com signal API
  titulo = input.required<string>();
  subtitulo = input<string>('');

  // Estado local
  ativo = signal(false);

  // Derivados
  classe = computed(() => this.ativo() ? 'ativo' : 'inativo');
}
```

### SCSS — estrutura padrão do arquivo de componente

```scss
// 1. Variáveis locais (se necessário)
// 2. Host styles
:host { display: block; }

// 3. Container principal
.componente {
  // Tailwind lida com layout — SCSS lida com lógica
  
  // Estados
  &--ativo { ... }
  &--desabilitado { ... }

  // Elementos filhos
  &__titulo { ... }
  &__conteudo { ... }
}

// 4. Animações (se locais)
// 5. Responsividade via mixin
@include mobile { ... }
```

### Ícones — uso padrão

```typescript
// No componente — importar apenas os ícones usados
import { BookOpen, CheckCircle, XCircle, ChevronRight } from 'lucide-angular';

icons = { BookOpen, CheckCircle, XCircle, ChevronRight };
```

```html
<!-- No template -->
<lucide-icon [img]="icons.BookOpen" class="w-5 h-5 text-indigo-500" />

<!-- Material Icons (fallback para ícones não disponíveis no Lucide) -->
<span class="material-icons text-xl">school</span>
```

---

## Conteúdo BNCC

### Estrutura de questão (JSON)

```json
{
  "id": "mat7-eq1-001",
  "habilidade": "EF07MA18",
  "titulo": "Equações do 1º grau",
  "enunciado": "Se 2x + 4 = 10, qual é o valor de x?",
  "alternativas": [
    { "texto": "x = 2", "correta": false },
    { "texto": "x = 3", "correta": true },
    { "texto": "x = 4", "correta": false },
    { "texto": "x = 5", "correta": false }
  ],
  "explicacao": "Isolamos x: 2x = 10 − 4 = 6, então x = 3.",
  "dificuldade": "facil"
}
```

Convenções: `id` = `{mat}{ano}-{topico}-{seq}`, `habilidade` = código BNCC oficial (EF + ano + sigla + número), `dificuldade` = `"facil" | "medio" | "dificil"`.

### Estrutura de resumo (Markdown)

```markdown
---
materia: Matemática
ano: 7º ano
habilidade: EF07MA18
titulo: Equações do 1º grau
---

## Conteúdo em Markdown...
```

Nomes de arquivo: `{topico-em-kebab-case}.md`, ex: `equacoes-1-grau.md`.

---

## Variáveis SCSS globais

Definidas em `src/styles/_variables.scss`. As cores espelham a paleta Tailwind usada nos templates:

```scss
// Cores por matéria
$cor-matematica: #6366f1;  // indigo-500
$cor-portugues:  #ec4899;  // pink-500
$cor-ciencias:   #10b981;  // emerald-500
$cor-historia:   #f59e0b;  // amber-500
$cor-geografia:  #3b82f6;  // blue-500
$cor-ingles:     #8b5cf6;  // violet-500

// Tokens
$radius-card: 1rem;
$radius-btn:  0.625rem;
$shadow-card: 0 4px 12px rgba(0,0,0,0.06);
$transition:  all 0.15s ease;
```

---

## Serviços principais

### ProgressoService (signals + localStorage)

```typescript
// Leitura reativa (nos componentes, sem subscribe)
readonly pct = this.progressoService.percentualPorMateria;

// No template
{{ pct()['matematica'] }}%

// Registrar resposta
progressoService.registrarResposta(materiaId, questaoId, acertou);
```

### ConteudoService (HttpClient)

```typescript
// Questões
conteudoService.getQuestoes('matematica', '7ano')
  .subscribe(questoes => this.questoes.set(questoes));

// Resumo Markdown
conteudoService.getResumoMd('matematica', '7ano', 'equacoes-1-grau')
  .subscribe(md => this.resumo.set(md));
```

---

## Rotas

```
/                          → HomeComponent
/materia/:id               → MateriaComponent
/materia/:id/questoes/:ano → QuestoesPageComponent
```

Todas lazy-loaded com `loadComponent`. Parâmetros de rota acessados via `input()` graças ao `withComponentInputBinding()`.

---

## Deploy

```bash
ng build                  # gera dist/estudo-bncc/browser/
firebase deploy           # publica no Firebase Hosting (grátis)
```

Para detalhes de configuração do Firebase, ver `references/deploy.md`.
