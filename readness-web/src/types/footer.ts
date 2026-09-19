export interface FooterLink {
  url: string;
  label: string;
}

export interface FooterColumn {
  id?: number;
  title: string;
  links: FooterLink[];
}
