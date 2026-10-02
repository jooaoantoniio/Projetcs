/* ==========================================================================
   DevJourney — main.js
   Cada módulo tem uma responsabilidade e expõe um init().
   Scripts clássicos (sem import/export) para funcionar via file://.
   ========================================================================== */

"use strict";

/* ===================== DADOS DA JORNADA =====================
   Edite aqui para atualizar a timeline.
   status:   "done" (concluído) | "progress" (em andamento) | "next" (próximo)
   progress: 0 a 100
   A primeira etapa "progress" é destacada como "Você está aqui".
   ============================================================= */
const JOURNEY_STEPS = [
  {
    title: "HTML & CSS",
    description: "A base de toda a web: estrutura semântica, acessibilidade, Flexbox, Grid e layouts responsivos com mobile first.",
    techs: ["HTML5", "CSS3", "Flexbox", "Grid"],
    status: "done",
    progress: 100,
  },
  {
    title: "JavaScript",
    description: "Lógica de programação aplicada ao navegador: manipulação do DOM, eventos, funções, arrays e assincronismo.",
    techs: ["JavaScript", "DOM", "ES6+"],
    status: "done",
    progress: 100,
  },
  {
    title: "Git & GitHub",
    description: "Versionamento de código, branches, commits semânticos, pull requests e colaboração em repositórios remotos.",
    techs: ["Git", "GitHub"],
    status: "done",
    progress: 100,
  },
  {
    title: "Banco de Dados",
    description: "Modelagem relacional, normalização e consultas SQL para armazenar e recuperar dados com eficiência.",
    techs: ["SQL", "MySQL", "Modelagem"],
    status: "progress",
    progress: 80,
  },
  {
    title: "APIs REST",
    description: "Comunicação entre sistemas: verbos HTTP, status codes, JSON e consumo de APIs com fetch.",
    techs: ["HTTP", "JSON", "Fetch API"],
    status: "progress",
    progress: 55,
  },
  {
    title: "Java",
    description: "Programação orientada a objetos com Java: classes, herança, interfaces, coleções e tratamento de exceções.",
    techs: ["Java", "POO"],
    status: "progress",
    progress: 40,
  },
  {
    title: "Spring Boot",
    description: "Criação de APIs robustas no back-end com Spring Boot, Spring Data JPA e boas práticas de arquitetura.",
    techs: ["Spring Boot", "JPA", "Maven"],
    status: "next",
    progress: 0,
  },
  {
    title: "React",
    description: "Interfaces modernas com componentes, hooks, gerenciamento de estado e integração com APIs.",
    techs: ["React", "Hooks", "JSX"],
    status: "next",
    progress: 0,
  },
  {
    title: "Projetos completos",
    description: "Aplicações full stack unindo front-end, back-end e banco de dados, do planejamento ao deploy.",
    techs: ["Full Stack", "Deploy"],
    status: "next",
    progress: 0,
  },
];

const STEP_STATUS = {
  done:     { label: "Concluído" },
  progress: { label: "Em andamento" },
  next:     { label: "Próximo" },
};

/* ===================== DADOS DAS TECNOLOGIAS =====================
   Edite aqui para adicionar ou alterar tecnologias.
   icon:     chave do objeto TECH_ICONS (abaixo)
   color:    cor de destaque do card (ícone, brilho e borda no hover)
   level:    domínio de 0 a 100
   status:   "Estudando" | "Em evolução" | "Concluído"
   ================================================================= */
const TECHNOLOGIES = [
  {
    name: "HTML5",
    category: "Front-end",
    icon: "html",
    color: "#e34f26",
    description: "Estrutura semântica, acessibilidade, formulários e boas práticas de marcação.",
    level: 90,
    status: "Concluído",
  },
  {
    name: "CSS3",
    category: "Front-end",
    icon: "css",
    color: "#2d8cf0",
    description: "Layouts responsivos com Flexbox e Grid, variáveis, animações e mobile first.",
    level: 85,
    status: "Concluído",
  },
  {
    name: "JavaScript",
    category: "Front-end",
    icon: "js",
    color: "#f7df1e",
    description: "Manipulação do DOM, eventos, ES6+, assincronismo e consumo de APIs.",
    level: 70,
    status: "Em evolução",
  },
  {
    name: "Git",
    category: "Ferramentas",
    icon: "git",
    color: "#f05032",
    description: "Versionamento de código, branches, merges e commits semânticos.",
    level: 75,
    status: "Concluído",
  },
  {
    name: "GitHub",
    category: "Ferramentas",
    icon: "github",
    color: "#9ca3af",
    description: "Repositórios remotos, pull requests, issues e publicação com GitHub Pages.",
    level: 75,
    status: "Concluído",
  },
  {
    name: "SQL",
    category: "Dados",
    icon: "sql",
    color: "#38bdf8",
    description: "Modelagem relacional, consultas, joins, agregações e normalização.",
    level: 60,
    status: "Em evolução",
  },
  {
    name: "Java",
    category: "Back-end",
    icon: "java",
    color: "#f89820",
    description: "Orientação a objetos, coleções, tratamento de exceções e boas práticas.",
    level: 45,
    status: "Em evolução",
  },
  {
    name: "Spring Boot",
    category: "Back-end",
    icon: "spring",
    color: "#6db33f",
    description: "APIs REST no back-end com Spring Web, Spring Data JPA e injeção de dependências.",
    level: 20,
    status: "Estudando",
  },
  {
    name: "React",
    category: "Front-end",
    icon: "react",
    color: "#61dafb",
    description: "Componentes, hooks e gerenciamento de estado para interfaces modernas.",
    level: 15,
    status: "Estudando",
  },
  {
    name: "APIs REST",
    category: "Integração",
    icon: "api",
    color: "#a78bfa",
    description: "Verbos HTTP, status codes, JSON e integração entre front-end e back-end.",
    level: 50,
    status: "Em evolução",
  },
  {
    name: "Inteligência Artificial",
    category: "Inovação",
    icon: "ai",
    color: "#e879f9",
    description: "IA como ferramenta de produtividade, engenharia de prompts e integração via APIs.",
    level: 35,
    status: "Estudando",
  },
];

// Status de tecnologia → classe visual reaproveitada do componente .status
const TECH_STATUS = {
  "Concluído":   { modifier: "done",     plural: "concluídas" },
  "Em evolução": { modifier: "progress", plural: "em evolução" },
  "Estudando":   { modifier: "studying", plural: "estudando" },
};

const TECH_ICONS = {
  html: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 2h18l-1.64 18.4L12 22.5l-7.36-2.1L3 2z"/><path fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M16 6.5H8l.4 4.5h7.2l-.5 5.2L12 17.2l-3.1-1-.2-2.2"/></svg>',
  css: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 2h18l-1.64 18.4L12 22.5l-7.36-2.1L3 2z"/><path fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M8 6.5h8l-.4 4.5H8.6M15.6 11l-.5 5.2L12 17.2l-3.1-1-.2-2.2"/></svg>',
  js: '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor"/><text x="19.5" y="19" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="9" font-weight="800" fill="#111">JS</text></svg>',
  git: '<svg viewBox="0 0 24 24"><rect x="4.2" y="4.2" width="15.6" height="15.6" rx="2.5" transform="rotate(45 12 12)" fill="currentColor"/><path fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" d="M10 8.5v7M10 8.5l5 4.5"/><g fill="#fff"><circle cx="10" cy="8.5" r="1.6"/><circle cx="10" cy="15.5" r="1.6"/><circle cx="15" cy="13" r="1.6"/></g></svg>',
  github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
  sql: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
  java: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><path d="M7 2c-.6 1 .6 2 0 3M11 2c-.6 1 .6 2 0 3"/></svg>',
  spring: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 3C10 3 4 8.5 4 15c0 2 .6 3.8 1.6 5"/><path d="M20 3c0 9.5-5.5 16-12.5 16-1 0-2-.2-2.9-.5"/><path d="M5.6 20C8 15 12 11 16 8.5"/></svg>',
  react: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/></svg>',
  api: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
  ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3l1.8 4.9 4.7 1.8-4.7 1.8L10 16.4l-1.8-4.9-4.7-1.8 4.7-1.8L10 3z"/><path d="M18 14l.9 2.1 2.1.9-2.1.9L18 20l-.9-2.1-2.1-.9 2.1-.9L18 14z"/></svg>',
  default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>',
};

/* ===================== DADOS DOS PROJETOS =====================
   Edite aqui para adicionar ou alterar projetos.
   id:       identificador único (sem espaços)
   image:    caminho da thumbnail (ex.: "assets/images/chamados.webp").
             Com null, uma capa é gerada com o ícone e a cor do projeto.
   icon:     chave do objeto PROJECT_ICONS (usado na capa gerada)
   color:    cor de destaque do card, da capa e do modal
   techs:    também definem em quais filtros o projeto aparece (ver PROJECT_FILTERS)
   status:   "Concluído" | "Em andamento" | "Planejado"
   demo:     null enquanto não houver demonstração publicada
   ============================================================== */
const PROJECTS = [
  {
    id: "chamados-ti",
    title: "Sistema de Chamados TI",
    description: "Abertura e acompanhamento de chamados de suporte técnico, com prioridades, responsáveis e histórico de atendimento.",
    details: "Sistema web para centralizar os pedidos de suporte de uma equipe de TI. O usuário abre o chamado, acompanha o andamento e recebe a solução; o técnico organiza a fila por prioridade e registra cada etapa do atendimento.",
    features: [
      "Abertura de chamados com categoria e prioridade",
      "Fila de atendimento por técnico responsável",
      "Histórico de interações em cada chamado",
      "Indicadores de tempo médio de resolução",
    ],
    image: null,
    icon: "ticket",
    color: "#6366f1",
    techs: ["Java", "Spring Boot", "MySQL", "HTML", "CSS"],
    category: "Full Stack",
    status: "Em andamento",
    github: "https://github.com/seu-usuario/sistema-chamados-ti",
    demo: null,
  },
  {
    id: "controle-estoque",
    title: "Controle de Estoque",
    description: "Cadastro de produtos, entradas e saídas, com alertas de estoque mínimo e relatórios de movimentação.",
    details: "Aplicação em Java orientada a objetos para controlar o estoque de um pequeno comércio. Cada movimentação atualiza o saldo do produto no banco de dados, e o sistema avisa quando um item atinge o estoque mínimo.",
    features: [
      "CRUD de produtos, categorias e fornecedores",
      "Registro de entradas e saídas com data e responsável",
      "Alerta automático de estoque mínimo",
      "Relatório de movimentação por período",
    ],
    image: null,
    icon: "package",
    color: "#f59e0b",
    techs: ["Java", "MySQL", "JDBC"],
    category: "Back-end",
    status: "Concluído",
    github: "https://github.com/seu-usuario/controle-estoque",
    demo: null,
  },
  {
    id: "controle-financeiro",
    title: "Controle Financeiro",
    description: "Registro de receitas e despesas com saldo em tempo real, categorias e resumo mensal das finanças.",
    details: "Aplicação front-end para organizar as finanças pessoais. As transações ficam salvas no navegador com LocalStorage, e o resumo do mês é recalculado a cada lançamento, mostrando para onde o dinheiro está indo.",
    features: [
      "Lançamento de receitas e despesas por categoria",
      "Saldo, entradas e saídas atualizados em tempo real",
      "Filtro de transações por mês",
      "Dados persistidos no navegador com LocalStorage",
    ],
    image: null,
    icon: "wallet",
    color: "#22c55e",
    techs: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    category: "Front-end",
    status: "Concluído",
    github: "https://github.com/seu-usuario/controle-financeiro",
    demo: "https://seu-usuario.github.io/controle-financeiro",
  },
  {
    id: "lista-tarefas",
    title: "Lista de Tarefas",
    description: "Gerenciador de tarefas com prioridades, filtros por status e arrastar e soltar para reorganizar a lista.",
    details: "Primeiro projeto completo em JavaScript puro, focado em manipulação do DOM e eventos. As tarefas podem ser criadas, editadas, concluídas e reordenadas, e a lista é mantida entre as visitas.",
    features: [
      "Criação, edição e exclusão de tarefas",
      "Filtros por pendentes, concluídas e todas",
      "Reordenação com arrastar e soltar",
      "Layout responsivo com tema claro e escuro",
    ],
    image: null,
    icon: "tasks",
    color: "#22d3ee",
    techs: ["HTML", "CSS", "JavaScript"],
    category: "Front-end",
    status: "Concluído",
    github: "https://github.com/seu-usuario/lista-de-tarefas",
    demo: "https://seu-usuario.github.io/lista-de-tarefas",
  },
  {
    id: "dashboard-indicadores",
    title: "Dashboard de Indicadores",
    description: "Painel com gráficos e KPIs alimentados por uma API REST, com filtros por período e atualização dinâmica.",
    details: "Dashboard construído com React para visualizar indicadores de desempenho. Os dados vêm de uma API REST e são exibidos em cards e gráficos que se atualizam conforme o período selecionado.",
    features: [
      "Cards de KPIs com variação em relação ao período anterior",
      "Gráficos de linha e de barras",
      "Filtro por período (semana, mês e ano)",
      "Consumo de API REST com estados de carregamento e erro",
    ],
    image: null,
    icon: "chart",
    color: "#a78bfa",
    techs: ["React", "JavaScript", "APIs REST"],
    category: "Front-end",
    status: "Em andamento",
    github: "https://github.com/seu-usuario/dashboard-indicadores",
    demo: null,
  },
  {
    id: "sistema-cadastro",
    title: "Sistema de Cadastro",
    description: "Cadastro de clientes com validação de formulários, busca e paginação, integrando front-end React e API em Spring Boot.",
    details: "Projeto full stack para praticar a integração entre front-end e back-end: a interface em React consome uma API REST em Spring Boot, que valida e persiste os dados em um banco MySQL.",
    features: [
      "Formulário com validação de CPF, e-mail e telefone",
      "Busca e paginação de registros",
      "API REST com Spring Boot e Spring Data JPA",
      "Persistência em banco de dados MySQL",
    ],
    image: null,
    icon: "userPlus",
    color: "#ec4899",
    techs: ["React", "Spring Boot", "MySQL"],
    category: "Full Stack",
    status: "Planejado",
    github: "https://github.com/seu-usuario/sistema-cadastro",
    demo: null,
  },
];

// O projeto aparece no filtro se usar alguma das techs listadas
const PROJECT_FILTERS = [
  { label: "Todos" },
  { label: "HTML/CSS",       techs: ["HTML", "CSS"] },
  { label: "JavaScript",     techs: ["JavaScript"] },
  { label: "Java",           techs: ["Java", "Spring Boot"] },
  { label: "Banco de Dados", techs: ["MySQL", "SQL", "JDBC"] },
  { label: "React",          techs: ["React"] },
];

// Status de projeto → classe visual reaproveitada do componente .status
const PROJECT_STATUS = {
  "Concluído":    { modifier: "done" },
  "Em andamento": { modifier: "progress" },
  "Planejado":    { modifier: "next" },
};

const PROJECT_ICONS = {
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2M13 11v2M13 17v2"/></svg>',
  package: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>',
  tasks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 7 2 2 4-4M3 17l2 2 4-4M13 6h8M13 12h8M13 18h8"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M8 17v-3M13 17V5M18 17V9"/></svg>',
  userPlus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>',
  default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
};

/* ===================== DADOS DO PROGRESSO =====================
   Edite aqui para atualizar o dashboard "Meu progresso".
   stats:        cards de indicadores — value é animado de 0 até o número
                 icon: chave do objeto PROGRESS_ICONS (abaixo)
                 key "hours": soma automaticamente o tempo registrado no cronômetro
   overall:      barra de progresso geral, value de 0 a 100
   hoursByMonth: gráfico de colunas (month no formato "AAAA-MM")  } horas anteriores
   hoursByArea:  gráfico de barras                               } ao cronômetro
                 As sessões do cronômetro são somadas por mês e pela área da tarefa.
   ============================================================== */
const PROGRESS_DATA = {
  stats: [
    { key: "hours",    label: "Horas estudadas",        value: 120, suffix: "h", icon: "clock",    detail: "Dedicadas desde o início do curso" },
    { key: "projects", label: "Projetos desenvolvidos", value: 6,   suffix: "",  icon: "folder",   detail: "Do front-end ao full stack" },
    { key: "techs",    label: "Tecnologias estudadas",  value: 11,  suffix: "",  icon: "layers",   detail: "Linguagens, frameworks e ferramentas" },
    { key: "ongoing",  label: "Projetos em andamento",  value: 3,   suffix: "",  icon: "activity", detail: "Em desenvolvimento neste momento" },
  ],
  overall: {
    label: "Progresso geral do curso",
    description: "Módulos concluídos, projetos entregues e horas de estudo somados em um só indicador.",
    value: 62,
    start: "Início do curso",
    end: "Conclusão",
  },
  hoursByMonth: [
    { month: "2026-05", hours: 12 },
    { month: "2026-06", hours: 16 },
    { month: "2026-07", hours: 18 },
    { month: "2026-08", hours: 20 },
    { month: "2026-09", hours: 26 },
    { month: "2026-10", hours: 28 },
  ],
  hoursByArea: [
    { label: "Front-end",      hours: 48 },
    { label: "Back-end",       hours: 30 },
    { label: "Banco de Dados", hours: 22 },
    { label: "Ferramentas",    hours: 12 },
    { label: "IA",             hours: 8 },
  ],
};

const PROGRESS_ICONS = {
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/></svg>',
  activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
};

/* ===================== DADOS DOS ESTUDOS =====================
   TASK_CATEGORIES: áreas das tarefas — use os mesmos nomes de hoursByArea
                    para o tempo do cronômetro entrar no gráfico "Horas por área".
   STUDY_TASKS:     tarefas de exemplo, carregadas só na primeira visita.
                    Depois disso, as tarefas ficam salvas no navegador (localStorage).
   estimate:        horas previstas (opcional)
   ============================================================= */
const TASK_CATEGORIES = ["Front-end", "Back-end", "Banco de Dados", "Ferramentas", "IA"];

const STUDY_TASKS = [
  { title: "Criar primeira API REST com Spring Boot",      category: "Back-end",       estimate: 5 },
  { title: "Praticar JOINs e subconsultas no MySQL",       category: "Banco de Dados", estimate: 3 },
  { title: "Estudar coleções em Java (List, Set e Map)",   category: "Back-end",       estimate: 3 },
  { title: "Componentes, props e estado no React",         category: "Front-end",      estimate: 4 },
  { title: "Engenharia de prompts para desenvolvedores",   category: "IA",             estimate: 2 },
  { title: "Revisar Flexbox e CSS Grid",                   category: "Front-end",      estimate: 2, done: true },
  { title: "Commits semânticos e branches no Git",         category: "Ferramentas",    estimate: 1, done: true },
  { title: "Manipulação do DOM e eventos em JavaScript",   category: "Front-end",      estimate: 3, done: true },
];

/* ===================== UTILITÁRIOS ===================== */
const Utils = {
  $: (selector, scope = document) => scope.querySelector(selector),
  $$: (selector, scope = document) => [...scope.querySelectorAll(selector)],

  clamp: (value, min, max) => Math.min(Math.max(value, min), max),

  escapeHTML: (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[char]),

  plural: (count, singular, pluralForm) => `${count} ${count === 1 ? singular : pluralForm}`,

  prefersReducedMotion: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,

  uid: () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,

  // Minúsculas e sem acentos, para a busca encontrar "funcoes" em "Funções"
  normalize: (text) => String(text).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(),

  formatNumber: (value, decimals = 0) =>
    Number(value).toLocaleString("pt-BR", { maximumFractionDigits: decimals }),

  // 4.800.000 ms → "1h 20min"
  formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    if (!hours) return `${rest}min`;
    return rest ? `${hours}h ${rest}min` : `${hours}h`;
  },

  // 4.813.000 ms → "01:20:13"
  formatClock(ms) {
    const seconds = Math.floor(ms / 1000);
    return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
      .map((part) => String(part).padStart(2, "0"))
      .join(":");
  },

  monthKey: (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,

  // "2026-10" → "Out"
  monthLabel(key) {
    const [year, month] = key.split("-").map(Number);
    const label = new Date(year, month - 1, 1).toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
    return label.charAt(0).toUpperCase() + label.slice(1);
  },

  isToday: (iso) => new Date(iso).toDateString() === new Date().toDateString(),

  // Conta de "from" até "to" com easing (ease-out cubic); uma nova chamada cancela a anterior
  animateNumber(element, to, { from = 0, duration = 1200, delay = 0, suffix = "", decimals = 0 } = {}) {
    const format = (value) => `${Utils.formatNumber(value, decimals)}${suffix}`;
    const token = Symbol("count");
    element.countToken = token;

    if (Utils.prefersReducedMotion()) {
      element.textContent = format(to);
      return;
    }

    const start = performance.now() + delay;
    const step = (now) => {
      if (element.countToken !== token) return;
      const t = Utils.clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      element.textContent = format(t < 1 ? from + (to - from) * eased : to);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },
};

/* ===================== ARMAZENAMENTO LOCAL ===================== */
// JSON no localStorage. Em navegação privada ou com storage bloqueado, o app segue funcionando só em memória
const LocalStore = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Sem storage: os dados valem só até fechar a aba
    }
  },
};

/* ===================== PREFERÊNCIAS ===================== */
// Escolhas de interface (filtros, última área usada...) num único objeto salvo no navegador.
// O tema tem chave própria porque precisa ser lido no <head>, antes da página aparecer.
const Prefs = {
  KEY: "devjourney-prefs",

  all() {
    const prefs = LocalStore.get(this.KEY, {});
    return prefs && typeof prefs === "object" ? prefs : {};
  },

  get(name, fallback) {
    return this.all()[name] ?? fallback;
  },

  set(name, value) {
    LocalStore.set(this.KEY, { ...this.all(), [name]: value });
  },
};

const ICONS = {
  check: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  arrowRight: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  external: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  github: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
  play: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>',
  pause: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1.2"/><rect x="14" y="4" width="4" height="16" rx="1.2"/></svg>',
  trash: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  clock: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
};

/* ===================== COMPONENTES (HTML reutilizável) ===================== */
const Components = {
  progressBar({ value, label, active = false, large = false }) {
    const classes = ["progress", active && "progress--active", large && "progress--lg"]
      .filter(Boolean)
      .join(" ");

    return `
      <div class="${classes}" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"
           aria-label="${Utils.escapeHTML(label)}" style="--progress: ${value}%">
        <span class="progress__bar"></span>
      </div>`;
  },
};

/* ===================== TEMA (dark / light) ===================== */
const Theme = {
  STORAGE_KEY: "devjourney-theme",
  COLORS: { dark: "#07090f", light: "#fafbfd" },
  root: document.documentElement,

  init() {
    this.toggleBtn = Utils.$("#theme-toggle");
    this.metaThemeColor = Utils.$('meta[name="theme-color"]');

    this.apply(this.getCurrent());
    this.toggleBtn?.addEventListener("click", () => this.toggle());

    // Escolha feita em outra aba
    window.addEventListener("storage", (event) => {
      if (event.key === this.STORAGE_KEY && (event.newValue === "light" || event.newValue === "dark")) {
        this.apply(event.newValue);
      }
    });

    // Sem escolha salva, acompanha a troca de tema do sistema operacional
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (event) => {
      if (!this.getSaved()) this.apply(event.matches ? "light" : "dark");
    });
  },

  getSaved() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved === "light" || saved === "dark" ? saved : null;
    } catch {
      return null;
    }
  },

  getCurrent() {
    return this.root.getAttribute("data-theme") === "light" ? "light" : "dark";
  },

  apply(theme) {
    this.root.setAttribute("data-theme", theme);
    this.metaThemeColor?.setAttribute("content", this.COLORS[theme]);

    const label = `Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`;
    this.toggleBtn?.setAttribute("aria-label", label);
    this.toggleBtn?.setAttribute("title", label);
  },

  toggle() {
    const next = this.getCurrent() === "dark" ? "light" : "dark";
    this.apply(next);

    try {
      localStorage.setItem(this.STORAGE_KEY, next);
    } catch {
      // Navegação privada ou storage bloqueado: o tema só não será lembrado
    }
  },
};

/* ===================== NAVEGAÇÃO ===================== */
const Nav = {
  DESKTOP_BREAKPOINT: 900, // manter igual à media query do CSS
  SCROLL_THRESHOLD: 12,

  init() {
    this.header = Utils.$("#header");
    this.nav = Utils.$("#nav");
    this.toggleBtn = Utils.$("#nav-toggle");
    if (!this.header || !this.nav || !this.toggleBtn) return;

    this.toggleBtn.addEventListener("click", () => this.setOpen(!this.isOpen()));

    Utils.$$(".nav__link", this.nav).forEach((link) =>
      link.addEventListener("click", () => this.setOpen(false))
    );

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.isOpen()) {
        this.setOpen(false);
        this.toggleBtn.focus();
      }
    });

    // Fecha o menu mobile se a tela crescer para o layout desktop
    const desktopQuery = window.matchMedia(`(min-width: ${this.DESKTOP_BREAKPOINT}px)`);
    desktopQuery.addEventListener("change", (event) => {
      if (event.matches) this.setOpen(false);
    });

    this.updateHeaderOnScroll();
    window.addEventListener("scroll", () => this.updateHeaderOnScroll(), { passive: true });

    this.bindScrollSpy();
  },

  // Destaca no menu a seção que está na tela (o CSS de .nav__link.is-active já existia sem uso)
  bindScrollSpy() {
    if (!("IntersectionObserver" in window)) return;

    const links = new Map(Utils.$$(".nav__link", this.nav).map((link) => [link.hash.slice(1), link]));
    // Observa todas as seções: numa seção sem link no menu (ex.: Meu progresso), nenhum fica destacado
    const sections = Utils.$$("main section[id]");

    // Faixa estreita no terço superior da tela: só uma seção "ativa" por vez
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link, id) => {
          const active = id === entry.target.id;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-30% 0px -65% 0px" });

    sections.forEach((section) => observer.observe(section));
  },

  isOpen() {
    return this.toggleBtn.getAttribute("aria-expanded") === "true";
  },

  setOpen(open) {
    this.toggleBtn.setAttribute("aria-expanded", String(open));
    this.toggleBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    this.nav.classList.toggle("is-open", open);
    this.header.classList.toggle("is-menu-open", open);
    document.body.classList.toggle("no-scroll", open);

    // Com o menu aberto, o Tab não deve navegar pelo conteúdo escondido atrás dele
    Utils.$$("main, footer").forEach((el) => {
      el.inert = open;
    });
  },

  updateHeaderOnScroll() {
    this.header.classList.toggle("is-scrolled", window.scrollY > this.SCROLL_THRESHOLD);
  },
};

/* ===================== TIMELINE DA JORNADA ===================== */
const Timeline = {
  ANCHOR_RATIO: 0.6, // altura da tela (60%) até onde a linha de progresso é preenchida

  init() {
    this.list = Utils.$("#timeline");
    this.summary = Utils.$("#journey-summary");
    if (!this.list) return;

    const steps = JOURNEY_STEPS.map((step) => ({
      ...step,
      status: STEP_STATUS[step.status] ? step.status : "next",
      progress: Utils.clamp(Number(step.progress) || 0, 0, 100),
    }));
    const currentIndex = steps.findIndex((step) => step.status === "progress");

    this.list.innerHTML = steps
      .map((step, index) => this.renderStep(step, index, steps.length, index === currentIndex))
      .join("");

    if (this.summary) this.summary.innerHTML = this.renderSummary(steps);

    this.items = Utils.$$(".timeline__item", this.list);
    this.nodes = this.items.map((item) => Utils.$(".timeline__node", item));
    this.bindScrollProgress();
  },

  renderStep(step, index, total, isCurrent) {
    const e = Utils.escapeHTML;
    const number = String(index + 1).padStart(2, "0");
    const totalLabel = String(total).padStart(2, "0");
    const nodeContent = step.status === "done" ? ICONS.check : '<span class="timeline__node-dot"></span>';
    const classes = [
      "timeline__item",
      `timeline__item--${step.status}`,
      isCurrent && "timeline__item--current",
    ].filter(Boolean).join(" ");

    return `
      <li class="${classes}" data-reveal="timeline">
        <div class="timeline__node" aria-hidden="true">${nodeContent}</div>
        <article class="timeline__card" aria-labelledby="step-${number}">
          ${isCurrent ? '<span class="timeline__current">Você está aqui</span>' : ""}
          <div class="timeline__meta">
            <span class="timeline__number">${number}<small>/${totalLabel}</small></span>
            <span class="status status--${step.status}">${STEP_STATUS[step.status].label}</span>
          </div>
          <h3 class="timeline__title" id="step-${number}">${e(step.title)}</h3>
          <p class="timeline__description">${e(step.description)}</p>
          <ul class="timeline__tags" aria-label="Tecnologias">
            ${step.techs.map((tech) => `<li class="tag">${e(tech)}</li>`).join("")}
          </ul>
          <div class="timeline__progress">
            <div class="timeline__progress-header">
              <span>Progresso</span>
              <span class="timeline__progress-value">${step.progress}%</span>
            </div>
            ${Components.progressBar({
              value: step.progress,
              label: `Progresso em ${step.title}`,
              active: step.status === "progress",
            })}
          </div>
        </article>
      </li>`;
  },

  renderSummary(steps) {
    const count = (status) => steps.filter((step) => step.status === status).length;
    const overall = Math.round(steps.reduce((sum, step) => sum + step.progress, 0) / steps.length);

    return `
      <div class="journey-summary__main">
        <div>
          <span class="journey-summary__label">Progresso geral da jornada</span>
          <strong class="journey-summary__value">${overall}%</strong>
        </div>
        <ul class="journey-summary__legend">
          <li><span class="status-dot status-dot--done"></span>${this.legendText(count("done"), "concluída", "concluídas")}</li>
          <li><span class="status-dot status-dot--progress"></span>${this.legendText(count("progress"), "em andamento", "em andamento")}</li>
          <li><span class="status-dot status-dot--next"></span>${this.legendText(count("next"), "próxima", "próximas")}</li>
        </ul>
      </div>
      ${Components.progressBar({ value: overall, label: "Progresso geral da jornada", large: true })}`;
  },

  legendText(count, singular, pluralForm) {
    return Utils.plural(count, singular, pluralForm).replace(/^(\d+)/, "<strong>$1</strong>");
  },

  bindScrollProgress() {
    let ticking = false;
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        this.updateProgress();
        ticking = false;
      });
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    this.updateProgress();
  },

  // Preenche a linha conforme a rolagem e marca as etapas já alcançadas
  updateProgress() {
    const anchor = window.innerHeight * this.ANCHOR_RATIO;
    const rect = this.list.getBoundingClientRect();
    const fill = Utils.clamp((anchor - rect.top) / rect.height, 0, 1);

    this.list.style.setProperty("--timeline-fill", fill.toFixed(4));

    this.nodes.forEach((node, index) => {
      const nodeRect = node.getBoundingClientRect();
      this.items[index].classList.toggle("is-reached", nodeRect.top + nodeRect.height / 2 <= anchor);
    });
  },
};

/* ===================== TECNOLOGIAS ===================== */
const Techs = {
  STAGGER_MS: 70,  // atraso entre cards consecutivos
  STAGGER_COLS: 4, // reinicia o atraso a cada "linha" aproximada do grid

  init() {
    this.grid = Utils.$("#tech-grid");
    this.toolbar = Utils.$("#tech-toolbar");
    if (!this.grid) return;

    const techs = TECHNOLOGIES.map((tech) => ({
      ...tech,
      status: TECH_STATUS[tech.status] ? tech.status : "Estudando",
      level: Utils.clamp(Number(tech.level) || 0, 0, 100),
    }));

    this.grid.innerHTML = techs.map((tech, index) => this.renderCard(tech, index)).join("");
    if (this.toolbar) this.toolbar.innerHTML = this.renderToolbar(techs);

    this.bindSpotlight();
  },

  getLevelLabel(level) {
    if (level >= 80) return "Avançado";
    if (level >= 50) return "Intermediário";
    if (level >= 25) return "Básico";
    return "Iniciante";
  },

  renderCard(tech, index) {
    const e = Utils.escapeHTML;
    const delay = (index % this.STAGGER_COLS) * this.STAGGER_MS;
    const icon = TECH_ICONS[tech.icon] || TECH_ICONS.default;
    const modifier = TECH_STATUS[tech.status].modifier;

    return `
      <li class="tech-item" data-reveal="up" style="--reveal-delay: ${delay}ms">
        <article class="tech-card" style="--tech-color: ${e(tech.color || "#6366f1")}">
          <div class="tech-card__header">
            <span class="tech-card__icon tech-card__icon--${e(tech.icon)}" aria-hidden="true">${icon}</span>
            <span class="status status--${modifier}">${e(tech.status)}</span>
          </div>
          <span class="tech-card__category">${e(tech.category || "")}</span>
          <h3 class="tech-card__name">${e(tech.name)}</h3>
          <p class="tech-card__description">${e(tech.description)}</p>
          <div class="tech-card__footer">
            <div class="tech-card__level">
              <span>${this.getLevelLabel(tech.level)}</span>
              <span class="tech-card__percent" data-count="${tech.level}" data-suffix="%" data-delay="${delay + 350}">0%</span>
            </div>
            ${Components.progressBar({
              value: tech.level,
              label: `Domínio em ${tech.name}`,
              active: tech.status !== "Concluído",
            })}
          </div>
        </article>
      </li>`;
  },

  renderToolbar(techs) {
    const average = Math.round(techs.reduce((sum, tech) => sum + tech.level, 0) / techs.length);
    const legend = Object.entries(TECH_STATUS)
      .map(([label, { modifier, plural }]) => {
        const count = techs.filter((tech) => tech.status === label).length;
        return `<li><span class="status-dot status-dot--${modifier}"></span><strong>${count}</strong> ${plural}</li>`;
      })
      .join("");

    return `
      <p><strong>${techs.length}</strong> tecnologias no radar · domínio médio de <strong>${average}%</strong></p>
      <ul class="tech-toolbar__legend">${legend}</ul>`;
  },

  bindSpotlight() {
    this.grid.addEventListener("pointermove", (event) => {
      const card = event.target.closest(".tech-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  },
};

/* ===================== PROJETOS ===================== */
const Projects = {
  ALL: "Todos",
  STAGGER_MS: 80,   // atraso entre cards consecutivos na entrada
  STAGGER_MAX: 5,   // limita o atraso acumulado em listas longas
  EXIT_MS: 200,     // manter igual à duração de .project-item.is-leaving no CSS

  init() {
    this.grid = Utils.$("#projects-grid");
    this.filtersEl = Utils.$("#project-filters");
    this.summary = Utils.$("#projects-summary");
    this.empty = Utils.$("#projects-empty");
    this.liveRegion = Utils.$("#projects-live");
    if (!this.grid) return;

    this.projects = PROJECTS.map((project) => ({
      ...project,
      status: PROJECT_STATUS[project.status] ? project.status : "Planejado",
      filters: PROJECT_FILTERS
        .filter((filter) => filter.techs?.some((tech) => project.techs.includes(tech)))
        .map((filter) => filter.label),
    }));
    this.active = this.ALL;

    this.grid.innerHTML = this.projects.map((project, index) => this.renderCard(project, index)).join("");
    this.items = Utils.$$(".project-item", this.grid);

    // Restaura o último filtro escolhido (preferência salva no navegador)
    const saved = Prefs.get("projectFilter", this.ALL);
    if (saved !== this.ALL && PROJECT_FILTERS.some((filter) => filter.label === saved)) {
      this.active = saved;
      this.applyFilter({ announce: false });
    }

    if (this.summary) this.summary.innerHTML = this.renderSummary();
    if (this.filtersEl) {
      this.filtersEl.innerHTML = this.renderFilters();
      this.filtersEl.addEventListener("click", (event) => {
        const button = event.target.closest(".filter-btn");
        if (button) this.setFilter(button.dataset.filter);
      });
    }

    this.grid.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-project-open]");
      if (!trigger) return;
      const project = this.projects.find((item) => item.id === trigger.dataset.projectOpen);
      if (project) ProjectModal.open(project, trigger);
    });
  },

  matches(project, filter) {
    return filter === this.ALL || project.filters.includes(filter);
  },

  enterDelay(order) {
    return `${Math.min(order, this.STAGGER_MAX) * this.STAGGER_MS}ms`;
  },

  // Capa gerada: "janela" de aplicativo com o ícone e a cor do projeto
  renderCover(project) {
    const e = Utils.escapeHTML;
    if (project.image) {
      return `
        <div class="project-cover">
          <img class="project-cover__img" src="${e(project.image)}" alt="Tela do projeto ${e(project.title)}" loading="lazy">
        </div>`;
    }

    return `
      <div class="project-cover" aria-hidden="true">
        <div class="project-cover__window">
          <div class="project-cover__bar"><span></span><span></span><span></span></div>
          <div class="project-cover__body">
            <span class="project-cover__icon">${PROJECT_ICONS[project.icon] || PROJECT_ICONS.default}</span>
            <span class="project-cover__lines"><span></span><span></span><span></span></span>
          </div>
        </div>
      </div>`;
  },

  renderTags(project) {
    return project.techs.map((tech) => `<li class="tag">${Utils.escapeHTML(tech)}</li>`).join("");
  },

  renderCard(project, index) {
    const e = Utils.escapeHTML;
    const modifier = PROJECT_STATUS[project.status].modifier;
    const demoLink = project.demo
      ? `<a class="icon-btn" href="${e(project.demo)}" target="_blank" rel="noopener noreferrer"
            aria-label="Demonstração de ${e(project.title)}" title="Ver demonstração">${ICONS.external}</a>`
      : "";

    return `
      <li class="project-item is-entering" data-reveal="project" style="--enter-delay: ${this.enterDelay(index)}">
        <article class="project-card" style="--project-color: ${e(project.color || "#6366f1")}" aria-labelledby="project-${e(project.id)}">
          <div class="project-card__media">${this.renderCover(project)}</div>
          <div class="project-card__body">
            <div class="project-card__meta">
              <span class="project-card__category">${e(project.category)}</span>
              <span class="status status--${modifier}">${e(project.status)}</span>
            </div>
            <h3 class="project-card__title" id="project-${e(project.id)}">${e(project.title)}</h3>
            <p class="project-card__description">${e(project.description)}</p>
            <ul class="project-card__tags" aria-label="Tecnologias">${this.renderTags(project)}</ul>
            <div class="project-card__footer">
              <button class="btn btn--primary btn--sm" type="button" data-project-open="${e(project.id)}">
                Ver projeto ${ICONS.arrowRight}
              </button>
              <div class="project-card__links">
                <a class="icon-btn" href="${e(project.github)}" target="_blank" rel="noopener noreferrer"
                   aria-label="Código de ${e(project.title)} no GitHub" title="Código no GitHub">${ICONS.github}</a>
                ${demoLink}
              </div>
            </div>
          </div>
        </article>
      </li>`;
  },

  renderFilters() {
    const e = Utils.escapeHTML;
    return PROJECT_FILTERS.map(({ label }) => {
      const count = this.projects.filter((project) => this.matches(project, label)).length;
      return `
        <button class="filter-btn" type="button" data-filter="${e(label)}" aria-pressed="${label === this.active}">
          ${e(label)}<span class="filter-btn__count">${count}</span>
        </button>`;
    }).join("");
  },

  renderSummary() {
    const done = this.projects.filter((project) => project.status === "Concluído").length;
    return `<strong>${this.projects.length}</strong> projetos · <strong>${done}</strong> concluídos`;
  },

  // Cards atuais saem com fade; depois o grid é refiltrado e os novos entram em cascata
  setFilter(filter) {
    if (filter === this.active) return;
    this.active = filter;
    Prefs.set("projectFilter", filter);

    Utils.$$(".filter-btn", this.filtersEl).forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter))
    );

    const leaving = this.items.filter((item) => !item.hidden);
    leaving.forEach((item) => {
      item.classList.remove("is-entering");
      item.classList.add("is-leaving");
    });

    clearTimeout(this.exitTimer);
    const wait = Utils.prefersReducedMotion() || !leaving.length ? 0 : this.EXIT_MS;
    this.exitTimer = setTimeout(() => this.applyFilter(), wait);
  },

  applyFilter({ announce = true } = {}) {
    const visible = [];
    this.items.forEach((item, index) => {
      const match = this.matches(this.projects[index], this.active);
      item.hidden = !match;
      item.classList.remove("is-leaving", "is-entering");
      if (match) visible.push(item);
    });

    void this.grid.offsetWidth; // força reflow para reiniciar a animação de entrada

    visible.forEach((item, order) => {
      item.style.setProperty("--enter-delay", this.enterDelay(order));
      item.classList.add("is-entering");
    });

    if (this.empty) this.empty.hidden = visible.length > 0;
    if (this.liveRegion && announce) {
      this.liveRegion.textContent = Utils.plural(visible.length, "projeto encontrado", "projetos encontrados");
    }
  },
};

/* ===================== MODAL DE PROJETO ===================== */
// Usa o <dialog> nativo: foco preso no modal, Esc e camada superior vêm do navegador
const ProjectModal = {
  init() {
    this.dialog = Utils.$("#project-modal");
    this.content = Utils.$("#project-modal-content");
    if (!this.dialog || typeof this.dialog.showModal !== "function") return;

    this.dialog.addEventListener("click", (event) => {
      // Clique no backdrop tem o próprio <dialog> como alvo
      if (event.target === this.dialog || event.target.closest("[data-modal-close]")) this.close();
    });

    this.dialog.addEventListener("cancel", (event) => {
      event.preventDefault(); // Esc passa pela animação de saída
      this.close();
    });

    this.dialog.addEventListener("close", () => {
      this.dialog.classList.remove("is-closing");
      document.body.classList.remove("no-scroll");
      this.trigger?.focus();
    });
  },

  open(project, trigger) {
    if (!this.dialog || typeof this.dialog.showModal !== "function") return;

    this.trigger = trigger;
    this.content.innerHTML = this.render(project);
    this.dialog.style.setProperty("--project-color", project.color || "#6366f1");
    this.dialog.classList.remove("is-closing");
    this.dialog.showModal();
    this.content.scrollTop = 0;
    document.body.classList.add("no-scroll");
  },

  close() {
    if (!this.dialog.open || this.dialog.classList.contains("is-closing")) return;

    if (Utils.prefersReducedMotion()) {
      this.dialog.close();
      return;
    }

    this.dialog.classList.add("is-closing");
    const onEnd = (event) => {
      if (event.animationName !== "modal-out") return;
      this.dialog.removeEventListener("animationend", onEnd);
      this.dialog.close();
    };
    this.dialog.addEventListener("animationend", onEnd);
  },

  render(project) {
    const e = Utils.escapeHTML;
    const modifier = PROJECT_STATUS[project.status].modifier;
    const features = (project.features || [])
      .map((feature) => `<li>${ICONS.check}<span>${e(feature)}</span></li>`)
      .join("");
    const demoAction = project.demo
      ? `<a class="btn btn--primary" href="${e(project.demo)}" target="_blank" rel="noopener noreferrer">
           Ver demonstração ${ICONS.external}
         </a>`
      : '<span class="btn btn--ghost is-disabled" aria-disabled="true">Demonstração em breve</span>';

    return `
      <div class="modal__media">${Projects.renderCover(project)}</div>
      <div class="modal__body">
        <div class="project-card__meta">
          <span class="project-card__category">${e(project.category)}</span>
          <span class="status status--${modifier}">${e(project.status)}</span>
        </div>
        <h2 class="modal__title" id="project-modal-title">${e(project.title)}</h2>
        <p class="modal__description">${e(project.details || project.description)}</p>

        <div class="modal__grid">
          ${features ? `
          <section>
            <h3 class="modal__subtitle">Funcionalidades</h3>
            <ul class="modal__features">${features}</ul>
          </section>` : ""}
          <section>
            <h3 class="modal__subtitle">Tecnologias</h3>
            <ul class="project-card__tags">${Projects.renderTags(project)}</ul>
          </section>
        </div>

        <div class="modal__actions">
          <a class="btn btn--ghost" href="${e(project.github)}" target="_blank" rel="noopener noreferrer">
            ${ICONS.github} Ver no GitHub
          </a>
          ${demoAction}
        </div>
      </div>`;
  },
};

/* ===================== ESTUDOS: ESTADO + LOCALSTORAGE ===================== */
// Fonte única dos dados de estudo (tarefas, sessões e cronômetro).
// Toda alteração passa por commit(): salva no navegador e avisa os módulos inscritos.
const StudyStore = {
  KEY: "devjourney-study",
  VERSION: 1,
  MIN_SESSION_MS: 60 * 1000, // sessões com menos de 1 minuto não são registradas
  listeners: [],

  init() {
    this.load();

    // Outra aba salvou: recarrega daqui para não sobrescrever as mudanças dela no próximo commit
    if (!this.syncBound) {
      this.syncBound = true;
      window.addEventListener("storage", (event) => {
        if (event.key !== this.KEY) return;
        this.load();
        this.listeners.forEach((listener) => listener(this.state));
      });
    }
  },

  load() {
    const saved = LocalStore.get(this.KEY, null);

    if (saved?.version === this.VERSION && Array.isArray(saved.tasks)) {
      this.state = this.sanitize(saved);
      return;
    }

    // Primeira visita: tarefas de exemplo (salvas só quando algo mudar)
    const now = Date.now();
    this.state = {
      tasks: STUDY_TASKS.map((task, index) =>
        this.createTask(task, { id: `exemplo-${index + 1}`, createdAt: now - index * 1000 })
      ),
      sessions: [],
      timer: this.emptyTimer(),
    };
  },

  emptyTimer() {
    return { running: false, startedAt: null, elapsed: 0, taskId: null };
  },

  // O localStorage pode ter dados antigos, editados à mão ou corrompidos: descarta o que não tem o formato esperado
  sanitize(saved) {
    const isText = (value) => typeof value === "string" && value.trim() !== "";
    const isTime = (value) => Number.isFinite(value) && value >= 0;

    const tasks = saved.tasks
      .filter((task) => task && isText(task.id) && isText(task.title))
      .map((task) => ({
        id: task.id,
        title: task.title.trim().slice(0, 120),
        category: isText(task.category) ? task.category : TASK_CATEGORIES[0],
        estimate: Number(task.estimate) > 0 ? Number(task.estimate) : null,
        done: Boolean(task.done),
        createdAt: isTime(task.createdAt) ? task.createdAt : 0,
        doneAt: isTime(task.doneAt) ? task.doneAt : null,
      }));

    const sessions = (Array.isArray(saved.sessions) ? saved.sessions : [])
      .filter((session) => session && isTime(session.ms) && !Number.isNaN(Date.parse(session.date)));

    const timer = { ...this.emptyTimer(), ...(saved.timer && typeof saved.timer === "object" ? saved.timer : {}) };
    timer.running = Boolean(timer.running) && isTime(timer.startedAt);
    timer.startedAt = timer.running ? timer.startedAt : null;
    timer.elapsed = isTime(timer.elapsed) ? timer.elapsed : 0;
    timer.taskId = tasks.some((task) => task.id === timer.taskId) ? timer.taskId : null;

    return { tasks, sessions, timer };
  },

  createTask({ title, category, estimate, done = false }, overrides = {}) {
    const now = Date.now();
    return {
      id: Utils.uid(),
      title: String(title).trim(),
      category: category || TASK_CATEGORIES[0],
      estimate: Number(estimate) > 0 ? Number(estimate) : null,
      done: Boolean(done),
      createdAt: now,
      doneAt: done ? now : null,
      ...overrides,
    };
  },

  subscribe(listener) {
    this.listeners.push(listener);
  },

  commit() {
    LocalStore.set(this.KEY, { version: this.VERSION, ...this.state });
    this.listeners.forEach((listener) => listener(this.state));
  },

  getTask(id) {
    return this.state.tasks.find((task) => task.id === id) || null;
  },

  /* --- Tarefas --- */
  addTask(data) {
    const task = this.createTask(data);
    this.state.tasks.push(task);
    this.commit();
    return task;
  },

  toggleTask(id) {
    const task = this.getTask(id);
    if (!task) return;
    task.done = !task.done;
    task.doneAt = task.done ? Date.now() : null;
    this.commit();
  },

  // Devolve { task, index } de cada removida, para o "Desfazer" recolocar no mesmo lugar
  removeTasks(ids) {
    const removed = [];
    this.state.tasks = this.state.tasks.filter((task, index) => {
      if (!ids.includes(task.id)) return true;
      removed.push({ task, index });
      return false;
    });
    if (ids.includes(this.state.timer.taskId)) this.state.timer.taskId = null;
    this.commit();
    return removed;
  },

  restoreTasks(removed) {
    removed.forEach(({ task, index }) => {
      this.state.tasks.splice(Math.min(index, this.state.tasks.length), 0, task);
    });
    this.commit();
  },

  /* --- Cronômetro ---
     Guarda o horário de início em vez de contar segundos: assim o tempo
     continua certo mesmo se a aba ficar em segundo plano ou a página recarregar. */
  timerElapsed() {
    const { elapsed, running, startedAt } = this.state.timer;
    return elapsed + (running ? Math.max(0, Date.now() - startedAt) : 0);
  },

  startTimer() {
    const timer = this.state.timer;
    if (timer.running) return;
    timer.running = true;
    timer.startedAt = Date.now();
    this.commit();
  },

  pauseTimer() {
    const timer = this.state.timer;
    if (!timer.running) return;
    timer.elapsed = this.timerElapsed();
    timer.running = false;
    timer.startedAt = null;
    this.commit();
  },

  setTimerTask(id) {
    this.state.timer.taskId = id || null;
    this.commit();
  },

  setTimer(timer) {
    this.state.timer = { ...this.emptyTimer(), ...timer };
    this.commit();
  },

  // Zera o tempo mantendo a tarefa escolhida; devolve o estado anterior para o "Desfazer"
  resetTimer() {
    const previous = { ...this.state.timer };
    this.state.timer = { ...this.emptyTimer(), taskId: previous.taskId };
    this.commit();
    return previous;
  },

  logSession() {
    const ms = this.timerElapsed();
    if (ms < this.MIN_SESSION_MS) return null;

    const task = this.getTask(this.state.timer.taskId);
    const session = {
      id: Utils.uid(),
      taskId: task?.id ?? null,
      category: task?.category ?? null, // guardado na sessão: continua valendo se a tarefa for excluída
      ms,
      date: new Date().toISOString(),
    };

    this.state.sessions.push(session);
    this.state.timer = { ...this.emptyTimer(), taskId: this.state.timer.taskId };
    this.commit();
    return session;
  },

  loggedMs(predicate = () => true) {
    return this.state.sessions.filter(predicate).reduce((sum, session) => sum + session.ms, 0);
  },
};

/* ===================== MEU PROGRESSO (dashboard) ===================== */
// Junta PROGRESS_DATA com as sessões do cronômetro e se atualiza a cada sessão registrada
const Progress = {
  STAGGER_MS: 80,
  TICK_COUNT: 3,   // linhas de grade acima do zero no gráfico de colunas
  MONTHS_SHOWN: 6,
  MS_PER_HOUR: 3600000,

  init() {
    this.root = Utils.$("#progress-dashboard");
    if (!this.root) return;

    const model = this.getModel();
    this.loggedMs = model.loggedMs;

    this.root.innerHTML = `
      <ul class="stat-grid" aria-label="Indicadores">
        ${model.stats.map((stat, index) => this.renderStat(stat, index)).join("")}
      </ul>
      ${this.renderOverall(PROGRESS_DATA.overall)}
      <div class="chart-grid">
        ${this.renderChartCard({
          id: "months",
          title: "Horas de estudo por mês",
          subtitle: this.monthSubtitle(model.months),
          body: this.renderMonthBody(model.months),
          toggle: true,
        })}
        ${this.renderChartCard({
          id: "areas",
          title: "Horas por área",
          subtitle: "Onde o tempo de estudo foi investido",
          body: this.renderAreaBody(model.areas),
          delay: this.STAGGER_MS,
        })}
      </div>`;

    Utils.$$(".chart-card", this.root).forEach((card) => {
      this.bindTooltip(card);
      this.bindTableToggle(card);
    });

    StudyStore.subscribe(() => this.refresh());
  },

  getModel() {
    const sessions = StudyStore.state.sessions;
    const toHours = (ms) => ms / this.MS_PER_HOUR;
    const positive = (value) => Math.max(0, Number(value) || 0);
    const loggedMs = StudyStore.loggedMs();

    const stats = PROGRESS_DATA.stats.map((stat) => {
      const isHours = stat.key === "hours";
      return {
        ...stat,
        value: positive(stat.value) + (isHours ? toHours(loggedMs) : 0),
        detail: isHours && loggedMs ? `Inclui ${Utils.formatDuration(loggedMs)} do cronômetro` : stat.detail,
      };
    });

    const months = new Map(PROGRESS_DATA.hoursByMonth.map((item) => [item.month, positive(item.hours)]));
    const areas = new Map(PROGRESS_DATA.hoursByArea.map((item) => [item.label, positive(item.hours)]));

    sessions.forEach((session) => {
      const hours = toHours(session.ms);
      const month = Utils.monthKey(new Date(session.date));
      months.set(month, (months.get(month) || 0) + hours);
      if (session.category) areas.set(session.category, (areas.get(session.category) || 0) + hours);
    });

    return {
      loggedMs,
      stats,
      months: [...months]
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-this.MONTHS_SHOWN)
        .map(([month, hours]) => ({ label: Utils.monthLabel(month), hours })),
      areas: [...areas]
        .map(([label, hours]) => ({ label, hours }))
        .sort((a, b) => b.hours - a.hours),
    };
  },

  // Só as sessões do cronômetro mudam o dashboard; marcar tarefas não redesenha nada aqui
  refresh() {
    const model = this.getModel();
    if (model.loggedMs === this.loggedMs) return;
    this.loggedMs = model.loggedMs;

    model.stats.forEach((stat, index) => {
      const value = Utils.$(`[data-stat-index="${index}"]`, this.root);
      const detail = Utils.$(`[data-stat-detail="${index}"]`, this.root);
      if (detail) detail.textContent = stat.detail || "";
      if (!value) return;

      const from = Number(value.dataset.count);
      value.dataset.count = stat.value;
      value.nextElementSibling.textContent = this.formatStat(stat);
      if (value.closest(".is-visible")) {
        Utils.animateNumber(value, stat.value, { from, duration: 900, suffix: stat.suffix || "", decimals: 1 });
      }
    });

    this.updateChart("months", this.renderMonthBody(model.months), this.monthSubtitle(model.months));
    this.updateChart("areas", this.renderAreaBody(model.areas));
  },

  updateChart(id, body, subtitle) {
    const card = Utils.$(`[data-chart="${id}"]`, this.root);
    if (!card) return;
    Utils.$("[data-chart-body]", card).innerHTML = body;
    Utils.$(".chart-tooltip", card).hidden = true;
    if (subtitle) Utils.$("[data-chart-subtitle]", card).textContent = subtitle;
    this.applyView(card);
  },

  formatStat(stat) {
    return `${Utils.formatNumber(stat.value, 1)}${stat.suffix || ""}`;
  },

  renderStat(stat, index) {
    const e = Utils.escapeHTML;
    const suffix = stat.suffix || "";

    return `
      <li class="stat-item" data-reveal="up" style="--reveal-delay: ${index * this.STAGGER_MS}ms">
        <article class="stat-card">
          <div class="stat-card__header">
            <span class="stat-card__icon" aria-hidden="true">${PROGRESS_ICONS[stat.icon] || TECH_ICONS.default}</span>
            <h3 class="stat-card__label">${e(stat.label)}</h3>
          </div>
          <p class="stat-card__value">
            <span aria-hidden="true" data-stat-index="${index}" data-count="${stat.value}" data-suffix="${e(suffix)}"
                  data-decimals="1" data-delay="${index * this.STAGGER_MS + 200}">0${e(suffix)}</span>
            <span class="visually-hidden">${e(this.formatStat(stat))}</span>
          </p>
          <p class="stat-card__detail" data-stat-detail="${index}">${e(stat.detail || "")}</p>
        </article>
      </li>`;
  },

  renderOverall(overall) {
    const e = Utils.escapeHTML;
    const value = Utils.clamp(Number(overall.value) || 0, 0, 100);

    return `
      <article class="overview-card" data-reveal="up">
        <div class="overview-card__header">
          <div>
            <h3 class="overview-card__label">${e(overall.label)}</h3>
            ${overall.description ? `<p class="overview-card__text">${e(overall.description)}</p>` : ""}
          </div>
          <p class="overview-card__value">
            <span aria-hidden="true" data-count="${value}" data-suffix="%" data-delay="250">0%</span>
            <span class="visually-hidden">${value}%</span>
          </p>
        </div>
        ${Components.progressBar({ value, label: overall.label, active: value < 100, large: true })}
        <div class="overview-card__scale">
          <span>${e(overall.start || "0%")}</span>
          <span>${e(overall.end || "100%")}</span>
        </div>
      </article>`;
  },

  renderChartCard({ id, title, subtitle, body, toggle = false, delay = 0 }) {
    const e = Utils.escapeHTML;
    return `
      <article class="chart-card" data-chart="${id}" data-reveal="up" style="--reveal-delay: ${delay}ms">
        <header class="chart-card__header">
          <div>
            <h3 class="chart-card__title">${e(title)}</h3>
            <p class="chart-card__subtitle" data-chart-subtitle>${e(subtitle)}</p>
          </div>
          ${toggle ? '<button class="chart-toggle" type="button" aria-pressed="false" data-chart-toggle>Ver tabela</button>' : ""}
        </header>
        <div class="chart-card__body" data-chart-body>${body}</div>
        <div class="chart-tooltip" aria-hidden="true" hidden></div>
      </article>`;
  },

  monthSubtitle(months) {
    const total = months.reduce((sum, item) => sum + item.hours, 0);
    return `${Utils.formatNumber(total, 1)}h nos últimos ${months.length} meses`;
  },

  // Escala "redonda" para o eixo: 0, 10, 20, 30 em vez de 0, 9.3, 18.6...
  niceScale(max) {
    const rough = Math.max(max, 1) / this.TICK_COUNT;
    const magnitude = 10 ** Math.floor(Math.log10(rough));
    const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= rough);
    return { step, max: step * this.TICK_COUNT };
  },

  // Gráfico de colunas — rótulo direto só no mês atual; os demais ficam no eixo, tooltip e tabela
  renderMonthBody(months) {
    const e = Utils.escapeHTML;
    const hours = (value) => `${Utils.formatNumber(value, 1)}h`;
    const total = months.reduce((sum, item) => sum + item.hours, 0);
    const { step, max } = this.niceScale(Math.max(...months.map((item) => item.hours)));
    const ticks = Array.from({ length: this.TICK_COUNT + 1 }, (_, i) => i * step);
    const lastIndex = months.length - 1;

    const columns = months.map((item, index) => `
      <li class="col-chart__col" tabindex="0" style="--value: ${item.hours}; --i: ${index}"
          data-tip-value="${hours(item.hours)}" data-tip-label="${e(item.label)}"
          aria-label="${e(item.label)}: ${Utils.formatNumber(item.hours, 1)} horas">
        ${index === lastIndex ? `<span class="col-chart__value" aria-hidden="true">${hours(item.hours)}</span>` : ""}
        <span class="col-chart__bar"></span>
      </li>`).join("");

    const rows = months
      .map((item) => `<tr><th scope="row">${e(item.label)}</th><td>${hours(item.hours)}</td></tr>`)
      .join("");

    return `
      <div class="col-chart" data-chart-view style="--max: ${max}; --count: ${months.length}">
        <div class="col-chart__plot">
          <ul class="col-chart__grid" aria-hidden="true">
            ${ticks.map((tick) => `<li style="--tick: ${tick}"><span>${Utils.formatNumber(tick, 1)}h</span></li>`).join("")}
          </ul>
          <ul class="col-chart__cols" aria-label="Horas de estudo por mês">${columns}</ul>
        </div>
        <ul class="col-chart__labels" aria-hidden="true">
          ${months.map((item) => `<li>${e(item.label)}</li>`).join("")}
        </ul>
      </div>

      <table class="chart-table" data-chart-table hidden>
        <caption class="visually-hidden">Horas de estudo por mês</caption>
        <thead><tr><th scope="col">Mês</th><th scope="col">Horas</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><th scope="row">Total</th><td>${hours(total)}</td></tr></tfoot>
      </table>`;
  },

  // Barras horizontais — poucas categorias, então todas levam o valor na ponta
  renderAreaBody(areas) {
    const e = Utils.escapeHTML;
    const total = areas.reduce((sum, item) => sum + item.hours, 0);
    const max = Math.max(...areas.map((item) => item.hours), 1);

    const bars = areas.map((item, index) => {
      const share = total ? Math.round((item.hours / total) * 100) : 0;
      const hours = Utils.formatNumber(item.hours, 1);
      return `
        <li class="bar-chart__row" tabindex="0" style="--value: ${item.hours}; --max: ${max}; --i: ${index}"
            data-tip-value="${share}% do total" data-tip-label="${e(item.label)}"
            aria-label="${e(item.label)}: ${hours} horas, ${share}% do total">
          <span class="bar-chart__label" aria-hidden="true">${e(item.label)}</span>
          <span class="bar-chart__track" aria-hidden="true">
            <span class="bar-chart__bar"></span>
            <span class="bar-chart__value">${hours}h</span>
          </span>
        </li>`;
    }).join("");

    return `<ul class="bar-chart" aria-label="Horas por área">${bars}</ul>`;
  },

  // Um tooltip por gráfico, com delegação de eventos: continua valendo quando as barras são redesenhadas
  bindTooltip(card) {
    const tooltip = Utils.$(".chart-tooltip", card);

    const show = (mark) => {
      const value = document.createElement("strong");
      const label = document.createElement("span");
      value.textContent = mark.dataset.tipValue;
      label.textContent = mark.dataset.tipLabel;
      tooltip.replaceChildren(value, label);
      tooltip.hidden = false;

      // Ancora no topo da barra (colunas) ou na ponta da barra (horizontal)
      const bar = Utils.$(".col-chart__bar, .bar-chart__bar", mark);
      const cardRect = card.getBoundingClientRect();
      const barRect = bar.getBoundingClientRect();
      const isColumn = bar.classList.contains("col-chart__bar");
      const x = isColumn ? barRect.left + barRect.width / 2 : barRect.right;
      tooltip.style.left = `${x - cardRect.left}px`;
      tooltip.style.top = `${barRect.top - cardRect.top}px`;
    };

    const onEnter = (event) => {
      const mark = event.target.closest("[data-tip-value]");
      if (mark) show(mark);
    };
    const onLeave = (event) => {
      const mark = event.target.closest("[data-tip-value]");
      if (mark && !mark.contains(event.relatedTarget)) tooltip.hidden = true;
    };

    card.addEventListener("pointerover", onEnter);
    card.addEventListener("focusin", onEnter);
    card.addEventListener("pointerout", onLeave);
    card.addEventListener("focusout", onLeave);
  },

  bindTableToggle(card) {
    const button = Utils.$("[data-chart-toggle]", card);
    if (!button) return;
    button.addEventListener("click", () => {
      card.dataset.view = card.dataset.view === "table" ? "chart" : "table";
      this.applyView(card);
    });
  },

  applyView(card) {
    const button = Utils.$("[data-chart-toggle]", card);
    if (!button) return;
    const showTable = card.dataset.view === "table";
    button.setAttribute("aria-pressed", String(showTable));
    button.textContent = showTable ? "Ver gráfico" : "Ver tabela";
    Utils.$("[data-chart-view]", card).hidden = showTable;
    Utils.$("[data-chart-table]", card).hidden = !showTable;
  },
};

/* ===================== CRONÔMETRO DE ESTUDO ===================== */
const StudyTimer = {
  init() {
    this.card = Utils.$("#study-timer");
    if (!this.card) return;

    this.display = Utils.$("#timer-display");
    this.stateEl = Utils.$("#timer-state");
    this.select = Utils.$("#timer-task");
    this.toggleBtn = Utils.$("#timer-toggle");
    this.saveBtn = Utils.$("#timer-save");
    this.resetBtn = Utils.$("#timer-reset");
    this.todayEl = Utils.$("#timer-today");
    this.totalEl = Utils.$("#timer-total");

    this.toggleBtn.addEventListener("click", () => this.toggle());
    this.saveBtn.addEventListener("click", () => this.save());
    this.resetBtn.addEventListener("click", () => this.reset());
    this.select.addEventListener("change", () => StudyStore.setTimerTask(this.select.value));

    StudyStore.subscribe(() => this.render());
    this.render();
  },

  toggle() {
    if (StudyStore.state.timer.running) StudyStore.pauseTimer();
    else StudyStore.startTimer();
  },

  // Chamado pelo botão "Estudar agora" de cada tarefa
  studyTask(id) {
    StudyStore.setTimerTask(id);
    StudyStore.startTimer();
    this.card.scrollIntoView({ behavior: Utils.prefersReducedMotion() ? "auto" : "smooth", block: "center" });
  },

  save() {
    const session = StudyStore.logSession();
    if (!session) {
      Toast.show("Estude pelo menos 1 minuto para registrar a sessão.");
      return;
    }
    const task = StudyStore.getTask(session.taskId);
    Toast.show(`Sessão de ${Utils.formatDuration(session.ms)} registrada${task ? ` em “${task.title}”` : ""}.`);
  },

  reset() {
    if (!StudyStore.timerElapsed()) return;
    const previous = StudyStore.resetTimer();
    Toast.show("Cronômetro zerado.", {
      actionLabel: "Desfazer",
      onAction: () => StudyStore.setTimer(previous),
    });
  },

  render() {
    const e = Utils.escapeHTML;
    const { timer, tasks } = StudyStore.state;

    // Opções: estudo livre + tarefas pendentes (+ a tarefa atual, mesmo que já concluída)
    const options = tasks.filter((task) => !task.done || task.id === timer.taskId);
    this.select.innerHTML = '<option value="">Estudo livre (sem tarefa)</option>' +
      options.map((task) => `<option value="${e(task.id)}">${e(task.title)}</option>`).join("");
    this.select.value = timer.taskId || "";

    const [modifier, label] = timer.running
      ? ["progress", "Em andamento"]
      : timer.elapsed ? ["studying", "Pausado"] : ["next", "Parado"];
    this.stateEl.className = `status status--${modifier}`;
    this.stateEl.textContent = label;

    this.card.classList.toggle("is-running", timer.running);
    this.toggleBtn.innerHTML = timer.running
      ? `${ICONS.pause} Pausar`
      : `${ICONS.play} ${timer.elapsed ? "Continuar" : "Iniciar"}`;

    this.todayEl.textContent = Utils.formatDuration(StudyStore.loggedMs((session) => Utils.isToday(session.date)));
    this.totalEl.textContent = Utils.formatDuration(StudyStore.loggedMs());

    this.tick();
    clearInterval(this.interval);
    if (timer.running) this.interval = setInterval(() => this.tick(), 1000);
  },

  tick() {
    const elapsed = StudyStore.timerElapsed();
    this.display.textContent = Utils.formatClock(elapsed);
    this.saveBtn.disabled = elapsed < StudyStore.MIN_SESSION_MS;
  },
};

/* ===================== TAREFAS DE ESTUDO ===================== */
const Tasks = {
  STATUS_FILTERS: [
    { id: "all",     label: "Todas" },
    { id: "pending", label: "Pendentes" },
    { id: "done",    label: "Concluídas" },
  ],
  EXIT_MS: 220,      // manter igual à duração de .task.is-leaving no CSS
  TOGGLE_DELAY: 450, // tempo para ver o "check" antes de a tarefa mudar de lugar

  init() {
    this.list = Utils.$("#task-list");
    if (!this.list) return;

    this.form = Utils.$("#task-form");
    this.titleInput = Utils.$("#task-title");
    this.formCategory = Utils.$("#task-category");
    this.estimateInput = Utils.$("#task-estimate");
    this.searchInput = Utils.$("#task-search");
    this.filtersEl = Utils.$("#task-filters");
    this.categoryFilter = Utils.$("#task-category-filter");
    this.emptyEl = Utils.$("#task-empty");
    this.summaryEl = Utils.$("#task-summary");
    this.clearBtn = Utils.$("#task-clear");
    this.progressCard = Utils.$("#task-progress");

    // Preferências salvas (com validação, caso a lista de áreas tenha mudado)
    const savedFilter = Prefs.get("taskFilter", "all");
    const savedCategory = Prefs.get("taskCategory", "all");
    const savedFormCategory = Prefs.get("taskFormCategory", TASK_CATEGORIES[0]);
    this.filter = this.STATUS_FILTERS.some((f) => f.id === savedFilter) ? savedFilter : "all";
    this.category = TASK_CATEGORIES.includes(savedCategory) ? savedCategory : "all";
    this.query = "";
    this.pendingToggles = new Map();

    this.renderControls(TASK_CATEGORIES.includes(savedFormCategory) ? savedFormCategory : TASK_CATEGORIES[0]);
    this.renderProgressCard();
    this.bindEvents();

    StudyStore.subscribe(() => this.render());
    this.render();
  },

  renderControls(formCategory) {
    const e = Utils.escapeHTML;
    const options = TASK_CATEGORIES.map((category) => `<option value="${e(category)}">${e(category)}</option>`).join("");

    this.formCategory.innerHTML = options;
    this.formCategory.value = formCategory;

    this.categoryFilter.innerHTML = `<option value="all">Todas as áreas</option>${options}`;
    this.categoryFilter.value = this.category;

    this.filtersEl.innerHTML = this.STATUS_FILTERS.map(({ id, label }) => `
      <button class="filter-btn" type="button" data-filter="${id}" aria-pressed="${id === this.filter}">
        ${label}<span class="filter-btn__count" data-filter-count="${id}">0</span>
      </button>`).join("");
  },

  renderProgressCard() {
    if (!this.progressCard) return;
    this.progressCard.innerHTML = `
      <div class="task-progress__header">
        <div>
          <h3 class="task-progress__title">Progresso das tarefas</h3>
          <p class="task-progress__text" data-tp="text"></p>
        </div>
        <p class="task-progress__value"><span data-tp="value">0%</span></p>
      </div>
      ${Components.progressBar({ value: 0, label: "Progresso das tarefas", active: true, large: true })}
      <ul class="task-progress__stats">
        <li><strong data-tp="done">0</strong><span>concluídas</span></li>
        <li><strong data-tp="pending">0</strong><span>pendentes</span></li>
        <li><strong data-tp="hours">0h</strong><span>estimadas a fazer</span></li>
      </ul>`;

    this.progressCard.addEventListener("reveal", () => {
      Utils.animateNumber(Utils.$('[data-tp="value"]', this.progressCard), this.percent, { delay: 250, suffix: "%" });
    }, { once: true });
  },

  bindEvents() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.add();
    });

    this.formCategory.addEventListener("change", () => Prefs.set("taskFormCategory", this.formCategory.value));

    this.searchInput.addEventListener("input", () => {
      this.query = this.searchInput.value;
      this.render();
    });

    this.filtersEl.addEventListener("click", (event) => {
      const button = event.target.closest(".filter-btn");
      if (button) this.setFilter(button.dataset.filter);
    });

    this.categoryFilter.addEventListener("change", () => {
      this.category = this.categoryFilter.value;
      Prefs.set("taskCategory", this.category);
      this.render();
    });

    this.list.addEventListener("change", (event) => {
      const checkbox = event.target.closest('[data-action="toggle"]');
      if (checkbox) this.toggle(checkbox);
    });

    this.list.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;
      const id = button.closest(".task").dataset.id;
      if (button.dataset.action === "delete") this.remove(id, button.closest(".task"));
      if (button.dataset.action === "study") StudyTimer.studyTask(id);
    });

    this.clearBtn.addEventListener("click", () => this.clearDone());
  },

  setFilter(filter) {
    this.filter = filter;
    Prefs.set("taskFilter", filter);
    this.render();
  },

  add() {
    const title = this.titleInput.value.trim();
    if (!title) {
      this.titleInput.value = "";
      this.form.reportValidity();
      return;
    }

    const task = StudyStore.addTask({
      title,
      category: this.formCategory.value,
      estimate: this.estimateInput.value,
    });

    // Garante que a tarefa nova apareça, mesmo com filtros ativos
    if (this.filter === "done") this.setFilter("all");
    if (this.category !== "all" && this.category !== task.category) {
      this.category = "all";
      this.categoryFilter.value = "all";
      Prefs.set("taskCategory", "all");
    }
    if (this.query && !this.matchesQuery(task)) {
      this.query = "";
      this.searchInput.value = "";
    }

    this.newId = task.id;
    this.render();

    this.form.reset();
    this.formCategory.value = task.category; // mantém a última área escolhida
    this.titleInput.focus();
  },

  // Mostra o "check" na hora e só reorganiza a lista depois de um instante
  toggle(checkbox) {
    const item = checkbox.closest(".task");
    const id = item.dataset.id;
    item.classList.toggle("is-done", checkbox.checked);

    if (this.pendingToggles.has(id)) {
      // Clicou de novo antes de confirmar: volta ao estado original
      clearTimeout(this.pendingToggles.get(id));
      this.pendingToggles.delete(id);
      return;
    }

    this.pendingToggles.set(id, setTimeout(() => {
      this.pendingToggles.delete(id);
      StudyStore.toggleTask(id);
    }, Utils.prefersReducedMotion() ? 0 : this.TOGGLE_DELAY));
  },

  remove(id, item) {
    const commit = () => {
      const removed = StudyStore.removeTasks([id]);
      if (!removed.length) return;
      Toast.show(`Tarefa “${removed[0].task.title}” excluída.`, {
        actionLabel: "Desfazer",
        onAction: () => StudyStore.restoreTasks(removed),
      });
    };

    if (Utils.prefersReducedMotion()) return commit();
    item.classList.add("is-leaving");
    setTimeout(commit, this.EXIT_MS);
  },

  clearDone() {
    const ids = StudyStore.state.tasks.filter((task) => task.done).map((task) => task.id);
    if (!ids.length) return;
    const removed = StudyStore.removeTasks(ids);
    Toast.show(`${Utils.plural(removed.length, "tarefa concluída removida", "tarefas concluídas removidas")}.`, {
      actionLabel: "Desfazer",
      onAction: () => StudyStore.restoreTasks(removed),
    });
  },

  matchesQuery(task) {
    const query = Utils.normalize(this.query.trim());
    return !query || Utils.normalize(`${task.title} ${task.category}`).includes(query);
  },

  // Pendentes primeiro (mais recentes no topo), depois concluídas (concluídas por último no topo)
  sort(tasks) {
    return [...tasks].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return a.done ? (b.doneAt || 0) - (a.doneAt || 0) : b.createdAt - a.createdAt;
    });
  },

  render() {
    const tasks = StudyStore.state.tasks;

    // Busca e área definem o escopo; o status filtra dentro dele (e os contadores refletem o escopo)
    const scoped = tasks.filter((task) =>
      (this.category === "all" || task.category === this.category) && this.matchesQuery(task)
    );
    const counts = {
      all: scoped.length,
      pending: scoped.filter((task) => !task.done).length,
      done: scoped.filter((task) => task.done).length,
    };
    const visible = this.sort(scoped.filter((task) =>
      this.filter === "all" || (this.filter === "done" ? task.done : !task.done)
    ));

    const spentByTask = new Map();
    StudyStore.state.sessions.forEach((session) => {
      if (session.taskId) spentByTask.set(session.taskId, (spentByTask.get(session.taskId) || 0) + session.ms);
    });

    const focus = this.captureFocus();
    this.list.innerHTML = visible.map((task) => this.renderTask(task, spentByTask.get(task.id) || 0)).join("");
    this.restoreFocus(focus);
    this.newId = null;

    Utils.$$(".filter-btn", this.filtersEl).forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === this.filter));
      Utils.$("[data-filter-count]", button).textContent = counts[button.dataset.filter];
    });

    this.renderEmpty(tasks.length, visible.length);
    this.summaryEl.textContent = tasks.length
      ? `Mostrando ${visible.length} de ${Utils.plural(tasks.length, "tarefa", "tarefas")}`
      : "";
    this.clearBtn.disabled = !tasks.some((task) => task.done);
    this.updateProgress(tasks);
  },

  renderTask(task, spent) {
    const e = Utils.escapeHTML;
    const { timer } = StudyStore.state;
    const isLive = timer.running && timer.taskId === task.id;
    const classes = ["task", task.done && "is-done", task.id === this.newId && "is-new"].filter(Boolean).join(" ");

    return `
      <li class="${classes}" data-id="${e(task.id)}">
        <input class="task__check" type="checkbox" data-action="toggle" ${task.done ? "checked" : ""}
               aria-label="Concluir: ${e(task.title)}">
        <div class="task__body">
          <p class="task__title">${e(task.title)}</p>
          <div class="task__meta">
            <span class="tag">${e(task.category)}</span>
            ${task.estimate ? `<span title="Estimativa">~${Utils.formatNumber(task.estimate, 1)}h previstas</span>` : ""}
            ${spent ? `<span class="task__spent">${ICONS.clock}${Utils.formatDuration(spent)} de estudo</span>` : ""}
            ${isLive ? '<span class="task__live">Estudando agora</span>' : ""}
          </div>
        </div>
        <div class="task__actions">
          ${task.done ? "" : `
            <button class="icon-btn" type="button" data-action="study"
                    aria-label="Estudar agora: ${e(task.title)}" title="Estudar agora (inicia o cronômetro)">${ICONS.play}</button>`}
          <button class="icon-btn task__delete" type="button" data-action="delete"
                  aria-label="Excluir: ${e(task.title)}" title="Excluir tarefa">${ICONS.trash}</button>
        </div>
      </li>`;
  },

  renderEmpty(total, visibleCount) {
    let message = "";
    if (!total) message = "Nenhuma tarefa por aqui. Adicione a primeira acima!";
    else if (!visibleCount && this.query.trim()) message = `Nenhuma tarefa encontrada para “${this.query.trim()}”.`;
    else if (!visibleCount && this.filter === "pending") message = "Tudo em dia! Nenhuma tarefa pendente.";
    else if (!visibleCount && this.filter === "done") message = "Nenhuma tarefa concluída ainda.";
    else if (!visibleCount) message = "Nenhuma tarefa nesta área.";

    this.emptyEl.textContent = message; // textContent: a busca é texto digitado pelo usuário
    this.emptyEl.hidden = !message;
  },

  // A lista é redesenhada a cada mudança; devolve o foco ao mesmo controle (ou ao vizinho, se ele sumiu)
  captureFocus() {
    const active = document.activeElement;
    if (!this.list.contains(active)) return null;
    const item = active.closest(".task");
    return {
      id: item?.dataset.id,
      action: active.dataset.action,
      index: Utils.$$(".task", this.list).indexOf(item),
    };
  },

  restoreFocus(focus) {
    if (!focus) return;
    const items = Utils.$$(".task", this.list);
    const same = items.find((item) => item.dataset.id === focus.id);
    const target = same
      ? Utils.$(`[data-action="${focus.action}"]`, same)
      : items[Math.min(focus.index, items.length - 1)]?.querySelector('[data-action="toggle"]');
    (target || this.searchInput).focus({ preventScroll: true });
  },

  updateProgress(tasks) {
    if (!this.progressCard) return;
    const done = tasks.filter((task) => task.done).length;
    const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
    const pendingHours = tasks
      .filter((task) => !task.done)
      .reduce((sum, task) => sum + (task.estimate || 0), 0);

    const get = (name) => Utils.$(`[data-tp="${name}"]`, this.progressCard);
    get("text").textContent = tasks.length
      ? `${done} de ${Utils.plural(tasks.length, "tarefa concluída", "tarefas concluídas")}`
      : "Nenhuma tarefa cadastrada";
    get("done").textContent = done;
    get("pending").textContent = tasks.length - done;
    get("hours").textContent = `${Utils.formatNumber(pendingHours, 1)}h`;

    const bar = Utils.$(".progress", this.progressCard);
    bar.style.setProperty("--progress", `${percent}%`);
    bar.setAttribute("aria-valuenow", percent);

    const value = get("value");
    if (this.progressCard.classList.contains("is-visible") && percent !== this.percent) {
      Utils.animateNumber(value, percent, { from: this.percent ?? 0, duration: 700, suffix: "%" });
    } else if (!this.progressCard.classList.contains("is-visible")) {
      value.textContent = `${percent}%`;
    }
    this.percent = percent;
  },
};

/* ===================== AVISOS (toast) ===================== */
// Uma mensagem por vez, com ação opcional (ex.: "Desfazer")
const Toast = {
  DURATION: 5000,

  init() {
    this.region = Utils.$("#toast-region");
  },

  show(message, { actionLabel, onAction } = {}) {
    if (!this.region) return;
    clearTimeout(this.timer);
    this.region.replaceChildren();

    const toast = document.createElement("div");
    toast.className = "toast";
    const text = document.createElement("span");
    text.textContent = message;
    toast.append(text);

    if (actionLabel) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "toast__action";
      button.textContent = actionLabel;
      button.addEventListener("click", () => {
        onAction?.();
        this.hide();
      });
      toast.append(button);
    }

    this.region.append(toast);
    this.scheduleHide();

    // WCAG 2.2.1: pausa a contagem enquanto o mouse ou o foco do teclado estão no aviso
    toast.addEventListener("pointerenter", () => clearTimeout(this.timer));
    toast.addEventListener("pointerleave", () => this.scheduleHide());
    toast.addEventListener("focusin", () => clearTimeout(this.timer));
    toast.addEventListener("focusout", () => this.scheduleHide());
  },

  scheduleHide() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.hide(), this.DURATION);
  },

  hide() {
    const toast = this.region?.firstElementChild;
    if (!toast) return;
    clearTimeout(this.timer);
    toast.classList.add("is-leaving");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  },
};

/* ===================== REVELAÇÃO AO ROLAR ===================== */
// Adiciona .is-visible, anima os números [data-count] dentro do elemento e dispara o evento "reveal".
// threshold 0 + margem: revela quando o topo entra na tela. Uma porcentagem visível (ex.: 0.15)
// nunca seria atingida por elementos mais altos que a tela, como uma lista longa de tarefas.
const Reveal = {
  OPTIONS: { threshold: 0, rootMargin: "0px 0px -12% 0px" },

  init() {
    const targets = Utils.$$("[data-reveal]");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window) || Utils.prefersReducedMotion()) {
      targets.forEach((target) => this.show(target));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        this.show(entry.target);
        observer.unobserve(entry.target);
      });
    }, this.OPTIONS);

    targets.forEach((target) => observer.observe(target));
  },

  show(target) {
    target.classList.add("is-visible");
    this.animateCounters(target);
    target.dispatchEvent(new CustomEvent("reveal"));
  },

  // <span data-count="120" data-suffix="h" data-decimals="1" data-delay="200">
  animateCounters(target) {
    Utils.$$("[data-count]", target).forEach((el) => {
      Utils.animateNumber(el, Number(el.dataset.count), {
        delay: Number(el.dataset.delay) || 0,
        suffix: el.dataset.suffix || "",
        decimals: Number(el.dataset.decimals) || 0,
      });
    });
  },
};

/* ===================== FOOTER ===================== */
const Footer = {
  init() {
    const yearEl = Utils.$("#current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  },
};

/* ===================== INICIALIZAÇÃO ===================== */
const App = {
  // Reveal vem depois dos módulos que renderizam conteúdo, para observar os novos elementos
  modules: [Theme, Nav, Toast, StudyStore, Timeline, Techs, Projects, ProjectModal, Progress, StudyTimer, Tasks, Reveal, Footer],

  // Cada módulo é isolado: se um falhar, os demais (inclusive o Reveal, que exibe o conteúdo) seguem funcionando
  init() {
    this.modules.forEach((module) => {
      try {
        module.init();
      } catch (error) {
        console.error("[DevJourney] Falha ao iniciar módulo:", error);
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
