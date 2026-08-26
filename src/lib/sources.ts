export type Source = {
  title: string;
  href?: string;
  note?: string;
};

const shared: Source[] = [
  {
    title: "Internet Broadway Database (IBDB)",
    href: "https://www.ibdb.com/",
    note: "Production credits, venues, and run information for Broadway openings and revivals.",
  },
  {
    title: "Kenrick, John. Musical Theatre: A History. 2nd ed. Bloomsbury, 2017.",
    note: "Survey of the form from European precursors through the contemporary musical.",
  },
  {
    title: "Stempel, Larry. Showtime: A History of the Broadway Musical Theater. W. W. Norton, 2010.",
    note: "Production-centered history of Broadway musicals as commercial and artistic practice.",
  },
];

const bySlug: Record<string, Source[]> = {
  "show-boat": [
    {
      title: "Kreuger, Miles. Show Boat: The Story of a Classic American Musical. Oxford University Press, 1977.",
    },
  ],
  oklahoma: [
    {
      title: "Carter, Tim. Oklahoma!: The Making of an American Musical. Yale University Press, 2007.",
    },
  ],
  "west-side-story": [
    {
      title: "Wells, Elizabeth A. West Side Story: Cultural Perspectives on an American Musical. Scarecrow Press, 2011.",
    },
  ],
  company: [
    {
      title: "Sondheim, Stephen. Finishing the Hat. Alfred A. Knopf, 2010.",
    },
  ],
  "company-2021": [
    {
      title: "Sondheim, Stephen. Finishing the Hat. Alfred A. Knopf, 2010.",
    },
  ],
  "sweeney-todd": [
    {
      title: "Sondheim, Stephen. Finishing the Hat. Alfred A. Knopf, 2010.",
    },
  ],
  hamilton: [
    {
      title: "Miranda, Lin-Manuel, and Jeremy McCarter. Hamilton: The Revolution. Grand Central Publishing, 2016.",
    },
    {
      title: "Chernow, Ron. Alexander Hamilton. Penguin Press, 2004.",
    },
  ],
  "in-the-heights": [
    {
      title: "Miranda, Lin-Manuel, and Quiara Alegría Hudes. In the Heights: Finding Home. Random House, 2021.",
    },
  ],
  rent: [
    {
      title: "Schulman, Sarah. Stagestruck: Theater, AIDS, and the Marketing of Gay America. Duke University Press, 1998.",
    },
  ],
  "the-lion-king": [
    {
      title: "Taymor, Julie. The Lion King: Pride Rock on Broadway. Hyperion, 1997.",
    },
  ],
  "a-chorus-line": [
    {
      title: "Viagas, Robert, Baayork Lee, and Thommie Walsh. On the Line: The Creation of A Chorus Line. William Morrow, 1990.",
    },
  ],
  "south-pacific": [
    {
      title: "Most, Andrea. Making Americans: Jews and the Broadway Musical. Harvard University Press, 2004.",
    },
  ],
  ragtime: [
    {
      title: "Doctorow, E. L. Ragtime. Random House, 1975.",
    },
  ],
  fiddler: [
    {
      title: "Solomon, Alisa. Wonder of Wonders: A Cultural History of Fiddler on the Roof. Metropolitan Books, 2013.",
    },
  ],
  "fiddler-on-the-roof": [
    {
      title: "Solomon, Alisa. Wonder of Wonders: A Cultural History of Fiddler on the Roof. Metropolitan Books, 2013.",
    },
  ],
  "1776": [
    {
      title: "Stone, Peter, and Sherman Edwards. 1776: A Musical Play. Viking Press, 1970.",
    },
  ],
};

export function getSources(slug: string): Source[] {
  const extra = bySlug[slug] ?? [];
  const seen = new Set<string>();
  return [...extra, ...shared].filter((source) => {
    if (seen.has(source.title)) return false;
    seen.add(source.title);
    return true;
  });
}
