import { PlatformEntity } from "src/modules/infrastructure/entities/platform.entity";

export interface IOrderProduct {
  id?:number;
  title?: string;
  discount?: number;
  price?: number;
  slug?: string;
  summary?: string;
  video?: string;
  quantity?: number;
  cover?: Icon;
  wallpaper?: Icon;
  screenshots?: Icon[];
  platform?: PlatformEntity;
}