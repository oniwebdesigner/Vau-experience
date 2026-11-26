import { images } from './images';
import type { CategoryEntry } from '../types/tour';

export const categories: CategoryEntry[] = [
  {
    name: 'Birdwatching',
    label: { sq: 'Birdwatching', en: 'Birdwatching', it: 'Birdwatching' },
    description: {
      sq: 'Pelikanë kaçurrelë dhe flamingo në Divjakë-Karavasta.',
      en: 'Dalmatian pelicans and flamingos at Divjakë-Karavasta.',
      it: 'Pellicani ricci e fenicotteri a Divjakë-Karavasta.',
    },
    image: images.pelicans,
  },
  {
    name: 'Bregdet',
    label: { sq: 'Bregdet', en: 'Coast', it: 'Costa' },
    description: {
      sq: 'Riviera shqiptare, gjiret dhe perëndimet mbi Jon.',
      en: 'The Albanian Riviera, its coves and Ionian sunsets.',
      it: 'La Riviera albanese, le sue calette e i tramonti sullo Ionio.',
    },
    image: images.riviera,
  },
  {
    name: 'Male',
    label: { sq: 'Male', en: 'Mountains', it: 'Montagna' },
    description: {
      sq: 'Theth, Valbona dhe Alpet shqiptare.',
      en: 'Theth, Valbona and the Albanian Alps.',
      it: 'Theth, Valbona e le Alpi albanesi.',
    },
    image: images.theth,
  },
  {
    name: 'Natyrë',
    label: { sq: 'Natyrë', en: 'Nature', it: 'Natura' },
    description: {
      sq: 'Kallamishte, kanione dhe mëngjese të heshtura.',
      en: 'Reed beds, canyons and silent mornings.',
      it: 'Canneti, canyon e mattine silenziose.',
    },
    image: images.beratOsum,
  },
  {
    name: 'Kulturë',
    label: { sq: 'Kulturë', en: 'Culture', it: 'Cultura' },
    description: {
      sq: 'Butrint, Krujë dhe historitë e peshkatarëve.',
      en: 'Butrint, Krujë and the fishermen’s stories.',
      it: 'Butrint, Krujë e le storie dei pescatori.',
    },
    image: images.butrint,
  },
  {
    name: 'Ushqim',
    label: { sq: 'Ushqim', en: 'Food', it: 'Gastronomia' },
    description: {
      sq: 'Tryeza shqiptare, nga kopshti te pjata.',
      en: 'The Albanian table, from garden to plate.',
      it: 'La tavola albanese, dall’orto al piatto.',
    },
    image: images.food,
  },
  {
    name: 'Tradita',
    label: { sq: 'Tradita', en: 'Traditions', it: 'Tradizioni' },
    description: {
      sq: 'Këngë, valle dhe mbrëmje fshati.',
      en: 'Songs, dances and village evenings.',
      it: 'Canti, danze e serate di paese.',
    },
    image: images.tradition,
  },
  {
    name: 'Bike',
    label: { sq: 'Bike', en: 'Bike', it: 'Bike' },
    description: {
      sq: 'Shtigje të buta nën pishat buzë detit.',
      en: 'Gentle trails beneath the seaside pines.',
      it: 'Sentieri dolci sotto i pini sul mare.',
    },
    image: images.cycling,
  },
  {
    name: 'Buggy',
    label: { sq: 'Buggy', en: 'Buggy', it: 'Buggy' },
    description: {
      sq: 'Dunat, rëra dhe era e kripës.',
      en: 'Dunes, sand and the scent of salt.',
      it: 'Dune, sabbia e profumo di salsedine.',
    },
    image: images.buggy,
  },
];
