export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'user' | 'guarantor';
  reputation: number;
  escrowBalance: number;
}

export interface Offer {
  id: string;
  type: 'buy' | 'sell' | 'swap';
  title: string;
  description: string;
  price: number;
  tags: string[];
  status: 'active' | 'closed';
  authorId: string;
  createdAt: string;
}

export interface Deal {
  id: string;
  offerId: string;
  sellerId: string;
  buyerId: string;
  guarantorId: string;
  escrowAmount: number;
  status: 'draft' | 'escrowed' | 'in_progress' | 'delivered' | 'confirmed' | 'disputed' | 'resolved';
  createdAt: string;
}

export type ChatMessage = {
  id: string;
  dealId?: string;
  offerId?: string;
  authorId: string;
  content: string;
  type: 'text' | 'system' | 'action';
  timestamp: string;
};
