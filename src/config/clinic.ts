/**
 * Configuração central da Clínica Odontovil.
 *
 * Todas as informações exibidas no site saem deste arquivo.
 * Regra: só publique aqui dados confirmados pelo proprietário.
 * Campos vazios ('' / null / []) simplesmente não aparecem no site.
 */

export type Weekday =
  | 'segunda'
  | 'terca'
  | 'quarta'
  | 'quinta'
  | 'sexta'
  | 'sabado'
  | 'domingo'

/** Períodos de atendimento do dia (ex.: manhã e tarde). Lista vazia = fechado. */
export type DayHours = { opens: string; closes: string }[]

export type Photo = {
  /** Caminho base sem extensão; o site usa `${src}-${largura}.webp` e `${src}.jpg` como fallback. */
  src: string
  widths: number[]
  width: number
  height: number
  alt: string
  /** false = guardada na configuração, mas fora do site. */
  enabled: boolean
  note?: string
}

export type Testimonial = { text: string; source: string }

const MORNING = { opens: '08:00', closes: '12:00' }
const AFTERNOON = { opens: '14:00', closes: '18:30' }

const WHATSAPP_NUMBER = '5569981169008'

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const clinic = {
  name: 'Clínica Odontovil',
  shortName: 'Odontovil',
  category: 'Clínica odontológica',
  tagline: 'Clínica odontológica em Vilhena — RO.',

  /** Domínio oficial (ex.: 'https://www.odontovil.com.br'). Preencha quando o site for publicado. */
  siteUrl: '',

  address: {
    street: 'Av. Paraná, 1691',
    neighborhood: 'Alto Alegre',
    city: 'Vilhena',
    state: 'RO',
    postalCode: '76985-295',
    full: 'Av. Paraná, 1691 - Alto Alegre, Vilhena - RO, 76985-295',
  },

  phone: {
    display: '(69) 3321-1271',
    href: 'tel:+556933211271',
  },

  whatsapp: {
    number: WHATSAPP_NUMBER,
    display: '(69) 98116-9008',
    /** Link oficial informado, usado sem alterações nos botões de agendamento. */
    defaultUrl:
      'https://wa.me/5569981169008?text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20consulta!',
    messages: {
      hero: 'Olá! Gostaria de informações para agendar uma consulta na Clínica Odontovil.',
      atendimento:
        'Olá! Acessei o site da Clínica Odontovil e gostaria de obter informações sobre agendamento de consulta.',
      hours: 'Olá! Gostaria de confirmar os horários de atendimento da Clínica Odontovil.',
      general: 'Olá! Gostaria de falar com a equipe da Clínica Odontovil.',
    },
  },

  instagram: {
    handle: '@odontovil',
    url: 'https://instagram.com/odontovil?igshid=1sxuo262rfiqq',
  },

  maps: {
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+Odontovil%2C+Av.+Paran%C3%A1%2C+1691%2C+Vilhena%2C+RO',
    /** Mapa incorporado por busca de endereço (sem coordenadas inventadas e sem chave de API). */
    embedUrl:
      'https://www.google.com/maps?q=Cl%C3%ADnica+Odontovil%2C+Av.+Paran%C3%A1%2C+1691%2C+Alto+Alegre%2C+Vilhena+-+RO&output=embed',
  },

  reviews: {
    rating: '5,0',
    count: 359,
    source: 'Avaliações públicas no Google',
    /**
     * Link oficial da página de avaliações no Google. Enquanto estiver vazio,
     * o botão "Ver avaliações no Google" abre a busca da clínica no Google Maps.
     */
    url: '',
    /** Percepções relatadas pelos pacientes nas avaliações (não são promessas clínicas). */
    highlights: [
      'Atendimento atencioso',
      'Profissionais cuidadosos',
      'Explicações claras e com paciência',
      'Ambiente agradável',
    ],
    testimonials: [
      { text: 'Desde a recepção até o consultório, tudo é feito com muito cuidado e dedicação.', source: 'Paciente, via Google' },
      { text: 'Lugar super agradável, com profissionais atenciosos e ótimo atendimento!', source: 'Paciente, via Google' },
      { text: 'Ótima Drª, bem cuidadosa e atenciosa. Minha família já virou cliente.', source: 'Paciente, via Google' },
      { text: 'Gostei bastante do atendimento. São muito atenciosos e profissionais.', source: 'Paciente, via Google' },
      {
        text: 'Excelente atendimento! O Dr. Marcelo é muito atencioso, explicou tudo certinho com calma e paciência e, na hora do tratamento, foi muito cuidadoso. Ótimo para quem tem medo de dentista…',
        source: 'Paciente, via Google',
      },
      {
        text: 'O atendimento foi muito bom, super indico pras pessoas que eu conheço. Não tenho o que reclamar.',
        source: 'Paciente, via Google',
      },
    ] satisfies Testimonial[],
  },

  hours: {
    /** Fuso de Vilhena (RO), usado para calcular "aberta agora". */
    timeZone: 'America/Porto_Velho',
    /** Horários oficiais. Feriados e exceções não são considerados. */
    week: {
      segunda: [MORNING, AFTERNOON],
      terca: [MORNING, AFTERNOON],
      quarta: [MORNING, AFTERNOON],
      quinta: [MORNING, AFTERNOON],
      sexta: [MORNING, AFTERNOON],
      sabado: [MORNING],
      domingo: [],
    } as Record<Weekday, DayHours>,
  },

  /** Responsável técnico, informado pela clínica. */
  dentist: {
    name: 'Dr. Marcelo Lazzeris',
    cro: 'CRO/RO 2315',
  },

  about: {
    intro:
      'A Clínica Odontovil é uma clínica odontológica localizada em Vilhena, Rondônia. Seu espaço e sua presença local oferecem aos pacientes um ponto de contato para conhecer a clínica e buscar informações sobre consultas.',
    /* Campos para o proprietário preencher. Ficam ocultos enquanto vazios. */
    history: '',
    foundedYear: '',
    team: [] as { name: string; role: string; registry?: string; bio?: string }[],
    education: '',
    structure: [] as string[],
  },

  /** Serviços/especialidades confirmados pelo proprietário. Vazio = seção mostra apenas atalhos de contato. */
  services: [] as { title: string; description: string }[],

  photos: {
    heroFacade: {
      src: '/images/fachada-entardecer',
      widths: [640, 1075, 1440, 1920],
      width: 1920,
      height: 1743,
      alt: 'Fachada da Clínica Odontovil ao entardecer, com o letreiro iluminado e vitrines de vidro na Av. Paraná, em Vilhena',
      enabled: true,
    },
    facadeDay: {
      src: '/images/fachada-dia',
      widths: [600, 1086],
      width: 1086,
      height: 1448,
      alt: 'Fachada da Clínica Odontovil durante o dia, com letreiro branco sobre parede cinza e portas de vidro',
      enabled: true,
    },
    reception: {
      src: '/images/recepcao',
      widths: [800, 1448],
      width: 1448,
      height: 1086,
      alt: 'Recepção da Clínica Odontovil, com balcão curvo iluminado, orquídeas brancas e espelho com luz indireta',
      enabled: true,
    },
  } satisfies Record<string, Photo>,

  /**
   * Fotos recebidas, mas mantidas fora do site:
   * - Criança identificável na cadeira odontológica (exige autorização dos responsáveis).
   * - Procedimento em andamento com texto sobreposto de story do Instagram.
   * Adicione novas fotos do ambiente em `gallery` abaixo.
   */
  excludedPhotos: [
    'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Rsa5y_T78HzZYlgAhf7_ow1WUHfeG9f-nFfu8foiMKiBPR2knYXnHV716Dgl98hwQ5r1lhvQ6E0h8D3wzVy2imIndIRy_PvwE2cFyu4UouApERMGlYZdYP9LLSlnG1snfs-ir9eSx1big=w224-h401-k-no',
    'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RR0qsZaQpJh_w37quXUs7wc--t6xrV-yfFxSnKQw-H4aW61WUPz35_LMbqP2l8GCGKq06gKKVq1FcN4gscY1XGnmZYZFLs6HaW2v63JwtxnyN20QxGMWOs6hTlTxnjnS_vhYLpe0gso4il=w224-h395-k-no',
  ],
}

/**
 * Fotos de atendimentos exibidas na seção "A clínica".
 * Atenção: mostram pacientes (incluindo crianças) identificáveis. Publique apenas
 * com autorização de uso de imagem dos pacientes ou responsáveis (LGPD).
 */
export const carePhotos: Photo[] = [
  {
    src: '/images/atendimento-1',
    widths: [524],
    width: 524,
    height: 682,
    alt: 'Menina sorrindo, sentada na cadeira do consultório da clínica',
    enabled: true,
  },
  {
    src: '/images/atendimento-3',
    widths: [528],
    width: 528,
    height: 618,
    alt: 'Profissional da clínica atendendo uma criança na cadeira odontológica',
    enabled: true,
  },
  {
    src: '/images/atendimento-2',
    widths: [456],
    width: 456,
    height: 334,
    alt: 'Menina segurando um diploma ao lado de uma profissional da clínica',
    enabled: true,
  },
  {
    src: '/images/atendimento-4',
    widths: [482],
    width: 482,
    height: 606,
    alt: 'Duas profissionais da clínica realizando um atendimento',
    enabled: true,
  },
  {
    src: '/images/atendimento-5',
    widths: [492],
    width: 492,
    height: 618,
    alt: 'Profissional da clínica abraçando uma paciente',
    enabled: true,
  },
].filter((photo) => photo.enabled)

/**
 * Casos de antes e depois da seção "Nossos trabalhos".
 * Atenção (Código de Ética Odontológica / Resolução CFO-196/2019): a divulgação de
 * antes e depois exige autorização do paciente e a identificação do profissional
 * responsável (nome e CRO). Preencha `results.responsible` e confirme as autorizações
 * antes de publicar. Não adicione nomes de procedimentos sem confirmação.
 */
export const results = {
  /** Exibido abaixo dos casos de antes e depois. Vazio = não exibido. */
  responsible: 'Responsável técnico: Dr. Marcelo Lazzeris — CRO/RO 2315',
  note: 'Cada tratamento é planejado de forma individual, e os resultados variam de acordo com cada caso.',
  cases: Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    before: `/images/caso-${i + 1}-antes`,
    after: `/images/caso-${i + 1}-depois`,
    width: 720,
    height: 480,
    enabled: true,
  })).filter((item) => item.enabled),
}


export const navLinks = [
  { id: 'inicio', label: 'Início' },
  { id: 'clinica', label: 'A clínica' },
  { id: 'atendimento', label: 'Atendimento' },
  { id: 'avaliacoes', label: 'Avaliações' },
  { id: 'localizacao', label: 'Localização' },
  { id: 'contato', label: 'Contato' },
] as const

export const weekdayLabels: Record<Weekday, string> = {
  segunda: 'Segunda-feira',
  terca: 'Terça-feira',
  quarta: 'Quarta-feira',
  quinta: 'Quinta-feira',
  sexta: 'Sexta-feira',
  sabado: 'Sábado',
  domingo: 'Domingo',
}

export const reviewsUrl = clinic.reviews.url || clinic.maps.directionsUrl
