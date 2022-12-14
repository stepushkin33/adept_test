export type Employee = {
  id: number;
  name: string;
  secondName: string;
  post: string;
  companyId: number;
};

export type Company = {
  id: number;
  name: string;
  address: string;
};

export type Paging = {
  total: number;
};
