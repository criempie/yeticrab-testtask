export interface Item {
  companyName: string;
  fullName: string;
  phoneNumber: string;
  comments: string;
  atiCode: number;
}
export interface ItemProcessed extends Item {
  id: number;
  requestNumber: number;
  receiveTime: string;
}
