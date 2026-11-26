import { images } from './images';
import type { Localized } from '../i18n/types';

export const bikeRental: {
  image: string;
  imageAlt: Localized;
  label: Localized;
  title: Localized;
  description: Localized;
  points: Localized<string[]>;
  priceNote: Localized;
  cta: Localized;
  whatsappMessage: Localized;
  noteBody: Localized;
} = {
  image: images.bikes,
  imageAlt: {
    sq: 'Biçikleta qyteti dhe elektrike në një shteg rëre në pyllin e pishave pranë lagunës',
    en: 'City bikes and e-bikes on a sandy path in the pine forest by the lagoon',
    it: 'Biciclette da città ed e-bike su un sentiero sabbioso nella pineta vicino alla laguna',
  },
  label: { sq: 'Biçikleta me qira', en: 'Bike rental', it: 'Noleggio biciclette' },
  title: {
    sq: 'Shqipëria me *pedale*.',
    en: 'Albania, by *bike*.',
    it: 'L’Albania in *bicicletta*.',
  },
  description: {
    sq: 'Merrni me qira një biçikletë dhe zbuloni pyllin e pishave të Divjakës, bregun e lagunës dhe plazhet përreth me ritmin tuaj. Ne i përgatitim biçikletat dhe ju sugjerojmë rrugët më të bukura.',
    en: 'Rent a bike and explore the Divjakë pine forest, the lagoon shore and the nearby beaches at your own pace. We prepare the bikes and suggest the loveliest routes.',
    it: 'Noleggia una bicicletta e scopri la pineta di Divjakë, la riva della laguna e le spiagge vicine con i tuoi tempi. Prepariamo noi le bici e ti suggeriamo i percorsi più belli.',
  },
  points: {
    sq: ['Biçikleta qyteti', 'Biçikleta elektrike', 'Helmeta dhe dryna të përfshira', 'Harta me itinerare', 'Shëtitje me guidë sipas kërkesës'],
    en: ['City bikes', 'E-bikes', 'Helmets and locks included', 'Route maps', 'Guided rides on request'],
    it: ['Biciclette da città', 'E-bike', 'Caschi e lucchetti inclusi', 'Mappe dei percorsi', 'Uscite guidate su richiesta'],
  },
  priceNote: {
    sq: 'Çmimi sipas kohëzgjatjes',
    en: 'Price depends on rental duration',
    it: 'Prezzo in base alla durata',
  },
  cta: {
    sq: 'Pyet për disponueshmërinë',
    en: 'Ask about availability',
    it: 'Chiedi la disponibilità',
  },
  whatsappMessage: {
    sq: 'Përshëndetje VAU Experience! Do të doja të merrja biçikleta me qira. A keni disponueshmëri?',
    en: 'Hello VAU Experience! I’d like to rent bikes. Do you have availability?',
    it: 'Ciao VAU Experience! Vorrei noleggiare delle biciclette. Avete disponibilità?',
  },
  noteBody: {
    sq: 'Biçikleta qyteti dhe elektrike për pyllin e Divjakës dhe bregdetin, me helmeta, dryna dhe harta.',
    en: 'City bikes and e-bikes for the Divjakë pine forest and the coast, with helmets, locks and route maps.',
    it: 'Biciclette da città ed e-bike per la pineta di Divjakë e la costa, con caschi, lucchetti e mappe.',
  },
};
