import { Type } from '@angular/core';

export const CONTEUDO_REGISTRY: Record<string, () => Promise<Type<unknown>>> = {

  // ── História — Etapa 1 (Baixa Idade Média e Início da Modernidade) ──
  'historia/absolutismo': () =>
    import('./historia/etapa1/absolutismo/absolutismo.component')
      .then(m => m.AbsolutismoComponent),

  'historia/mercantilismo': () =>
    import('./historia/etapa1/mercantilismo/mercantilismo.component')
      .then(m => m.MercantilismoComponent),

  'historia/cruzadas': () =>
    import('./historia/etapa1/cruzadas/cruzadas.component')
      .then(m => m.CruzadasComponent),

  'historia/burgos-burguesia': () =>
    import('./historia/etapa1/burgos-burguesia/burgos-burguesia.component')
      .then(m => m.BurgosBurguesiaComponent),

  'historia/peste-negra': () =>
    import('./historia/etapa1/peste-negra/peste-negra.component')
      .then(m => m.PesteNegraComponent),

  'historia/revoltas-camponesas': () =>
    import('./historia/etapa1/revoltas-camponesas/revoltas-camponesas.component')
      .then(m => m.RevoltasCamponesasComponent),

};
