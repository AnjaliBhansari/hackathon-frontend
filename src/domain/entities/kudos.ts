export interface Kudos {
  receiver: any;
  id: string;
  recipientName: string;
  teamName: string;
  category: string;
  message: string;
  templateId: string;
  createdAt: Date;
  createdBy: string;
}

export interface CreateKudosDTO {
  recipientName: string;
  teamName: string;
  category: string;
  message: string;
  templateId: string;
}

export interface KudosTemplate {
  id: string;
  name: string;
  description: string;
  className: string;
  previewContent?: string;
}
