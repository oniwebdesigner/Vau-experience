import { images } from './images';
import type { Guide } from '../types/tour';
import type { Localized } from '../i18n/types';

export const guides: Guide[] = [
  {
    name: 'Arben Hoxha',
    role: { sq: 'Themelues & udhërrëfyes kryesor', en: 'Founder & lead guide', it: 'Fondatore e guida principale' },
    certification: { sq: 'Guidë e certifikuar · AKZM', en: 'Certified guide · AKZM', it: 'Guida certificata · AKZM' },
    bio: {
      sq: 'Lindur në Divjakë, Arbeni njeh çdo shteg të pyllit dhe çdo familje peshkatarësh të lagunës — dhe rrugët e vjetra drejt jugut.',
      en: 'Born in Divjakë, Arben knows every forest trail and every fishing family on the lagoon — and the old roads to the south.',
      it: 'Nato a Divjakë, Arben conosce ogni sentiero della pineta, ogni famiglia di pescatori della laguna e le vecchie strade verso sud.',
    },
    image: images.guideArben,
  },
  {
    name: 'Elira Kola',
    role: { sq: 'Ornitologe', en: 'Ornithologist', it: 'Ornitologa' },
    certification: {
      sq: 'Master në Biologji · Universiteti i Tiranës',
      en: 'MSc in Biology · University of Tirana',
      it: 'Laurea magistrale in Biologia · Università di Tirana',
    },
    bio: {
      sq: 'Elira ka numëruar pelikanët e Karavastasë për dhjetë vjet dhe flet për ta si për fqinjë.',
      en: 'Elira has been counting Karavasta’s pelicans for ten years and talks about them as if they were neighbours.',
      it: 'Elira conta i pellicani di Karavasta da dieci anni e ne parla come fossero vicini di casa.',
    },
    image: images.guideElira,
  },
  {
    name: 'Dritan Meta',
    role: { sq: 'Guidë mali & aventure', en: 'Mountain & adventure guide', it: 'Guida di montagna e avventura' },
    certification: {
      sq: 'Ndihma e parë · Guidë e certifikuar',
      en: 'First aid · Certified guide',
      it: 'Primo soccorso · Guida certificata',
    },
    bio: {
      sq: 'Dritani udhëheq turet me biçikletë, në kanionet e Osumit dhe në Alpet shqiptare, gjithmonë me kujdes për ju.',
      en: 'Dritan leads our bike tours, the Osum canyons and the Albanian Alps, always with great care for you.',
      it: 'Dritan guida i nostri tour in bici, nei canyon dell’Osum e sulle Alpi albanesi, sempre con grande cura per te.',
    },
    image: images.guideDritan,
  },
];

export const timeline: { year: string; text: Localized }[] = [
  {
    year: '2014',
    text: {
      sq: 'Arbeni nis të shoqërojë miqtë e parë me varkë drejt pelikanëve.',
      en: 'Arben begins taking his first friends out by boat to see the pelicans.',
      it: 'Arben comincia ad accompagnare i primi amici in barca a vedere i pellicani.',
    },
  },
  {
    year: '2018',
    text: {
      sq: 'Guidat tanë certifikohen nga Agjencia Kombëtare e Zonave të Mbrojtura.',
      en: 'Our guides are certified by the National Agency of Protected Areas.',
      it: 'Le nostre guide ottengono la certificazione dell’Agenzia Nazionale delle Aree Protette.',
    },
  },
  {
    year: '2022',
    text: {
      sq: 'Nga Divjaka, nisim ture në Berat, Rivierë, Theth dhe Butrint.',
      en: 'From Divjakë, we begin tours to Berat, the Riviera, Theth and Butrint.',
      it: 'Da Divjakë iniziamo i tour verso Berat, la Riviera, Theth e Butrint.',
    },
  },
  {
    year: '2026',
    text: {
      sq: 'Mbi 4.000 mysafirë nga e gjithë bota, në të gjithë Shqipërinë.',
      en: 'More than 4,000 guests from around the world, all across Albania.',
      it: 'Oltre 4.000 ospiti da tutto il mondo, in tutta l’Albania.',
    },
  },
];

export const destinations: { name: Localized; note: Localized }[] = [
  {
    name: { sq: 'Divjakë-Karavasta', en: 'Divjakë-Karavasta', it: 'Divjakë-Karavasta' },
    note: { sq: 'Zemra jonë: laguna dhe pelikanët', en: 'Our heart: the lagoon and its pelicans', it: 'Il nostro cuore: la laguna e i pellicani' },
  },
  {
    name: { sq: 'Riviera shqiptare', en: 'Albanian Riviera', it: 'Riviera albanese' },
    note: { sq: 'Gji të fshehur dhe ujë kristal', en: 'Hidden coves and crystal water', it: 'Calette nascoste e acqua cristallina' },
  },
  {
    name: { sq: 'Berat & Gjirokastër', en: 'Berat & Gjirokastër', it: 'Berat e Gjirokastër' },
    note: { sq: 'Qytete-muze të UNESCO-s', en: 'UNESCO museum towns', it: 'Città museo UNESCO' },
  },
  {
    name: { sq: 'Tiranë & Krujë', en: 'Tirana & Krujë', it: 'Tirana e Krujë' },
    note: { sq: 'Kryeqyteti dhe pazari i vjetër', en: 'The capital and the old bazaar', it: 'La capitale e il vecchio bazar' },
  },
  {
    name: { sq: 'Llogara', en: 'Llogara', it: 'Llogara' },
    note: { sq: 'Qafa ku mali takon detin', en: 'The pass where mountains meet the sea', it: 'Il passo dove la montagna incontra il mare' },
  },
  {
    name: { sq: 'Theth & Alpet shqiptare', en: 'Theth & the Albanian Alps', it: 'Theth e le Alpi albanesi' },
    note: { sq: 'Kulla guri dhe maja të egra', en: 'Stone towers and wild peaks', it: 'Torri di pietra e vette selvagge' },
  },
  {
    name: { sq: 'Butrint', en: 'Butrint', it: 'Butrint' },
    note: { sq: 'Qytet antik mes pyllit', en: 'An ancient city in the forest', it: 'Una città antica nel bosco' },
  },
  {
    name: { sq: 'Liqeni i Shkodrës', en: 'Lake Shkodër', it: 'Lago di Scutari' },
    note: { sq: 'Fshatra peshkatarësh dhe qetësi', en: 'Fishing villages and stillness', it: 'Villaggi di pescatori e quiete' },
  },
];

export const values: { title: Localized; text: Localized }[] = [
  {
    title: { sq: 'Guida të certifikuar', en: 'Certified guides', it: 'Guide certificate' },
    text: {
      sq: 'Çdo tour zhvillohet në grupe profesionale me guida vendas të certifikuar. Rezervo direkt dhe ta konfirmojmë datën brenda pak orësh.',
      en: 'Every tour is run in professional groups with certified local guides. Book directly and we’ll confirm your date within a few hours.',
      it: 'Ogni tour si svolge in gruppi professionali con guide locali certificate. Prenota direttamente e ti confermiamo la data entro poche ore.',
    },
  },
  {
    title: { sq: 'Respekt për natyrën', en: 'Respect for nature', it: 'Rispetto per la natura' },
    text: {
      sq: 'Ndjekim rregullat e parqeve, mbajmë distancë nga kolonitë dhe kthejmë një pjesë të të ardhurave për mbrojtjen e tyre.',
      en: 'We follow the parks’ rules, keep our distance from the colonies and give back part of our income to protect them.',
      it: 'Seguiamo le regole dei parchi, manteniamo le distanze dalle colonie e destiniamo parte dei ricavi alla loro tutela.',
    },
  },
  {
    title: { sq: 'Njerëz vendas', en: 'Local people', it: 'Gente del posto' },
    text: {
      sq: 'Guidat, peshkatarët, kuzhinierët, familjet në fshatra: të gjithë jetojnë këtu. Paratë tuaja mbeten në Shqipëri.',
      en: 'Guides, fishermen, cooks and village families all live here. What you spend stays in Albania.',
      it: 'Guide, pescatori, cuochi e famiglie dei villaggi vivono tutti qui. Quello che spendi resta in Albania.',
    },
  },
  {
    title: { sq: 'Mikpritje shqiptare', en: 'Albanian hospitality', it: 'Ospitalità albanese' },
    text: {
      sq: '“Mysafiri është i Zotit.” Nuk e themi si slogan; është mënyra si jemi rritur.',
      en: '“The guest belongs to God.” For us it isn’t a slogan; it’s how we were raised.',
      it: '«L’ospite è sacro.» Per noi non è uno slogan: è il modo in cui siamo cresciuti.',
    },
  },
];

export const parkFacts: { value: Localized; text: Localized }[] = [
  {
    value: { sq: '1994', en: '1994', it: '1994' },
    text: {
      sq: 'Zonë Ramsar, ligatinë me rëndësi ndërkombëtare',
      en: 'Ramsar Site, a wetland of international importance',
      it: 'Sito Ramsar, zona umida di importanza internazionale',
    },
  },
  {
    value: { sq: '230+', en: '230+', it: '230+' },
    text: {
      sq: 'lloje shpendësh të regjistruara në park',
      en: 'bird species recorded in the park',
      it: 'specie di uccelli censite nel parco',
    },
  },
  {
    value: { sq: '~4.300 ha', en: '~4,300 ha', it: '~4.300 ha' },
    text: {
      sq: 'Laguna e Karavastasë, më e madhja në vend',
      en: 'Karavasta Lagoon, the largest in the country',
      it: 'la Laguna di Karavasta, la più grande del Paese',
    },
  },
];
