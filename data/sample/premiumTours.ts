import { images } from '../images';
import type { PremiumTour } from '../../types/tour';

// Prices are in Albanian lek (ALL).
export const premiumTours: PremiumTour[] = [
  {
    id: 'laguna-ne-oren-blu',
    title: { sq: 'Laguna në orën blu', en: 'The Lagoon at Blue Hour', it: 'La laguna all’ora blu' },
    subtitle: {
      sq: 'Varkë private, një fanar dhe asnjë zë tjetër.',
      en: 'A private boat, a lantern and no other voices.',
      it: 'Una barca privata, una lanterna e nessun’altra voce.',
    },
    description: {
      sq: 'Një varkë druri vetëm për ju, në momentin kur dita mbaron dhe laguna bëhet pasqyrë. Lundrojmë drejt ishujve të pelikanëve, ndalojmë motorin dhe lëmë heshtjen të flasë. Shampanjë shqiptare dhe meze të lehta në bord.',
      en: 'A wooden boat just for you, at the moment the day ends and the lagoon becomes a mirror. We sail towards the pelican islets, cut the engine and let the silence speak. Albanian sparkling wine and light meze on board.',
      it: 'Una barca di legno tutta per voi, nel momento in cui il giorno finisce e la laguna diventa uno specchio. Navighiamo verso gli isolotti dei pellicani, spegniamo il motore e lasciamo parlare il silenzio. A bordo, spumante albanese e meze leggeri.',
    },
    duration: { sq: '3 orë', en: '3 hours', it: '3 ore' },
    location: { sq: 'Laguna e Karavastasë', en: 'Karavasta Lagoon', it: 'Laguna di Karavasta' },
    price: 28000,
    priceNote: { sq: 'për dy persona', en: 'for two guests', it: 'per due persone' },
    pricePerPerson: 14000,
    image: images.premiumBoat,
    includes: {
      sq: ['Varkë dhe guidë private', 'Shampanjë dhe meze në bord', 'Transferim nga hoteli'],
      en: ['Private boat and guide', 'Sparkling wine and meze on board', 'Hotel transfer'],
      it: ['Barca e guida private', 'Spumante e meze a bordo', 'Transfer dall’hotel'],
    },
  },
  {
    id: 'darke-mbi-skele',
    title: { sq: 'Darkë mbi skelë', en: 'Dinner on the Pier', it: 'Cena sul pontile' },
    subtitle: {
      sq: 'Një tryezë e vetme mbi ujë, nën qiellin e Myzeqesë.',
      en: 'A single table over the water, beneath the Myzeqe sky.',
      it: 'Un unico tavolo sull’acqua, sotto il cielo della Myzeqe.',
    },
    description: {
      sq: 'Shtrojmë një tryezë vetëm për ju në fund të një skele druri. Kuzhinieri ynë gatuan peshkun e ditës dhe recetat e lagunës, ndërsa qirinjtë ndizen një nga një. Menu me pesë pjata dhe verëra nga kantinat e vogla shqiptare.',
      en: 'We set a table just for you at the end of a wooden pier. Our chef cooks the catch of the day and the recipes of the lagoon while the candles are lit one by one. A five-course menu with wines from small Albanian cellars.',
      it: 'Apparecchiamo un tavolo solo per voi in fondo a un pontile di legno. Il nostro chef cucina il pescato del giorno e le ricette della laguna, mentre le candele si accendono una a una. Menù di cinque portate con vini di piccole cantine albanesi.',
    },
    duration: { sq: '3,5 orë', en: '3.5 hours', it: '3,5 ore' },
    location: { sq: 'Skela e Godullës', en: 'Godullë pier', it: 'Pontile di Godullë' },
    price: 34000,
    priceNote: { sq: 'për dy persona', en: 'for two guests', it: 'per due persone' },
    pricePerPerson: 17000,
    image: images.premiumDinner,
    includes: {
      sq: ['Menu degustimi me 5 pjata', 'Çiftim verërash shqiptare', 'Kuzhinier dhe kamarier privat'],
      en: ['Five-course tasting menu', 'Albanian wine pairing', 'Private chef and waiter'],
      it: ['Menù degustazione di cinque portate', 'Abbinamento con vini albanesi', 'Chef e cameriere privati'],
    },
  },
  {
    id: 'agim-me-ornitologen',
    title: { sq: 'Agim me ornitologen', en: 'Dawn with the Ornithologist', it: 'Alba con l’ornitologa' },
    subtitle: {
      sq: 'Elira, teleskopi dhe pelikanët — vetëm për ju.',
      en: 'Elira, the telescope and the pelicans — just for you.',
      it: 'Elira, il telescopio e i pellicani: solo per voi.',
    },
    description: {
      sq: 'Një mëngjes privat me ornitologen tonë kryesore. Hyjmë në zona vrojtimi me leje të veçantë, larg grupeve, dhe ndjekim jetën e kolonisë së pelikanëve me optikë profesionale. Mëngjes i plotë i servirur në platformë.',
      en: 'A private morning with our lead ornithologist. With special permits we enter observation areas far from the groups and follow life in the pelican colony through professional optics. A full breakfast is served on the platform.',
      it: 'Una mattina privata con la nostra ornitologa principale. Con permessi speciali entriamo in aree di osservazione lontane dai gruppi e seguiamo la vita della colonia di pellicani con ottiche professionali. Colazione completa servita sulla piattaforma.',
    },
    duration: { sq: '4 orë', en: '4 hours', it: '4 ore' },
    location: { sq: 'Zona e kolonisë, Karavasta', en: 'Colony area, Karavasta', it: 'Area della colonia, Karavasta' },
    price: 22000,
    priceNote: { sq: 'për dy persona', en: 'for two guests', it: 'per due persone' },
    pricePerPerson: 11000,
    image: images.birdwatching,
    includes: {
      sq: ['Ornitologe private', 'Optikë profesionale', 'Mëngjes në platformë vrojtimi'],
      en: ['Private ornithologist', 'Professional optics', 'Breakfast on the observation platform'],
      it: ['Ornitologa privata', 'Ottiche professionali', 'Colazione sulla piattaforma di osservazione'],
    },
  },
  {
    id: 'nje-dite-e-plote',
    title: { sq: 'Një ditë e plotë në park', en: 'A Full Day in the Park', it: 'Una giornata intera nel parco' },
    subtitle: {
      sq: 'Nga agimi te perëndimi, sipas ritmit tuaj.',
      en: 'From dawn to dusk, at your own pace.',
      it: 'Dall’alba al tramonto, con i vostri tempi.',
    },
    description: {
      sq: 'Një ditë e ndërtuar vetëm për ju: pelikanët në agim, biçikletë në pyll, drekë në fermë, pushim në plazh dhe varkë në perëndim. Ne merremi me çdo detaj — ju thjesht jeni mysafiri ynë.',
      en: 'A day designed entirely around you: pelicans at dawn, cycling in the pines, lunch at the farm, time on the beach and a boat at sunset. We take care of every detail — you are simply our guest.',
      it: 'Una giornata costruita interamente su di voi: pellicani all’alba, bicicletta in pineta, pranzo in fattoria, relax in spiaggia e barca al tramonto. Pensiamo noi a ogni dettaglio: voi siete semplicemente nostri ospiti.',
    },
    duration: { sq: '10 orë', en: '10 hours', it: '10 ore' },
    location: {
      sq: 'Parku Kombëtar Divjakë-Karavasta',
      en: 'Divjakë-Karavasta National Park',
      it: 'Parco Nazionale di Divjakë-Karavasta',
    },
    price: 59000,
    priceNote: { sq: 'grup deri në 4 persona', en: 'group of up to 4', it: 'gruppo fino a 4 persone' },
    pricePerPerson: 14800,
    image: images.hero,
    includes: {
      sq: ['Itinerar i personalizuar', 'Të gjitha vaktet dhe pijet', 'Concierge personal gjatë gjithë ditës'],
      en: ['Tailor-made itinerary', 'All meals and drinks', 'Personal concierge throughout the day'],
      it: ['Itinerario su misura', 'Tutti i pasti e le bevande', 'Concierge personale per tutta la giornata'],
    },
  },
];
