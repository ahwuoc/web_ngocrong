export interface Account {
  id: number;
  username: string;
  email: string;
  password: string;
  create_time: string;
  is_admin: number;
  ban: number;
  active: number;
  danap: number;
  cash: number;
}

export interface Player {
  id: number;
  account_id: number;
  name: string;
  data_point: string | null;
  data_task: string | null;
  head: number | null;
  gender: number;
  created_at: string;
  updated_at: string | null;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  category_id: number;
  author_id: number;
  status: string;
  views: number;
  created_at: string;
  updated_at: string | null;
  published_at: string | null;
  category_name?: string;
  category_slug?: string;
  username?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  status: string;
  created_at: string;
}

export interface Slide {
  id: number;
  title: string;
  image: string;
  link: string | null;
  sort_order: number;
  status: string;
}

export interface Giftcode {
  id: number;
  code: string;
  count_left: number;
  detail: string | null;
  expired: string;
  datecreate: string;
}

export interface GiftcodeItem {
  temp_id: number;
  name: string;
  description: string;
  icon_id: string;
  quantity: number;
}

export interface LeaderboardEntry {
  player_name: string;
  danap: number;
  power?: number;
  task_id?: number;
  task_name?: string;
}
