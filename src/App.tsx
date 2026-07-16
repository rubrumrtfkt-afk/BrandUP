import { useRef } from 'react'
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Camera,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clapperboard,
  Mail,
  MapPin,
  MessageCircle,
  Play,
  Search,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Utensils,
} from 'lucide-react'
import './App.css'

const services = [
  {
    icon: Search,
    title: 'Diagnostico local',
    text: 'Mapeamos concorrentes, ticket medio, horarios fortes e oportunidades de busca no Google.',
  },
  {
    icon: Clapperboard,
    title: 'Criativos que dao fome',
    text: 'Roteiros, ofertas e anuncios com apelo visual para delivery, reservas e visitas ao salao.',
  },
  {
    icon: Target,
    title: 'Midia paga',
    text: 'Campanhas para Meta, Google e remarketing focadas em reservas, pedidos e recompra.',
  },
  {
    icon: MessageCircle,
    title: 'Funil no WhatsApp',
    text: 'Captura, qualificacao e follow-up para transformar cliques em mesas ocupadas.',
  },
  {
    icon: BarChart3,
    title: 'Relatorios claros',
    text: 'Indicadores semanais de receita, custo por lead, reservas, pedidos e retorno por canal.',
  },
]

const testimonials = [
  {
    name: 'Marco L.',
    role: 'Pizzaria artesanal em Sydney',
    metric: '+41% em reservas no jantar',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Emily T.',
    role: 'Cafe brunch em Melbourne',
    metric: '2,8x retorno em midia paga',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Rafael S.',
    role: 'Restaurante latino em Brisbane',
    metric: '+63% em pedidos no delivery',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
  },
]

const faqs = [
  {
    question: 'A BrandUp atende apenas restaurantes na Australia?',
    answer:
      'O foco principal e Australia, com estrategias para restaurantes, cafes, pizzarias, bares e dark kitchens que precisam crescer com previsibilidade.',
  },
  {
    question: 'Preciso ter equipe de marketing interna?',
    answer:
      'Nao. A proposta e funcionar como um time externo dedicado, cobrindo estrategia, criativos, campanhas, otimizacao e leitura de dados.',
  },
  {
    question: 'Quanto tempo leva para ver resultados?',
    answer:
      'Os primeiros sinais costumam aparecer nas primeiras semanas, mas o plano e medido por ciclos mensais para melhorar oferta, publico e conversao.',
  },
  {
    question: 'Vocês fazem criativos e anuncios?',
    answer:
      'Sim. Criamos angulos de campanha, copys, direcao visual e estrutura de anuncios para Meta, Google e canais de conversao.',
  },
]

function App() {
  const servicesTrack = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })
  }

  const moveCarousel = (direction: 'left' | 'right') => {
    servicesTrack.current?.scrollBy({
      left: direction === 'left' ? -360 : 360,
      behavior: 'smooth',
    })
  }

  return (
    <main>
      <section className="hero" aria-label="BrandUp">
        <div className="nav">
          <a className="brand" href="#top" aria-label="BrandUp inicio">
            <span>Brand</span>Up
          </a>
          <button className="nav-cta" type="button" onClick={scrollToForm}>
            <span>Diagnostico</span>
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>

        <div className="hero-content">
          <p className="eyebrow">
            Marketing gastronomico para restaurantes na Australia
          </p>
          <h1>Mesas cheias, delivery girando e campanhas que pagam a conta.</h1>
          <p className="hero-copy">
            A BrandUp cria aquisicao local, anuncios e funis para restaurantes
            que querem transformar atencao em faturamento previsivel.
          </p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={scrollToForm}>
              Quero crescer meu restaurante
              <ArrowRight aria-hidden="true" size={19} />
            </button>
            <a className="secondary-action" href="#servicos">
              Ver estrategia
            </a>
          </div>
        </div>

        <div className="hero-stats" aria-label="Indicadores BrandUp">
          <div>
            <strong>90 dias</strong>
            <span>para validar ofertas e canais</span>
          </div>
          <div>
            <strong>3 frentes</strong>
            <span>trafego, criativo e conversao</span>
          </div>
          <div>
            <strong>AU</strong>
            <span>estrategia para mercado local</span>
          </div>
        </div>
      </section>

      <section className="notice-form" id="diagnostico">
        <div className="section-copy">
          <p className="eyebrow">Nao saia agora. Falta pouco.</p>
          <h2>Receba um diagnostico de crescimento para o seu restaurante.</h2>
          <p>
            Conte um pouco sobre o negocio. A equipe da BrandUp analisa o
            momento atual e indica as proximas alavancas de receita.
          </p>
        </div>

        <form className="lead-form">
          <label>
            Nome
            <input type="text" name="name" placeholder="Seu nome" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="voce@email.com" />
          </label>
          <label>
            Numero
            <input type="tel" name="phone" placeholder="+61 400 000 000" />
          </label>
          <label>
            Nome da empresa
            <input type="text" name="company" placeholder="Nome do restaurante" />
          </label>
          <label className="full">
            Faturamento mensal
            <select name="revenue" defaultValue="">
              <option value="" disabled>
                Selecione uma faixa
              </option>
              <option>Ate AUD 30k</option>
              <option>AUD 30k a AUD 80k</option>
              <option>AUD 80k a AUD 150k</option>
              <option>Acima de AUD 150k</option>
            </select>
          </label>
          <button className="primary-action full" type="submit">
            Solicitar analise
            <ArrowRight aria-hidden="true" size={19} />
          </button>
        </form>
      </section>

      <section className="testimonials" aria-labelledby="depoimentos-title">
        <div className="section-heading">
          <p className="eyebrow">Depoimentos</p>
          <h2 id="depoimentos-title">Resultados contados por quem vive o restaurante.</h2>
        </div>

        <div className="video-grid">
          {testimonials.map((item) => (
            <article className="video-card" key={item.name}>
              <img src={item.image} alt="" />
              <button type="button" aria-label={`Assistir depoimento de ${item.name}`}>
                <Play aria-hidden="true" fill="currentColor" size={26} />
              </button>
              <div>
                <strong>{item.metric}</strong>
                <span>{item.name} | {item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="quem-somos">
        <div className="about-image" aria-hidden="true" />
        <div className="section-copy">
          <p className="eyebrow">Quem somos</p>
          <h2>Lider em marketing gastronomico para marcas que precisam vender todos os dias.</h2>
          <p>
            Somos uma agencia especializada em restaurantes, cafes e operacoes
            de delivery. Unimos leitura de mercado, criativos de alta conversao
            e gestao de campanhas para criar demanda consistente.
          </p>
          <div className="proof-row">
            <span><Star aria-hidden="true" size={18} /> Oferta</span>
            <span><TrendingUp aria-hidden="true" size={18} /> Performance</span>
            <span><Utensils aria-hidden="true" size={18} /> Gastronomia</span>
          </div>
        </div>
      </section>

      <section className="services" id="servicos">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">O que fazemos?</p>
            <h2>Um sistema de crescimento para o restaurante aparecer, converter e reter.</h2>
          </div>
          <div className="carousel-controls" aria-label="Controles do carrossel">
            <button type="button" onClick={() => moveCarousel('left')} aria-label="Voltar">
              <ChevronLeft aria-hidden="true" size={22} />
            </button>
            <button type="button" onClick={() => moveCarousel('right')} aria-label="Avancar">
              <ChevronRight aria-hidden="true" size={22} />
            </button>
          </div>
        </div>

        <div className="service-track" ref={servicesTrack}>
          {services.map(({ icon: Icon, title, text }) => (
            <article className="service-card" key={title}>
              <Icon aria-hidden="true" size={28} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="team">
        <div className="section-copy">
          <p className="eyebrow">Receba um time exclusivo</p>
          <h2>Estrategia, criativos e performance trabalhando como uma extensao da sua operacao.</h2>
          <p>
            Voce fala com um time que entende cardapio, margem, horario de pico,
            reservas e recorrencia. Menos campanha solta, mais rotina comercial.
          </p>
        </div>

        <div className="team-panel">
          <div><Users aria-hidden="true" size={24} /><span>Estrategista gastronomico</span></div>
          <div><Sparkles aria-hidden="true" size={24} /><span>Direcao criativa</span></div>
          <div><CircleDollarSign aria-hidden="true" size={24} /><span>Gestor de trafego</span></div>
          <div><BarChart3 aria-hidden="true" size={24} /><span>Analista de dados</span></div>
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <div className="section-heading">
          <p className="eyebrow">Perguntas frequentes</p>
          <h2 id="faq-title">O que restaurantes costumam perguntar antes de comecar.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer>
        <div>
          <a className="brand" href="#top" aria-label="BrandUp inicio">
            <span>Brand</span>Up
          </a>
          <p>Agencia de marketing focada em restaurantes na Australia.</p>
          <p className="legal">CNPJ: 00.000.000/0001-00</p>
        </div>
        <div className="socials" aria-label="Redes sociais">
          <a href="https://instagram.com" aria-label="Instagram">
            <Camera aria-hidden="true" size={21} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <BriefcaseBusiness aria-hidden="true" size={21} />
          </a>
          <a href="mailto:hello@brandup.com.au" aria-label="Email">
            <Mail aria-hidden="true" size={21} />
          </a>
          <a href="https://maps.google.com" aria-label="Localizacao">
            <MapPin aria-hidden="true" size={21} />
          </a>
        </div>
      </footer>
    </main>
  )
}

export default App
