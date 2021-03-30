export interface ListContent {
  id: string;
  title: string;
  format: string;
  pageCount: number;
  thumbnail_path: string;
  condition: string;
  price: number;
  description: string;
  userId: string;
  createdAt: Date;
  createdByName: string;
  createdById: string;
  enableEdit: boolean;
  enableRemove: boolean;
  enableMove: boolean;
  enableBuy: boolean;
  enableDetails: boolean;
  enableFavorite: boolean;
  creditCardNumber?: string;
  creditCardValidate?: string;
  creditCardSecret?: string;
}
