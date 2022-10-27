import React from "react";
import { Company } from "../../shared/companies/types";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { addCompany } from "../../redux/slices/companiesSlice";
import * as S from "../forms.styles";

type Props = {
  url: string;
};

const CompanyForm = ({ url }: Props) => {
  const dispatch = useAppDispatch();

  const companies = useAppSelector((state) => state.companiesReducer.companies);
  const [newCompanyData, setNewCompanyData] = React.useState<Company>({
    id: companies.length,
    name: "",
    address: "",
  });
  const [name, setName] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");

  const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNewCompanyData({ ...newCompanyData, name: event.target.value });
  };

  const handleSetAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    setNewCompanyData({ ...newCompanyData, address: event.target.value });
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    axios({
      method: "post",
      url: url,
      data: newCompanyData,
    });
    dispatch(addCompany(newCompanyData));
    setNewCompanyData({ ...newCompanyData, id: newCompanyData.id + 1 });
  };

  return (
    <S.Form>
      <S.Label>Добавить новую компанию</S.Label>
      <S.Input
        type="text"
        name="name"
        value={name}
        placeholder="Введите название компании"
        onChange={(event) => handleSetName(event)}
      />
      <S.Input
        type="text"
        name="address"
        value={address}
        placeholder="Введите адрес компании"
        onChange={(event) => handleSetAddress(event)}
      />
      <S.Button
        type="submit"
        onClick={(event) => handleSubmit(event)}
        disabled={name.length && address.length ? false : true}
      >
        Добавить
      </S.Button>
    </S.Form>
  );
};

export default CompanyForm;
