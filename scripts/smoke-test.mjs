/**
 * Teste de fumaça do site da Clínica Odontovil (Playwright).
 * Uso: npm run build && npx vite preview --port 4173 (em outro terminal) e depois `npm run test:smoke`.
 * Variáveis: BASE_URL (padrão http://localhost:4173), SHOTS_DIR (pasta para capturas de tela, opcional).
 */
import { chromium } from 'playwright'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4173'
const SHOTS_DIR = process.env.SHOTS_DIR

const WA_DEFAULT = 'https://wa.me/5569981169008?text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20consulta!'
const TEL = 'tel:+556933211271'
const INSTAGRAM = 'https://instagram.com/odontovil?igshid=1sxuo262rfiqq'
const MAPS =
  'https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+Odontovil%2C+Av.+Paran%C3%A1%2C+1691%2C+Vilhena%2C+RO'

const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`)
}
const shot = async (page, name, fullPage = false) => {
  if (SHOTS_DIR) await page.screenshot({ path: `${SHOTS_DIR}/${name}.png`, fullPage })
}

const browser = await chromium.launch({ headless: true })

/* ---------- Desktop ---------- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !/google|gstatic|maps/i.test(msg.location().url ?? '')) errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(err.message))

  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)

  const hero = await page.$eval('.hero__img', (img) => ({
    src: img.currentSrc,
    loaded: img.complete && img.naturalWidth > 0,
    alt: img.alt,
  }))
  check('Capa usa a foto da fachada fornecida', hero.loaded && hero.src.includes('fachada-entardecer'), hero.src)
  check('Foto da capa tem texto alternativo', hero.alt.length > 20)

  const h1 = await page.textContent('h1')
  check('Título principal correto', h1?.trim() === 'Seu sorriso merece cuidado e atenção.')
  check('Apenas um h1', (await page.$$('h1')).length === 1)

  const navTargets = await page.$$eval('.nav__links a', (links) =>
    links.map((a) => ({ href: a.getAttribute('href'), exists: !!document.querySelector(a.getAttribute('href')) })),
  )
  check('Links do menu apontam para seções existentes', navTargets.every((t) => t.exists), navTargets.map((t) => t.href).join(' '))

  const anchors = await page.$$eval('a[href^="#"]', (links) =>
    links.map((a) => a.getAttribute('href')).filter((h) => h !== '#' && !document.querySelector(h)),
  )
  check('Nenhuma âncora interna quebrada', anchors.length === 0, anchors.join(' '))

  const links = await page.$$eval('a', (as) => as.map((a) => ({ href: a.href, raw: a.getAttribute('href'), target: a.target, rel: a.rel })))
  const wa = links.filter((l) => l.href.includes('wa.me'))
  check('Todos os links de WhatsApp usam o número informado', wa.length > 0 && wa.every((l) => l.raw.startsWith('https://wa.me/5569981169008?text=')), `${wa.length} links`)
  check('Link oficial do WhatsApp usado sem alterações', links.some((l) => l.raw === WA_DEFAULT))
  check('Telefone com link tel correto', links.some((l) => l.raw === TEL))
  check('Telefone e WhatsApp continuam separados', !links.some((l) => l.raw.includes('556933211271') && l.raw.includes('wa.me')))
  check('Instagram com link oficial', links.some((l) => l.raw === INSTAGRAM))
  check('Botão "Como chegar" com link do Maps', links.some((l) => l.raw === MAPS))
  const external = links.filter((l) => /^https?:/.test(l.raw ?? ''))
  check('Links externos abrem em nova aba com rel seguro', external.every((l) => l.target === '_blank' && l.rel.includes('noopener')), `${external.length} links`)

  const text = await page.textContent('body')
  for (const expected of ['Av. Paraná, 1691', 'Alto Alegre', '76985-295', '(69) 3321-1271', '359 avaliações no Google', '5,0', '08:00 às 12:00 e 14:00 às 18:30']) {
    check(`Conteúdo exibido: "${expected}"`, text.includes(expected))
  }
  check('Seis depoimentos fornecidos', (await page.$$('.quote')).length === 6)

  const missingAlt = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.getAttribute('alt')).length)
  check('Todas as imagens têm alt', missingAlt === 0)

  const mapTitle = await page.getAttribute('.location__map iframe', 'title')
  check('Mapa incorporado com título acessível', !!mapTitle && mapTitle.includes('Av. Paraná'))

  const ld = JSON.parse(await page.textContent('script[type="application/ld+json"]'))
  check('JSON-LD Dentist sem nota nem coordenadas', ld['@type'] === 'Dentist' && !ld.aggregateRating && !ld.geo)
  check('JSON-LD com os horários oficiais', ld.openingHoursSpecification?.length === 3)
  check('Sete dias na grade de horários', (await page.$$('.week__row')).length === 7)
  check('Domingo aparece como fechado', (await page.textContent('.week__row:last-child')).includes('Fechado'))
  check('Selo de aberta/fechada exibido', /Aberta agora|Fechada agora/.test(await page.textContent('.week__status')))

  await shot(page, 'desktop-1440-hero')

  // Navbar ao rolar
  await page.evaluate(() => window.scrollTo(0, 600))
  await page.waitForTimeout(500)
  check('Navbar ganha fundo ao rolar', await page.$eval('.nav', (n) => n.classList.contains('nav--solid')))

  // Antes e depois
  await page.locator('#trabalhos').scrollIntoViewIfNeeded()
  await page.waitForTimeout(2600)
  check('Seis casos de antes e depois', (await page.$$('.compare')).length === 6)
  const clipOf = () => page.$eval('.compare__before', (el) => getComputedStyle(el).clipPath)
  const clipStart = await clipOf()
  const range = page.locator('.compare__range').first()
  await range.focus()
  for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(200)
  const clipKeys = await clipOf()
  check('Teclado move o comparador', clipStart !== clipKeys, `${clipStart} → ${clipKeys}`)
  const box = await page.locator('.compare__stage').first().boundingBox()
  await page.mouse.click(box.x + box.width * 0.2, box.y + box.height / 2)
  await page.waitForTimeout(200)
  check('Clique move o comparador', (await clipOf()) !== clipKeys)
  const loaded = await page.$$eval('.compare img', (imgs) => imgs.every((i) => i.complete && i.naturalWidth > 0))
  check('Fotos de antes e depois carregadas', loaded)
  await shot(page, 'desktop-results')

  // Foco visível via teclado
  await page.reload({ waitUntil: 'networkidle' })
  await page.keyboard.press('Tab')
  const skip = await page.evaluate(() => document.activeElement?.textContent)
  check('Primeiro Tab leva ao link "Pular para o conteúdo"', skip?.includes('Pular'))

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)
  await shot(page, 'desktop-full', true)
  check('Sem erros no console (desktop)', errors.length === 0, errors.join(' | '))
  await page.close()
}

/* ---------- Larguras diversas: rolagem horizontal ---------- */
for (const [w, h] of [[360, 740], [390, 844], [768, 1024], [1024, 768], [1280, 720], [1920, 1080], [2560, 1080]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1900)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  check(`Sem rolagem horizontal em ${w}px`, overflow <= 0, `excesso ${overflow}px`)
  await shot(page, `hero-${w}x${h}`)
  await page.close()
}

/* ---------- Celular: menu hamburger ---------- */
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const toggle = page.locator('.nav__toggle')
  check('Botão de menu visível no celular', await toggle.isVisible())
  await toggle.click()
  await page.waitForTimeout(400)
  check('Menu abre (aria-expanded=true)', (await toggle.getAttribute('aria-expanded')) === 'true')
  check('Links do menu visíveis', await page.locator('.nav__links a', { hasText: 'Avaliações' }).isVisible())
  await shot(page, 'mobile-menu')
  await page.locator('.nav__links a', { hasText: 'Avaliações' }).click()
  await page.waitForTimeout(1200)
  check('Menu fecha após clicar no link', (await toggle.getAttribute('aria-expanded')) === 'false')
  const top = await page.$eval('#avaliacoes', (el) => Math.round(el.getBoundingClientRect().top))
  check('Navegação rola até a seção', Math.abs(top) < 90, `top=${top}`)
  await toggle.click()
  await page.keyboard.press('Escape')
  check('Escape fecha o menu', (await toggle.getAttribute('aria-expanded')) === 'false')

  const size = await page.$eval('.wa-float', (el) => el.getBoundingClientRect().width)
  check('Botão flutuante com área de toque confortável', size >= 48, `${size}px`)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(500)
  await shot(page, 'mobile-full', true)
  await page.close()
}

/* ---------- Movimento reduzido ---------- */
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  const hidden = await page.$$eval('[data-reveal]', (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length)
  check('Com movimento reduzido, nada fica escondido', hidden === 0, `${hidden} ocultos`)
  await context.close()
}

await browser.close()
const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} verificações passaram.`)
process.exit(failed.length ? 1 : 0)
