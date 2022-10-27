export type Employee = {
  id: number;
  name: string;
  secondName: string;
  post: string;
};

export type Company = {
  id: number;
  name: string;
  address: string;
  employees: Employee[];
};
