export class PatchItemDto {
  id: number;
  companyName?: string;
  fullName?: string;
  phoneNumber?: string;
  comments?: string;
  atiCode?: number;
}

export const ItemPropertiesRequired = {
  required: ['id'],
  optional: ['companyName', 'fullName', 'phoneNumber', 'comments', 'atiCode'],
};
