
export interface ArticleType {
  article_id: number;
  create_time: Date;
  update_time: Date;
  article_tag: string;
  article_title: string;
  article_desc: string;
  article_content: string;
  article_like: number;
  article_view: number;
  article_url: string;
  article_cover: string;
}
export interface TagType {
  tag_id: number;
  tag_name: string;
  tag_desc: string;
  create_time: Date;
  update_time: Date;
}

export interface CategoryType {
  category_id: number;
  category_name?: string;
  category_desc?: string;
  create_time?: Date;
  update_time?: Date;
}

export interface LoginType {
  username: string,
  password: string
}

export interface LinkType {
  link_id?: number;
  link_icon: string;
  link_name: string;
  link_desc: string;
  link_url: string;
  jump_id: number;
  link_priority: number;
  create_time?: number;
  update_time?: number;
}

export interface jumpType {
  jump_id?: number;
  jump_tag: string;
  jump_desc: string;
  jump_priority: number;
  create_time?: number;
  update_time?: number;
}

export enum RenderType {
  SVGRenderer = 'SVGRenderer',
  CanvasRenderer = 'CanvasRenderer'
}
export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
  Default = 'default'
}
export interface Page {
  pageSize: number;
  pageNo: number;
}

export interface TagListParams extends Page {
  tag_name: string;
}

export interface CategoryListParams extends Page {
  category_name: string;
}