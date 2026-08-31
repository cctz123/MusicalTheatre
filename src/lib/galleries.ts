export type GalleryMeta = {
  slug: string;
  roman: string;
  title: string;
  subtitle: string;
  years: string;
  quote: string;
  summary: string;
  accent: string;
  accentSoft: string;
};

export const galleries: GalleryMeta[] = [
  {
    slug: "foundations",
    roman: "I",
    title: "Foundations of American Musical Theatre",
    subtitle: "From Spectacle to Storytelling",
    years: "1866–1942",
    quote: "Before Broadway became America's greatest storytelling stage, it was America's greatest entertainment.",
    summary:
      "From operetta and vaudeville to Show Boat, discover how Broadway developed its artistic identity and laid the groundwork for the modern musical.",
    accent: "#c9a227",
    accentSoft: "rgba(201, 162, 39, 0.18)",
  },
  {
    slug: "golden-age",
    roman: "II",
    title: "The Golden Age",
    subtitle: "The Integrated Musical",
    years: "1943–1959",
    quote: "Songs were no longer interruptions to the story—they became the story itself.",
    summary:
      "Explore the era that established the integrated musical, where music, story, choreography, and character became inseparable.",
    accent: "#b0892e",
    accentSoft: "rgba(176, 137, 46, 0.16)",
  },
  {
    slug: "grows-up",
    roman: "III",
    title: "Broadway Grows Up",
    subtitle: "Innovation, Social Change, and the Modern American Musical",
    years: "1960–1975",
    quote: "As America changed, Broadway changed with it.",
    summary:
      "Follow Broadway as it embraced social change, political commentary, psychological realism, and increasingly ambitious storytelling.",
    accent: "#c45c26",
    accentSoft: "rgba(196, 92, 38, 0.18)",
  },
  {
    slug: "sondheim",
    roman: "IV",
    title: "Sondheim and the Expansion of the Musical",
    subtitle: "Complexity, Innovation, and Emotional Depth",
    years: "1970–1991",
    quote: "A musical could think as hard as it could feel.",
    summary:
      "Examine how Stephen Sondheim transformed the possibilities of musical theatre through complexity, innovation, and emotional depth.",
    accent: "#8fbfc9",
    accentSoft: "rgba(143, 191, 201, 0.16)",
  },
  {
    slug: "mega-musicals",
    roman: "V",
    title: "The British Mega-Musical",
    subtitle: "Broadway Goes Global",
    years: "1978–1995",
    quote: "Broadway became bigger than New York—it became a global phenomenon.",
    summary:
      "Witness the rise of global productions that combined spectacular staging, technological innovation, and international commercial success.",
    accent: "#9a8c98",
    accentSoft: "rgba(154, 140, 152, 0.18)",
  },
  {
    slug: "disney",
    roman: "VI",
    title: "Disney and the Broadway Renaissance",
    subtitle: "Family Audiences and Stagecraft",
    years: "1994–2006",
    quote: "Broadway was no longer just preserving tradition—it was reinventing itself for a new generation.",
    summary:
      "See how Broadway reached new generations through visually ambitious family productions while expanding the artistic possibilities of stagecraft.",
    accent: "#d4a017",
    accentSoft: "rgba(212, 160, 23, 0.18)",
  },
  {
    slug: "contemporary",
    roman: "VII",
    title: "New Voices, New Forms",
    subtitle: "Social Issues, Style, and Representation",
    years: "1995–2010",
    quote: "Broadway no longer reflected a single America—it reflected many Americas.",
    summary:
      "Discover musicals that addressed contemporary social issues, experimented with new musical styles, and broadened whose stories were told.",
    accent: "#c43d5b",
    accentSoft: "rgba(196, 61, 91, 0.16)",
  },
  {
    slug: "new-broadway",
    roman: "VIII",
    title: "The New Broadway",
    subtitle: "Innovation, Diversity, and Reimagining",
    years: "2011–2019",
    quote: "History, hip-hop, folk, and fandom arrived on the same stages.",
    summary:
      "Experience a decade when diverse creators, innovative storytelling, and digital culture reshaped the American musical.",
    accent: "#6bbf8a",
    accentSoft: "rgba(107, 191, 138, 0.16)",
  },
  {
    slug: "today",
    roman: "IX",
    title: "Broadway Today",
    subtitle: "Revivals That Changed Broadway",
    years: "2020–Present",
    quote: "What does this story mean today?",
    summary:
      "Instead of chronology alone, this gallery examines why certain new works and revivals became historically significant in the present.",
    accent: "#e07a5f",
    accentSoft: "rgba(224, 122, 95, 0.16)",
  },
  {
    slug: "living-history",
    roman: "X",
    title: "Broadway as Living History",
    subtitle: "How Musicals Tell the Story of America",
    years: "Five themes",
    quote: "A history textbook can tell us what happened. A musical can show us what a generation feared, celebrated, or imagined could be different.",
    summary:
      "Rather than focusing on individual productions, this gallery explores Broadway itself—as a record of American arguments about identity, power, and belonging.",
    accent: "#9a7514",
    accentSoft: "rgba(154, 117, 20, 0.12)",
  },
];

export function getGallery(slug: string) {
  return galleries.find((gallery) => gallery.slug === slug);
}

export function getNextGallery(slug: string) {
  const index = galleries.findIndex((gallery) => gallery.slug === slug);
  if (index < 0 || index === galleries.length - 1) return undefined;
  return galleries[index + 1];
}

export function getPrevGallery(slug: string) {
  const index = galleries.findIndex((gallery) => gallery.slug === slug);
  if (index <= 0) return undefined;
  return galleries[index - 1];
}
