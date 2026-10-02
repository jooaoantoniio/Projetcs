# DevJourney

Portfólio interativo e diário de estudos do curso de **Desenvolvimento de Sistemas Web/Mobile**. Reúne a trajetória no curso, as tecnologias estudadas e os projetos desenvolvidos. Também tem um dashboard de progresso e um gerenciador de tarefas de estudo com cronômetro.

Feito com **HTML, CSS e JavaScript puro**: sem frameworks, sem bibliotecas e sem etapa de build. Os dados do usuário (tarefas, tempo de estudo e preferências) ficam salvos no próprio navegador com `localStorage`.

![Página inicial do DevJourney no tema escuro](docs/screenshots/01-inicio.png)

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Prints](#prints)
- [Como executar](#como-executar)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como personalizar o conteúdo](#como-personalizar-o-conteúdo)
- [Decisões técnicas](#decisões-técnicas)
- [Acessibilidade](#acessibilidade)
- [Melhorias futuras](#melhorias-futuras)

---

## Funcionalidades

### Minha Jornada
- Linha do tempo das etapas do curso, cada uma com status (concluído, em andamento, próximo), tecnologias e barra de progresso.
- A linha central é preenchida conforme a rolagem, e a etapa atual recebe o destaque **"Você está aqui"**.
- Resumo com o progresso geral da jornada e a contagem de etapas por status.

### Tecnologias
- Cards com categoria, descrição, status e nível de domínio, com o percentual animado quando o card aparece na tela.
- Efeito de luz que acompanha o cursor e resumo com o domínio médio.

### Projetos
- Cards com capa, categoria, status, tecnologias e links para o GitHub e a demonstração.
- **Filtros dinâmicos** por tecnologia (Todos, HTML/CSS, JavaScript, Java, Banco de Dados e React), com contador em cada filtro. Os filtros vêm das tecnologias de cada projeto.
- Transições de saída e entrada em cascata ao trocar de filtro.
- **Modal de detalhes** (`<dialog>` nativo) com descrição completa, funcionalidades e tecnologias. Fecha pelo botão, pela tecla Esc ou clicando fora.
- Sem imagem cadastrada, o projeto recebe uma capa gerada com o ícone e a cor dele.

### Meu progresso (dashboard)
- Cards de indicadores com números animados: horas estudadas, projetos, tecnologias e projetos em andamento.
- Barra de progresso geral do curso.
- **Gráfico de colunas** de horas por mês e **gráfico de barras** de horas por área, feitos só com HTML, CSS e JavaScript.
- Tooltip ao passar o mouse ou navegar com o teclado, e botão **"Ver tabela"** que mostra os mesmos dados em formato de tabela.
- Tudo se atualiza sozinho quando uma sessão de estudo é registrada no cronômetro.

### Estudos (tarefas e cronômetro)
- **Tarefas de estudo:** adicionar (título, área e horas previstas), marcar como concluída, excluir e limpar as concluídas.
- **"Desfazer"** depois de excluir uma tarefa, limpar as concluídas ou zerar o cronômetro.
- **Busca** que ignora acentos e maiúsculas, **filtro por status** (todas, pendentes, concluídas) com contadores e **filtro por área**.
- **Progresso das tarefas** (percentual, concluídas, pendentes e horas previstas restantes), atualizado a cada ação.
- **Cronômetro de estudo:** iniciar, pausar, registrar sessão (a partir de 1 minuto) e zerar. A sessão pode ser ligada a uma tarefa, e o botão ▶ de cada tarefa já começa a cronometrar aquela tarefa.
- O tempo registrado aparece na tarefa, nos totais de hoje e no total geral, e entra no dashboard **Meu progresso**.
- O cronômetro continua contando mesmo depois de recarregar a página.

### Geral
- **Tema claro e escuro.** Na primeira visita segue o tema do sistema operacional; depois disso, a escolha fica salva e é sincronizada entre abas.
- **Preferências salvas:** os filtros de projetos e de tarefas e a última área usada no formulário.
- **Sincronização entre abas:** com o site aberto em duas abas, uma não apaga as alterações da outra.
- Layout **responsivo** (mobile first), com menu em tela cheia no celular.
- O menu destaca a seção que está na tela.
- Animações de entrada ao rolar a página, desativadas automaticamente para quem prefere menos movimento.

---

## Tecnologias

| Tecnologia | Uso no projeto |
|---|---|
| **HTML5** | Estrutura semântica (`header`, `nav`, `main`, `section`, `article`, `dialog`), formulários nativos e atributos ARIA |
| **CSS3** | Variáveis CSS (design tokens para os dois temas), Grid, Flexbox, `color-mix()`, `clamp()`, animações e media queries mobile first |
| **JavaScript (ES2020+)** | Módulos organizados em objetos, manipulação do DOM, delegação de eventos, `IntersectionObserver`, `localStorage` e o evento `storage` |
| **Google Fonts** | Inter e JetBrains Mono (sem internet, o site usa as fontes do sistema) |

Nenhum framework, biblioteca ou gerenciador de pacotes.

---

## Prints

**Minha Jornada:** linha do tempo com o progresso geral

![Linha do tempo da jornada](docs/screenshots/02-jornada.png)

**Projetos:** filtros por tecnologia e cards

![Seção de projetos com filtros](docs/screenshots/03-projetos.png)

**Detalhes do projeto:** modal

![Modal com os detalhes de um projeto](docs/screenshots/04-modal-projeto.png)

**Meu progresso:** dashboard no tema claro

![Dashboard com indicadores e gráficos](docs/screenshots/05-dashboard.png)

**Estudos:** cronômetro em andamento, progresso e lista de tarefas

![Cronômetro e tarefas de estudo](docs/screenshots/06-estudos.png)

**Celular**

<p>
  <img src="docs/screenshots/07-mobile.png" alt="Página inicial no celular, tema claro" width="300">
  <img src="docs/screenshots/08-mobile-tarefas.png" alt="Tarefas de estudo no celular, tema escuro" width="300">
</p>

---

## Como executar

Não há dependências para instalar.

**Opção 1: abrir o arquivo**

```bash
git clone <url-do-repositorio>
cd devjourney
```

Depois, abra o `index.html` no navegador. O JavaScript usa scripts clássicos (sem `import`/`export`), então funciona direto pelo protocolo `file://`.

**Opção 2: servidor local**

```bash
# Python
python -m http.server 8000

# ou Node.js
npx serve .
```

Acesse `http://localhost:8000` (ou a porta indicada). No VS Code, a extensão **Live Server** também funciona.

**Compatibilidade:** o projeto usa recursos recentes, como `<dialog>`, `inert` e `color-mix()`. Por isso precisa de navegadores atualizados: Chrome, Edge, Firefox e Safari de 2023 em diante.

---

## Estrutura do projeto

```
devjourney/
├── index.html              # Estrutura da página e das seções
├── css/
│   └── style.css           # Estilos, organizados em seções numeradas (índice no topo do arquivo)
├── js/
│   └── main.js             # Dados editáveis + módulos da aplicação
├── assets/
│   ├── icons/favicon.svg
│   └── images/             # Thumbnails dos projetos (opcional)
└── docs/
    └── screenshots/        # Prints usados neste README
```

### Organização do `main.js`

1. **Dados:** objetos editáveis no topo do arquivo (veja a próxima seção).
2. **Utilitários:** `Utils` (formatação, escape de HTML, animação de números), `LocalStore` (leitura e escrita segura no `localStorage`) e `Prefs` (preferências).
3. **Módulos:** cada um com um `init()` e uma responsabilidade:

| Módulo | Responsabilidade |
|---|---|
| `Theme` | Tema claro/escuro, salvo e sincronizado entre abas |
| `Nav` | Menu mobile, header ao rolar e destaque da seção atual |
| `Timeline` | Linha do tempo da jornada |
| `Techs` | Cards de tecnologias |
| `Projects` / `ProjectModal` | Cards, filtros e modal de projetos |
| `StudyStore` | Estado das tarefas, das sessões e do cronômetro: salva no `localStorage` e avisa os módulos inscritos |
| `Progress` | Dashboard e gráficos |
| `StudyTimer` / `Tasks` | Cronômetro e lista de tarefas |
| `Toast` | Avisos com ação de "Desfazer" |
| `Reveal` | Animações de entrada ao rolar e números animados |

O `App` inicia os módulos em ordem. Cada um roda isolado: se um falhar, o erro aparece no console e o restante da página continua funcionando.

---

## Como personalizar o conteúdo

Todo o conteúdo fica em objetos no topo de `js/main.js`. Não é preciso mexer no HTML:

| Objeto | Conteúdo |
|---|---|
| `JOURNEY_STEPS` | Etapas da linha do tempo |
| `TECHNOLOGIES` | Tecnologias e nível de domínio |
| `PROJECTS` | Projetos (título, descrição, imagem, tecnologias, status, links) |
| `PROJECT_FILTERS` | Filtros de projetos e quais tecnologias entram em cada um |
| `PROGRESS_DATA` | Indicadores, progresso geral e horas por mês e por área |
| `TASK_CATEGORIES` | Áreas das tarefas (use os mesmos nomes de `hoursByArea`) |
| `STUDY_TASKS` | Tarefas de exemplo, carregadas só na primeira visita |

### Dados salvos no navegador

| Chave do `localStorage` | Conteúdo |
|---|---|
| `devjourney-theme` | Tema escolhido |
| `devjourney-prefs` | Filtros e preferências de interface |
| `devjourney-study` | Tarefas, sessões do cronômetro e estado do cronômetro |

Para voltar aos dados de exemplo, apague essas chaves nas ferramentas do desenvolvedor (Application → Local Storage).

---

## Decisões técnicas

- **Sem frameworks.** O objetivo é praticar os fundamentos da web: DOM, eventos, estado e CSS moderno.
- **Uma única fonte de estado para os estudos.** O `StudyStore` concentra tarefas, sessões e cronômetro. Toda alteração passa por um `commit()`, que salva os dados e avisa a lista de tarefas, o cronômetro e o dashboard.
- **Cronômetro baseado em horário de início.** Em vez de somar segundos, ele guarda quando começou. Assim o tempo continua correto com a aba em segundo plano ou depois de recarregar a página.
- **Dados do navegador validados ao carregar.** Entradas corrompidas ou editadas à mão são descartadas, em vez de quebrar a página.
- **Segurança básica.** Todo texto digitado pelo usuário é escapado antes de entrar no HTML, e os links externos usam `rel="noopener noreferrer"`.
- **Desempenho.** Animações de entrada com `IntersectionObserver`, listeners de rolagem passivos (a linha do tempo atualiza uma vez por quadro, com `requestAnimationFrame`) e nenhuma dependência externa além das fontes.

---

## Acessibilidade

- Link "Pular para o conteúdo", landmarks semânticos e hierarquia de títulos.
- Navegação completa por teclado, inclusive nos gráficos, com o mesmo tooltip do mouse.
- Alternativa em tabela para o gráfico de horas por mês.
- Modal com foco preso e retorno do foco ao fechar. No menu mobile aberto, o conteúdo de trás fica inacessível ao teclado (`inert`).
- Regiões `aria-live` para anunciar o resultado dos filtros de projetos e os avisos (ex.: "Tarefa excluída").
- Cores de texto do tema com contraste mínimo de 4,5:1 (WCAG AA) sobre os fundos, nos dois temas.
- Respeito a `prefers-reduced-motion` e a `prefers-color-scheme`.

---

## Melhorias futuras

- [ ] Formulário de contato (a seção **Contato** ainda está em construção)
- [ ] Editar o título e a área de uma tarefa já criada
- [ ] Exportar e importar os dados de estudo (JSON)
- [ ] API com Spring Boot e banco de dados para sincronizar os dados entre dispositivos
- [ ] Testes automatizados no repositório
- [ ] Publicação no GitHub Pages
- [ ] Prints reais nas capas dos projetos
- [ ] Efeitos de hover só em dispositivos com mouse (no toque, alguns cards ficam "levantados")

---

## Autor

Desenvolvido por **João Antônio** durante o curso de Desenvolvimento de Sistemas Web/Mobile.
