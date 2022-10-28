import React from "react";
import { Employee } from "../../shared/companies/types";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { addEmployee } from "../../redux/slices/employeesSlice";
import * as S from "../forms.styles";

type Props = {
  url: string;
};

const EmployeeForm = ({ url }: Props) => {
  const dispatch = useAppDispatch();
  const selectedCompanies = useAppSelector(
    (state) => state.companiesReducer.selectedCompanies
  );
  const employees = useAppSelector((state) => state.employeesReducer.employees);
  const [newEmployeeData, setNewEmployeeData] = React.useState<Employee>({
    id: employees[employees.length - 1].id + 1,
    name: "",
    secondName: "",
    post: "",
    companyId: selectedCompanies[0],
  });

  const [name, setName] = React.useState<string>("");
  const [secondName, setSecondName] = React.useState<string>("");
  const [post, setPost] = React.useState<string>("");

  const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNewEmployeeData({ ...newEmployeeData, name: event.target.value });
  };

  const handleSetSecondName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondName(event.target.value);
    setNewEmployeeData({ ...newEmployeeData, secondName: event.target.value });
  };

  const handleSetPost = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(event.target.value);
    setNewEmployeeData({ ...newEmployeeData, post: event.target.value });
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setNewEmployeeData({
      ...newEmployeeData,
      id: newEmployeeData.id + 1,
    });
    console.log(newEmployeeData.id);
    dispatch(addEmployee({ url: url, item: newEmployeeData }));
  };

  return (
    <S.Form>
      <S.Label>Добавить нового работника</S.Label>
      <S.Input
        type="text"
        name="name"
        value={name}
        placeholder="Введите имя работника"
        onChange={(event) => handleSetName(event)}
      />
      <S.Input
        type="text"
        name="secondName"
        value={secondName}
        placeholder="Введите фамилию работника"
        onChange={(event) => handleSetSecondName(event)}
      />
      <S.Input
        type="text"
        name="post"
        value={post}
        placeholder="Введите должность работника"
        onChange={(event) => handleSetPost(event)}
      />
      <S.Button
        type="submit"
        onClick={(event) => handleSubmit(event)}
        disabled={
          name.length && secondName.length && post.length ? false : true
        }
      >
        Добавить
      </S.Button>
    </S.Form>
  );
};

export default EmployeeForm;
