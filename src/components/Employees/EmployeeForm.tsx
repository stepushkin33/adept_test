import React from "react";
import { Employee } from "../../shared/companies/types";
import axios from "axios";

type Props = {
  url: string;
};

const EmployeeForm = ({ url }: Props) => {
  const [newEmployeeData, setNewEmployeeData] = React.useState<Employee>({
    id: 0,
    name: "",
    secondName: "",
    post: "",
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
    setNewEmployeeData({ ...newEmployeeData, post: event.target.value });
  };

  const handleSetPost = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(event.target.value);
    setNewEmployeeData({ ...newEmployeeData, post: event.target.value });
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    axios({
      method: "post",
      url: url,
      data: newEmployeeData,
    });
  };

  return (
    <form>
      <label>Добавить новую компанию</label>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Введите имя работника"
        onChange={(event) => handleSetName(event)}
      />
      <input
        type="text"
        name="secondName"
        value={name}
        placeholder="Введите фамилию работника"
        onChange={(event) => handleSetSecondName(event)}
      />
      <input
        type="text"
        name="post"
        value={post}
        placeholder="Введите должность работника"
        onChange={(event) => handleSetPost(event)}
      />
      <button
        type="submit"
        onClick={(event) => handleSubmit(event)}
        disabled={
          name.length && secondName.length && post.length ? false : true
        }
      >
        Добавить
      </button>
    </form>
  );
};

export default EmployeeForm;
