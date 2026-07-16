import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  MessageCircle,
  Search,
  Star,
  Target,
  TrendingUp,
  Utensils,
  Volume2,
  VolumeX,
} from 'lucide-react'
import './App.css'

type YouTubePlayer = {
  destroy: () => void
  getPlayerState: () => number
  mute: () => void
  pauseVideo: () => void
  playVideo: () => void
  setVolume: (volume: number) => void
  unMute: () => void
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        options: {
          videoId: string
          playerVars: Record<string, number | string>
          events?: {
            onReady?: (event: { target: YouTubePlayer }) => void
            onStateChange?: (event: { data: number }) => void
          }
        },
      ) => YouTubePlayer
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

let youTubeApiPromise: Promise<void> | null = null

const loadYouTubeApi = () => {
  if (window.YT?.Player) {
    return Promise.resolve()
  }

  if (!youTubeApiPromise) {
    youTubeApiPromise = new Promise((resolve) => {
      const previousReady = window.onYouTubeIframeAPIReady

      window.onYouTubeIframeAPIReady = () => {
        previousReady?.()
        resolve()
      }

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement('script')
        script.src = 'https://www.youtube.com/iframe_api'
        script.async = true
        document.body.appendChild(script)
      }
    })
  }

  return youTubeApiPromise
}

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
    youtubeId: 'YT6Gys9mkBo',
  },
  {
    name: 'Emily T.',
    role: 'Cafe brunch em Melbourne',
    metric: '2,8x retorno em midia paga',
    youtubeId: 'w01Ep_iYMkk',
  },
  {
    name: 'Rafael S.',
    role: 'Restaurante latino em Brisbane',
    metric: '+63% em pedidos no delivery',
    youtubeId: 'nTw6c8Yz97Y',
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
  const serviceCarouselIndex = useRef(0)
  const shortsPlayers = useRef<Array<YouTubePlayer | null>>([])
  const shortsRefs = useRef<Array<HTMLDivElement | null>>([])
  const [mutedShorts, setMutedShorts] = useState(() => testimonials.map(() => true))
  const [playingShorts, setPlayingShorts] = useState(() => testimonials.map(() => false))

  const getServiceSlideDistance = () => {
    const track = servicesTrack.current

    if (!track) {
      return 0
    }

    const card = track.querySelector<HTMLElement>('.service-card')
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0')

    return (card?.offsetWidth ?? track.clientWidth) + gap
  }

  const scrollServiceCarouselTo = (
    index: number,
    behavior: ScrollBehavior = 'smooth',
  ) => {
    const track = servicesTrack.current
    const distance = getServiceSlideDistance()

    if (!track || !distance) {
      return
    }

    const nextIndex = (index + services.length) % services.length
    serviceCarouselIndex.current = nextIndex

    track.scrollTo({
      left: nextIndex * distance,
      behavior,
    })
  }

  const advanceServiceCarousel = (direction: 'left' | 'right' = 'right') => {
    const nextIndex =
      serviceCarouselIndex.current + (direction === 'left' ? -1 : 1)
    const isForwardLoop = nextIndex >= services.length
    const isBackwardLoop = nextIndex < 0

    scrollServiceCarouselTo(
      isForwardLoop ? 0 : isBackwardLoop ? services.length - 1 : nextIndex,
      isForwardLoop || isBackwardLoop ? 'auto' : 'smooth',
    )
  }

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal-on-scroll'),
    )

    if (!revealElements.length) {
      return undefined
    }

    let animationFrame = 0
    const clamp = (value: number) => Math.min(Math.max(value, 0), 1)

    const updateReveal = () => {
      animationFrame = 0
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const start = viewportHeight * 1.06
      const end = viewportHeight * 0.7

      revealElements.forEach((element, index) => {
        const { top } = element.getBoundingClientRect()
        const isLastReveal = index === revealElements.length - 1
        const itemStart = isLastReveal ? viewportHeight * 1.2 : start
        const itemEnd = isLastReveal ? viewportHeight * 0.84 : end
        const progress = clamp((itemStart - top) / (itemStart - itemEnd))
        const eased = progress * progress * (3 - 2 * progress)
        const translateY = (1 - eased) * 64
        const blur = (1 - eased) * 20

        element.style.setProperty('--reveal-opacity', eased.toFixed(3))
        element.style.setProperty('--reveal-y', `${translateY.toFixed(2)}px`)
        element.style.setProperty('--reveal-blur', `${blur.toFixed(2)}px`)
      })
    }

    const requestRevealUpdate = () => {
      if (animationFrame) {
        return
      }
      animationFrame = window.requestAnimationFrame(updateReveal)
    }

    updateReveal()
    window.addEventListener('scroll', requestRevealUpdate, { passive: true })
    window.addEventListener('resize', requestRevealUpdate)

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
      window.removeEventListener('scroll', requestRevealUpdate)
      window.removeEventListener('resize', requestRevealUpdate)
    }
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      advanceServiceCarousel('right')
    }, 3800)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    let disposed = false

    loadYouTubeApi().then(() => {
      const youtube = window.YT

      if (disposed || !youtube?.Player) {
        return
      }

      testimonials.forEach((item, index) => {
        const container = shortsRefs.current[index]

        if (!container || shortsPlayers.current[index]) {
          return
        }

        shortsPlayers.current[index] = new youtube.Player(container, {
          videoId: item.youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            modestbranding: 1,
            playsinline: 1,
            playlist: item.youtubeId,
            rel: 0,
          },
          events: {
            onReady: ({ target }) => {
              target.mute()
              target.setVolume(74)
            },
            onStateChange: ({ data }) => {
              setPlayingShorts((current) =>
                current.map((value, playerIndex) =>
                  playerIndex === index ? data === 1 : value,
                ),
              )
            },
          },
        })
      })
    })

    return () => {
      disposed = true
      shortsPlayers.current.forEach((player) => player?.destroy())
      shortsPlayers.current = []
    }
  }, [])

  const scrollToForm = () => {
    document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })
  }

  const moveCarousel = (direction: 'left' | 'right') => {
    advanceServiceCarousel(direction)
  }

  const toggleShortPlayback = (index: number) => {
    const player = shortsPlayers.current[index]

    if (!player) {
      return
    }

    if (player.getPlayerState() === 1) {
      player.pauseVideo()
      setPlayingShorts((current) =>
        current.map((value, playerIndex) => (playerIndex === index ? false : value)),
      )
      return
    }

    shortsPlayers.current.forEach((otherPlayer, playerIndex) => {
      if (playerIndex !== index) {
        otherPlayer?.pauseVideo()
      }
    })
    player.playVideo()
    setPlayingShorts((current) =>
      current.map((_, playerIndex) => playerIndex === index),
    )
  }

  const toggleShortVolume = (
    event: MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.stopPropagation()

    const player = shortsPlayers.current[index]
    const shouldMute = !mutedShorts[index]

    if (player) {
      if (shouldMute) {
        player.mute()
      } else {
        player.unMute()
        player.setVolume(74)
      }
    }

    setMutedShorts((current) =>
      current.map((isMuted, playerIndex) =>
        playerIndex === index ? shouldMute : isMuted,
      ),
    )
  }

  return (
    <main>
      <section className="hero" aria-label="BrandUp">
        <div className="section-inner hero-inner">
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
        </div>
      </section>

      <section className="notice-form" id="diagnostico">
        <div className="section-inner notice-inner">
          <div className="notice-left">
            <p className="eyebrow">Aviso</p>
            <h2 className="reveal-on-scroll">
              <strong>Nao saia agora!</strong> Faltam poucos segundos para seu
              restaurante <strong>vender mais.</strong>
            </h2>

            <div className="notice-steps" aria-label="Como funciona o contato">
              <article className="notice-card reveal-on-scroll">
                <span className="notice-number">1</span>
                <div>
                  <h3>Complete o formulario</h3>
                  <p>
                    <strong>Forneca suas informacoes</strong> no formulario ao
                    lado. Garantimos a seguranca total de seus dados. Serao usados
                    apenas para contato.
                  </p>
                </div>
              </article>

              <article className="notice-card reveal-on-scroll">
                <span className="notice-number">2</span>
                <div>
                  <h3>Receba uma ligacao personalizada</h3>
                  <p>
                    Em um prazo de <strong>ate 5 minutos</strong> em horario
                    comercial, um dos nossos especialistas{' '}
                    <strong>entrara em contato diretamente</strong> para agendar a
                    reuniao mais importante com voce.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <form className="lead-form" aria-label="Formulario de diagnostico">
            <label className="field-compact">
              <span className="sr-only">Nome</span>
              <input type="text" name="name" placeholder="Seu nome" />
            </label>
            <label className="field-compact">
              <span className="sr-only">Email</span>
              <input type="email" name="email" placeholder="Seu melhor e-mail" />
            </label>
            <label className="field-compact">
              <span className="sr-only">Numero</span>
              <span className="phone-field">
                <span aria-hidden="true">+61</span>
                <input type="tel" name="phone" placeholder="WhatsApp com DDD" />
              </span>
            </label>
            <label className="field-compact">
              <span className="sr-only">Nome da empresa</span>
              <input type="text" name="company" placeholder="Nome da empresa" />
            </label>
            <label className="full">
              Qual o seu faturamento mensal?
              <select name="revenue" defaultValue="">
                <option value="" disabled>
                  Selecione o faturamento
                </option>
                <option>Ate AUD 30k</option>
                <option>AUD 30k a AUD 80k</option>
                <option>AUD 80k a AUD 150k</option>
                <option>Acima de AUD 150k</option>
              </select>
            </label>
            <button className="primary-action full" type="submit">
              Receber mais informacoes
            </button>
        </form>
        </div>
      </section>

      <section className="testimonials" aria-labelledby="depoimentos-title">
        <div className="section-inner">
          <div className="section-heading reveal-on-scroll">
            <p className="eyebrow">Depoimentos</p>
            <h2 id="depoimentos-title">Resultados contados por quem vive o restaurante.</h2>
          </div>

          <div className="video-grid">
            {testimonials.map((item, index) => (
              <article
                className={`video-card short-card${playingShorts[index] ? ' is-playing' : ''}`}
                key={item.name}
                onClick={() => toggleShortPlayback(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    toggleShortPlayback(index)
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div
                  className="short-player"
                  ref={(node) => {
                    shortsRefs.current[index] = node
                  }}
                />
                <button
                  className="short-volume"
                  type="button"
                  aria-label={mutedShorts[index] ? 'Ativar som' : 'Desativar som'}
                  onClick={(event) => toggleShortVolume(event, index)}
                >
                  {mutedShorts[index] ? (
                    <VolumeX aria-hidden="true" size={24} />
                  ) : (
                    <Volume2 aria-hidden="true" size={24} />
                  )}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about" id="quem-somos">
        <div className="section-inner about-inner">
          <div className="about-image reveal-on-scroll" aria-hidden="true" />
          <div className="section-copy reveal-on-scroll">
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
        </div>
      </section>

      <section className="services" id="servicos">
        <div className="section-inner">
          <div className="section-heading services-heading reveal-on-scroll">
            <p className="eyebrow">O que fazemos?</p>
            <h2>Um sistema de crescimento para o restaurante aparecer, converter e reter.</h2>
          </div>

          <div className="service-carousel" aria-label="Servicos BrandUp">
            <button className="carousel-nav carousel-nav-left" type="button" onClick={() => moveCarousel('left')} aria-label="Servico anterior">
              <ChevronLeft aria-hidden="true" size={24} />
            </button>
            <div className="service-track" ref={servicesTrack}>
              {services.map(({ icon: Icon, title, text }) => (
                <article className="service-card" key={title}>
                  <Icon aria-hidden="true" size={28} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <button className="carousel-nav carousel-nav-right" type="button" onClick={() => moveCarousel('right')} aria-label="Proximo servico">
              <ChevronRight aria-hidden="true" size={24} />
            </button>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="section-inner team-inner">
          <div className="section-copy team-copy">
            <p className="eyebrow reveal-on-scroll">Receba um time exclusivo</p>
            <h2 className="reveal-on-scroll">Estrategia, criativos e performance trabalhando como uma extensao da sua operacao.</h2>
            <p className="reveal-on-scroll">
              Voce fala com um time que entende cardapio, margem, horario de pico,
              reservas e recorrencia. Menos campanha solta, mais rotina comercial.
            </p>
            <button className="primary-action team-cta reveal-on-scroll" type="button" onClick={scrollToForm}>
              Receber mais informacoes
            </button>
          </div>
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <div className="section-inner">
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
        </div>
      </section>

      <footer>
        <div className="section-inner footer-inner">
          <div>
            <a className="brand" href="#top" aria-label="BrandUp inicio">
              <span>Brand</span>Up
            </a>
            <p>Agencia de marketing focada em restaurantes na Australia.</p>
            <p className="legal">CNPJ: 00.000.000/0001-00</p>
          </div>
          <div className="socials" aria-label="Redes sociais">
            <a href="https://www.instagram.com/brandup.aus/" aria-label="Instagram BrandUp" target="_blank" rel="noreferrer">
              <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="" aria-hidden="true" />
            </a>
            <a href="https://wa.me/?text=Quero%20receber%20mais%20informacoes%20sobre%20a%20BrandUp" aria-label="WhatsApp BrandUp" target="_blank" rel="noreferrer">
              <img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
