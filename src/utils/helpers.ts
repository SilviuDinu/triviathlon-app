export const capitalize = (str: string) => {
  return str
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getSearchRegExp = (searchValue: string): RegExp => {
  return new RegExp(`^(${searchValue})|${searchValue}`, 'gi');
};

export const exists = (pool: any[], fish: any) => {
  return pool.indexOf(fish) > -1;
};

export const getRandomVal = (min: number = 0, max: number = 1) => {
  return Math.random() * (max - min) + min;
};

export function decodeHtml(html: string) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export const categories = [
  'Any Category',
  'General Knowledge',
  'Entertainment: Books',
  'Entertainment: Film',
  'Entertainment: Music',
  'Entertainment: Musicals & Theatres',
  'Entertainment: Television',
  'Entertainment: Video Games',
  'Entertainment: Board Games',
  'Science & Nature',
  'Science: Computers',
  'Science: Mathematics',
  'Mythology',
  'Sports',
  'Geography',
  'History',
  'Politics',
  'Art',
  'Celebrities',
  'Animals',
  'Vehicles',
  'Entertainment: Comics',
  'Science: Gadgets',
  'Entertainment: Japanese Anime & Manga',
  'Entertainment: Cartoon & Animations',
];

export const categoriesMap = new Map([
  ['General Knowledge', 9],
  ['Entertainment: Books', 10],
  ['Entertainment: Film', 11],
  ['Entertainment: Music', 12],
  ['Entertainment: Musicals & Theatres', 13],
  ['Entertainment: Television', 14],
  ['Entertainment: Video Games', 15],
  ['Entertainment: Board Games', 16],
  ['Science & Nature', 17],
  ['Science: Computers', 18],
  ['Science: Mathematics', 19],
  ['Mythology', 20],
  ['Sports', 21],
  ['Geography', 22],
  ['History', 23],
  ['Politics', 24],
  ['Art', 25],
  ['Celebrities', 26],
  ['Animals', 27],
  ['Vehicles', 28],
  ['Entertainment: Comics', 29],
  ['Science: Gadgets', 30],
  ['Entertainment: Japanese Anime & Manga', 31],
  ['Entertainment: Cartoon & Animations', 32],
]);
