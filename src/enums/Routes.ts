export enum Routes {
  Home = '/',
  Faq = '/faq',
  Contacts = '/contacts',
  Rules = '/rules',
  Quest = '/quests/:slug',
}

export type QuestParams = {
  slug: string
}

export class Quest extends Object {
  private readonly slug: string;

  constructor(slug: string) {
    super();
    this.slug = slug;
  }

  toString(): string {
    return formatRoute(
      Routes.Quest,
      {slug: this.slug}
    );
  }
}


/**
 * Example
 *
 * str = 'lineId - :lineId, matchId - :matchId'
 * params = {lineId: 1, matchId: 2}
 * return 'lineId - 1, matchId - 2'
 * */
// eslint-disable-next-line
function formatRoute(route: Routes, params: any = {}): string {
  return Object.keys(params)
    .reduce(
      (acc, prop) => acc.replace(`:${prop}`, params[prop]),
      route.toString()
    );
}
