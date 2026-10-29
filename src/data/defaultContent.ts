// src/data/defaultContent.ts
import type { SiteContentSchema } from '../types/content.ts'

export const DEFAULT_SITE_CONTENT: SiteContentSchema = {
  home: {
    institucional: {
      titulo: 'Bem-vindo ao CEPROCAMP',
      paragrafo1:
        'O Centro Profissional de Campinas (CEPROCAMP), mantido pela Fundação Municipal para Educação Comunitária (Fumec), é uma instituição pública referência na oferta de cursos técnicos e de qualificação profissional 100% gratuito.',
      paragrafo2:
        'Instalado em ambientes que unem a tradição histórica de Campinas à modernidade educacional, tendo como propósito transformar vidas. Oferecemos à comunidade uma infraestrutura completa para o aprendizado prático, preparando jovens e adultos diretamente para as demandas reais do mercado de trabalho regional.',
      imagem1: './dentro_ceprocamp.webp',
      imagem2: './calcada_ceprocamp.webp',
      botaoTexto: 'Conheça nossa história',
    },
    cursosIntro: {
      titulo: 'Cursos Técnicos e de Qualificação Profissional',
      subtitulo:
        'A partir do 4º ano de funcionamento, o CEPROCAMP atende cerca de 6.160 novos alunos a cada ano.',
      botaoTexto: 'Para saber mais, acesse a aba informações',
    },
    pepi: {
      tag: 'Setor de Empregabilidade',
      titulo: 'PEPI — Projeto Emprego Profissional Inclusivo',
      descricao:
        'O PEPI conecta os alunos às principais oportunidades de Campinas e região. Através de parcerias estratégicas com empresas locais, promovemos a divulgação semanal de vagas de emprego, estágios e concursos nos murais físicos e salas virtuais.',
      card1Titulo: 'Orientação de Carreira',
      card1Desc:
        'Auxílio com dicas para entrevistas e melhoria de currículo mediante agendamento prévio.',
      card2Titulo: 'Consultoria de Negócios',
      card2Desc:
        'Suporte especializado focado na abertura do próprio negócio para alunos que desejam empreender.',
      chamadaEmpresas:
        'Você é empresário ou representante de empresa? Se precisa divulgar vagas de emprego ou estágio e recrutar nossos talentos, entre em contato diretamente com o nosso setor responsável:',
      videoPoster: '/capa_PEPI_ceprocamp.webp',
      videoUrl: '/VideoPepi_ceprocamp.webm',
      whatsappLink: 'https://wa.me/5519999605872',
      emailContato: 'pepi.ceprocamp@educa.fumec.sp.gov.br',
    },
  },
  informacoes: {
    matriz: {
      titulo: 'Matriz Curricular',
      descricao:
        'Consulte e faça o download do plano de ensino e das disciplinas abordadas nas respectivas turmas em andamento:',
    },
    institucional: {
      titulo: 'Missão, Visão e Valores',
      introducao:
        'O CEPROCAMP/FUMEC que tem como propósito qualificar a pessoa para além das habilidades e competências demandadas pelo mercado busca, assim, prepará-la para enfrentar o mundo em permanente e acelerada mudança, em busca de autonomia redefiniu sua Missão, Visão e Valores que são mantidos para o quadriênio (2018-2021) que se segue, solidariedade e qualidade de vida numa sociedade moderna.',
      missao:
        'Promover cursos de educação profissional, formação cidadã e capacitação para o mundo do trabalho para a população da Região Metropolitana de Campinas, tendo como prioridade apoiar a realização do projeto de vida das pessoas, promover a inclusão e reinserção social e desenvolver oportunidade de profissionalização.',
      visao:
        'Ser referência de instituição pública de ensino de educação profissional, voltada para a inclusão e a promoção social com qualidade, bem como para desenvolvimento humano e no fortalecimento das políticas públicas para a educação profissional.',
      valores: [
        'Ética',
        'Transparência',
        'Comprometimento',
        'Valorização e Respeito às pessoas',
        'Construção do Conhecimento',
        'Educação Inclusiva',
        'Melhoria Contínua',
        'Inovação',
        'Gestão Sustentável',
        'Bom Uso do Dinheiro Público',
      ],
      conclusao:
        'Os cursos são abertos a toda população da Região Metropolitana de Campinas.',
    },
    salaRecursos: {
      titulo: 'Sala de Recursos (Educação Inclusiva)',
      introducao:
        'Trata-se de um espaço que oferece atividades complementares e/ou suplementares à sala de aula com o ensino de recursos de tecnologia assistiva para alunos matriculados na FUMEC, nos cursos do CEPROCAMP e EJA. Não se trata de um espaço substitutivo e não possui como função o reforço escolar.',
      objetivo:
        'Este espaço é voltado para promover a inclusão e buscar garantir o pleno desenvolvimento acadêmico e social dos alunos da EJA e CEPROCAMP (FUMEC).',
      trabalhoCooperativo:
        'Trabalho cooperativo: ocorre entre os professores, orientadores e o aluno para discutir e implementar estratégias inclusivas eficientes.',
      servicos: [
        'Atendimento individualizado ou em pequenos grupos',
        'Ampliações de materiais pedagógicos',
        'Materiais adaptados em Braille',
        'Ensino de Língua Portuguesa como segunda língua (L2) para alunos surdos',
        'Tecnologias assistivas com foco no uso de acessibilidade em dispositivos eletrônicos',
        'Desenvolvimento de habilidades acadêmicas e profissionais, totalmente alinhado ao curso do estudante',
      ],
    },
    somosNos: {
      titulo: 'Ceprocamp Somos Nós',
      subtitulo: 'CEPROCAMP Somos nós: História, Memória e Cotidiano',
      descricao:
        'É um portal vivo de memórias, um espaço online destinado a registrar as histórias, experiências e produções de estudantes, docentes e funcionários. Cada participante poderá contribuir com seu depoimento em vídeo, áudio, texto ou slides. O portal também disponibilizará parte do nosso acervo fotográfico, com mais de 6000 imagens catalogadas. Além disso, reunirá produções acadêmicas, intelectuais e artísticas da comunidade escolar.',
      linkPortal: 'https://projeto.art.br/oceprocampsomosnos/',
      responsaveis: 'Andréa Sampaio e Ellen Pompei',
      linkFormulario:
        'https://docs.google.com/forms/d/e/1FAIpQLSea4i4wQ4ib7GetTQp6E1vkDIIwp0JxMolj08JgVTvzmhl2Cw/viewform?usp=header',
      slogan: 'Afinal, o CEPROCAMP somos nós!',
    },
    sae: {
      titulo: 'SAE - Serviço de Atendimento ao Estudante',
      subtitulo: 'SAE - Serviço de Acolhimento Escolar',
      descricao:
        'O setor oferece acolhimento, escuta, orientações e encaminhamentos quando necessários, além de atuar com sigilo nos atendimentos.',
      publicoAlvo: 'É destinado a alunos e funcionários do CEPROCAMP.',
      horario: 'Segunda a sexta-feira das 08h às 21h30.',
      orientacaoAtendimento:
        'Para atendimento, entrar em contato através do e-mail ou ir diretamente na sala.',
      email: 'sae.ceprocamp@educa.fumec.sp.gov.br',
    },
  },
}
