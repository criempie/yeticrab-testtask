export class CreateItemDto {
  companyName: string;
  fullName: string;
  phoneNumber: string;
  comments: string;
  atiCode: number;
}

export const CreateItemValidation = {
  companyName: null,
  fullName: null,
  phoneNumber: null,
  comments: null,
  atiCode: null,
};
