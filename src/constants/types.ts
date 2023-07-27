
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
export interface tagType {
    tag_id: number;
    tag_name: string;
    tag_desc: string;
    create_time: Date;
    update_time: Date;
}