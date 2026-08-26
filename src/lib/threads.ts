export type Thread = {
  id: string;
  title: string;
  question: string;
  href: string;
  summary: string;
  slugs: string[];
};

export const themeThreads: Thread[] = [
  {
    id: "race",
    title: "Race and American identity",
    question: "Whose story is being told—and who is allowed to tell it?",
    href: "/themes/race",
    summary:
      "A conversation that runs from Show Boat’s interracial plot through South Pacific, West Side Story, Ragtime, and Hamilton’s casting as interpretation.",
    slugs: ["show-boat", "south-pacific", "west-side-story", "ragtime", "hamilton"],
  },
  {
    id: "immigration",
    title: "Immigration and belonging",
    question: "Who gets to call America home?",
    href: "/themes/immigration",
    summary:
      "Displacement, arrival, and the later question of whether a neighborhood can remain home once it is priced out of itself.",
    slugs: ["fiddler-on-the-roof", "ragtime", "west-side-story", "in-the-heights"],
  },
  {
    id: "war",
    title: "War remembered",
    question: "What happens when national history becomes personal?",
    href: "/themes/war",
    summary:
      "Not battlefields first, but the people asked to fight, love, or remember: South Pacific, Hair, Miss Saigon.",
    slugs: ["south-pacific", "hair", "miss-saigon"],
  },
  {
    id: "politics",
    title: "Who writes the national story",
    question: "Who gets to write the national story?",
    href: "/themes/politics",
    summary:
      "Founding myth, its inversion, and the people left outside the room: 1776, Hamilton, Assassins, Suffs.",
    slugs: ["1776", "hamilton", "assassins", "suffs"],
  },
  {
    id: "family",
    title: "The American family",
    question: "What does an American family look like?",
    href: "/themes/family",
    summary:
      "From tradition and refuge to families that are reconstructed, questioned, or chosen.",
    slugs: ["fiddler-on-the-roof", "the-sound-of-music", "gypsy", "next-to-normal", "fun-home", "kimberly-akimbo"],
  },
  {
    id: "gender",
    title: "Ambition and permission",
    question: "Who is allowed to want more?",
    href: "/themes/gender",
    summary:
      "What women—and later men standing in women’s plots—are permitted to want, from Gypsy and Evita to Wicked, SIX, Suffs, and Company.",
    slugs: ["gypsy", "evita", "wicked", "six", "suffs", "company-2021"],
  },
  {
    id: "inequality",
    title: "Who gets the American Dream",
    question: "Who gets the American Dream?",
    href: "/themes/inequality",
    summary:
      "Opportunity as a promise Broadway tests against neighborhoods, chorus lines, lofts, and founding myths.",
    slugs: ["west-side-story", "a-chorus-line", "rent", "in-the-heights", "the-outsiders-2024", "hamilton"],
  },
  {
    id: "technology",
    title: "Machines and meaning",
    question: "What happens when the world changes faster than we do?",
    href: "/themes/technology",
    summary:
      "From hidden machinery to visible puppetry to robots who can fall in love—and expire.",
    slugs: ["the-phantom-of-the-opera", "the-lion-king", "sunset-boulevard-2023", "maybe-happy-ending"],
  },
];

export const innovationStages: Thread[] = [
  {
    id: "book",
    title: "The book musical",
    question: "When song, story, and character stop interrupting one another",
    href: "/galleries/golden-age",
    summary:
      "Show Boat and Oklahoma! made integration itself the invention: the number had to do dramatic work.",
    slugs: ["show-boat", "oklahoma", "carousel"],
  },
  {
    id: "choreography",
    title: "Dance as drama",
    question: "When the body argues as hard as the lyric",
    href: "/galleries/grows-up",
    summary:
      "West Side Story, A Chorus Line, and Chicago treat choreography as plot, labor, and character—not decoration.",
    slugs: ["west-side-story", "a-chorus-line", "chicago"],
  },
  {
    id: "amplification",
    title: "Amplified sound",
    question: "When the pit and the street share a frequency",
    href: "/galleries/grows-up",
    summary:
      "Hair, Jesus Christ Superstar, and later rock musicals made electrical sound part of Broadway’s vocabulary.",
    slugs: ["hair", "jesus-christ-superstar", "rent"],
  },
  {
    id: "automation",
    title: "Automation and mega-spectacle",
    question: "When machinery becomes the attraction",
    href: "/galleries/mega-musicals",
    summary:
      "The British mega-musical made hydraulic sets, barricades, and falling chandeliers central to meaning and marketing.",
    slugs: ["cats", "les-miserables", "the-phantom-of-the-opera", "miss-saigon"],
  },
  {
    id: "puppetry",
    title: "Puppetry and visible making",
    question: "When the audience is asked to believe and to see the strings",
    href: "/galleries/disney",
    summary:
      "The Lion King and Avenue Q show the apparatus on purpose. Belief becomes a collaboration.",
    slugs: ["the-lion-king", "avenue-q"],
  },
  {
    id: "projection",
    title: "Live video and projection",
    question: "When the close-up enters the house",
    href: "/galleries/today",
    summary:
      "Cameras onstage turn theatre toward film without leaving the room—most sharply in the 2024 Sunset Boulevard.",
    slugs: ["sunset-boulevard-2023"],
  },
  {
    id: "digital",
    title: "Machines as characters",
    question: "When technology stops being scenery and starts wanting things",
    href: "/themes/technology",
    summary:
      "Maybe Happy Ending asks what memory and companionship mean when the lovers are robots built to expire.",
    slugs: ["maybe-happy-ending"],
  },
];
