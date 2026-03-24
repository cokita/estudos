# Padrões de código — estudo-bncc

## Signals — padrões estabelecidos

### Estado derivado com computed()

```typescript
// ✅ Correto — computed é memo automático
readonly percentualConcluido = computed(() =>
  Math.round(this.indiceAtual() / this.questoes().length * 100)
);

// ❌ Evitar — recalcula manualmente
get percentualConcluido() {
  return Math.round(this.indiceAtual() / this.questoes().length * 100);
}
```

### Efeitos colaterais com effect()

```typescript
constructor() {
  // Persistência automática — roda sempre que _progresso mudar
  effect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._progresso()));
  });
}
```

### Atualização imutável de objetos

```typescript
// ✅ Correto — spread para manter imutabilidade
this._progresso.update(prog => ({
  ...prog,
  [materiaId]: {
    ...prog[materiaId],
    questoes: { ...prog[materiaId]?.questoes, [questaoId]: novaQuestao }
  }
}));
```

### Input com signal API (Angular 17.1+)

```typescript
// ✅ Padrão do projeto
titulo     = input.required<string>();
subtitulo  = input<string>('');          // com default
cor        = input<string>('#6366f1');

// Uso no template: {{ titulo() }}
// Uso no ts:       this.titulo()
```

---

## Componentes — padrões de arquivo

### Separação de responsabilidades

- **Template HTML** → estrutura + Tailwind (layout, spacing, cores, estados hover)
- **Arquivo SCSS** → animações, pseudo-seletores complexos, variáveis locais, mixins
- **TypeScript** → lógica, signals, injeção de dependências

### Nomenclatura de arquivos

```
nome-do-componente/
├── nome-do-componente.component.ts
├── nome-do-componente.component.html
└── nome-do-componente.component.scss
```

Sempre separado — nunca `template` ou `styles` inline no decorador (exceto componentes de 1 linha muito simples).

### Imports no componente

```typescript
imports: [
  CommonModule,           // @if, @for, @switch (ou importar diretamente NgIf, NgFor)
  RouterLink,             // links de navegação
  LucideAngularModule,    // ícones Lucide
  NgxMarkdownModule,      // apenas onde renderiza MD
  // Componentes filhos diretos
  QuestoesComponent,
  BreadcrumbComponent,
]
```

Não importar módulos desnecessários — cada import aumenta o bundle.

---

## SCSS — padrões estabelecidos

### Arquivo `_variables.scss` — tokens canônicos

```scss
// Importar no componente quando precisar de variável
@use 'variables' as v;

.btn { background: v.$cor-matematica; }
```

### Arquivo `_mixins.scss` — mixins disponíveis

```scss
@mixin mobile  { @media (max-width: 639px)  { @content; } }
@mixin tablet  { @media (max-width: 1023px) { @content; } }
@mixin desktop { @media (min-width: 1024px) { @content; } }

@mixin card-base {
  background: white;
  border: 1.5px solid #e5e7eb;
  border-radius: v.$radius-card;
  box-shadow: v.$shadow-card;
  transition: v.$transition;
}

@mixin focus-ring($color: #6366f1) {
  &:focus-visible {
    outline: 2px solid $color;
    outline-offset: 2px;
  }
}
```

### Animações — `_animations.scss`

```scss
// Disponíveis globalmente
@keyframes fadeIn    { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes slideIn   { from { transform: translateX(-8px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes scaleIn   { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes pulse     { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }

// Uso no SCSS do componente
.questao-card { animation: fadeIn 0.2s ease; }
```

### Dark mode

```scss
// Sempre via prefers-color-scheme no SCSS do componente
@media (prefers-color-scheme: dark) {
  .questao-card {
    background: theme('colors.gray.800');   // ou hardcoded #1f2937
    border-color: theme('colors.gray.700');
  }
}
```

---

## Tailwind — classes mais usadas no projeto

### Layout e spacing
```html
<!-- Cards -->
<div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">

<!-- Grid de matérias -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">

<!-- Flex padrão -->
<div class="flex items-center gap-3">
```

### Tipografia
```html
<h1 class="text-2xl font-semibold text-gray-900">Título</h1>
<p  class="text-sm text-gray-500 leading-relaxed">Subtítulo</p>
<span class="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Tag</span>
```

### Cores por matéria (classes de referência)
```
Matemática → indigo  (indigo-500, indigo-50, indigo-100)
Português  → pink    (pink-500, pink-50, pink-100)
Ciências   → emerald (emerald-500, emerald-50, emerald-100)
História   → amber   (amber-500, amber-50, amber-100)
Geografia  → blue    (blue-500, blue-50, blue-100)
Inglês     → violet  (violet-500, violet-50, violet-100)
```

### Botões
```html
<!-- Primário -->
<button class="w-full py-3 px-6 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">

<!-- Secundário -->
<button class="py-2 px-4 border border-indigo-500 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">

<!-- Ghost -->
<button class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
```

---

## Ícones — guia de uso

### Lucide Angular (preferência)

```typescript
// Importar apenas os necessários (tree-shakeable)
import {
  BookOpen, CheckCircle, XCircle, ChevronRight,
  Trophy, RotateCcw, BarChart2, Home, ArrowLeft
} from 'lucide-angular';

// No componente
readonly icons = { BookOpen, CheckCircle, XCircle, ChevronRight, Trophy };
```

```html
<!-- Tamanhos padrão do projeto -->
<lucide-icon [img]="icons.BookOpen" class="w-4 h-4" />   <!-- inline/texto -->
<lucide-icon [img]="icons.BookOpen" class="w-5 h-5" />   <!-- botão -->
<lucide-icon [img]="icons.BookOpen" class="w-6 h-6" />   <!-- destaque -->
<lucide-icon [img]="icons.Trophy"   class="w-8 h-8" />   <!-- hero/resultado -->
```

### Mapeamento de ícones por contexto

```
Matérias:
  Matemática → Calculator ou Sigma
  Português  → BookOpen
  Ciências   → FlaskConical
  História   → Landmark
  Geografia  → Globe
  Inglês     → Languages

Ações:
  Confirmar      → CheckCircle
  Erro/Errado    → XCircle
  Próximo        → ChevronRight
  Voltar         → ArrowLeft / ChevronLeft
  Reiniciar      → RotateCcw
  Resultado/XP   → Trophy
  Progresso      → BarChart2
  Home           → Home
  Dificuldade:
    Fácil        → Zap
    Médio        → Target
    Difícil      → Flame
```

### Material Icons (complemento)

Usar para ícones educacionais não presentes no Lucide free:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- No template -->
<span class="material-icons text-lg leading-none">school</span>
<span class="material-icons text-lg leading-none">menu_book</span>
<span class="material-icons text-lg leading-none">quiz</span>
```

---

## Roteamento — padrões

### Acessar parâmetro de rota via input (Angular 17.1+)

```typescript
// Com withComponentInputBinding() no provideRouter()
// o parâmetro da rota vira um input automaticamente
@Component({ ... })
export class MateriaComponent {
  id = input.required<string>();  // ← recebe :id da rota /materia/:id
}
```

### Navegação programática

```typescript
private router = inject(Router);

irParaQuestoes(materiaId: string, ano: string): void {
  this.router.navigate(['/materia', materiaId, 'questoes', ano]);
}
```

---

## Adicionando conteúdo novo

### Nova matéria

1. Adicionar em `conteudo.service.ts` no array `materias`
2. Criar pasta `src/assets/content/{id}/questoes/`
3. Adicionar cor SCSS em `_variables.scss`
4. Adicionar cor Tailwind ao `safelist` do `tailwind.config.js` se dinâmica

### Novo tópico/resumo

1. Criar `src/assets/content/{materia}/{ano}/{topico}.md`
2. Preencher frontmatter YAML (materia, ano, habilidade, titulo)
3. Conteúdo em Markdown padrão

### Novas questões

1. Editar ou criar `src/assets/content/{materia}/questoes/{ano}ano.json`
2. Seguir o schema de Questao definido em `core/models/index.ts`
3. Garantir que `id` seja único e `habilidade` seja código BNCC válido
