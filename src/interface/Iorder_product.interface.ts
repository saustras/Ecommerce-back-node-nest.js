export interface IOrderProduct {
  title: string;
  discount?: number;
  price: number;
  slug: string;
  summary: string;
  video: string;
  quantity: number;
  cover?: Icon;
  wallpaper?: Icon;
  screenshots?: Icon[];
  platform?: number;
}