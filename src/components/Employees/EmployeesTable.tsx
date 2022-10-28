import React from "react";
import { Employee } from "../../shared/companies/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedEmployees } from "../../redux/slices/employeesSlice";
import { useIntersectionObserver } from "../../shared/hooks/useIntersectionObserver";
import * as S from "../tables.styles";

type Props = {
  selectedCompany: number;
};

const EmployeesTable = ({ selectedCompany }: Props) => {
  const [employeesList, setEmployeesList] = React.useState<Employee[]>([]);
  const [selectAll, setSelectAll] = React.useState<boolean>(false);

  const employees = useAppSelector(
    (state) => state.employeesReducer.employees
  ).filter((employee) => employee.companyId === selectedCompany);

  const total = employees.length;
  const limit = 10;
  const [offset, setOffset] = React.useState<number>(0);
  const hasNextPage = total >= limit + offset;
  const dispatch = useAppDispatch();

  const selectedEmployees = useAppSelector(
    (state) => state.employeesReducer.selectedEmployees
  );

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      dispatch(setSelectedEmployees(employeesList.map((item) => item.id)));
    } else {
      dispatch(setSelectedEmployees([]));
      setSelectAll(false);
    }
  };

  const changeCheckboxes = (id: number) => {
    if (selectedEmployees.includes(id)) {
      dispatch(
        setSelectedEmployees(selectedEmployees.filter((item) => id !== item))
      );
      setSelectAll(false);
    } else {
      dispatch(setSelectedEmployees([...selectedEmployees, id]));
    }
  };

  React.useEffect(() => {
    !selectedEmployees.length && setSelectAll(false);
  }, [selectedEmployees.length]);

  const cb: IntersectionObserverCallback = React.useCallback(
    ([entry]) => {
      if (employees.length <= limit) {
        setEmployeesList(employees);
      } else if (hasNextPage && entry.isIntersecting) {
        setEmployeesList([
          ...employeesList,
          ...employees.slice(offset, offset + limit),
        ]);
        setOffset(offset + limit);
      }
    },
    [employees, employeesList, hasNextPage, offset]
  );

  const callbackRef = useIntersectionObserver(cb);

  return (
    <>
      <S.Table>
        <thead>
          <tr>
            <S.Td>
              <input
                type="checkbox"
                onChange={() => handleSelectAll()}
                checked={selectAll}
              />
            </S.Td>
            <S.Td>Имя</S.Td>
            <S.Td>Фамилия</S.Td>
            <S.Td>Должность</S.Td>
          </tr>
        </thead>
        <tbody>
          {employeesList.length
            ? employeesList.map((item, i) => {
                return (
                  <S.Tr $active={selectedEmployees.includes(item.id)} key={i}>
                    <S.Td>
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(item.id)}
                        onChange={() => changeCheckboxes(item.id)}
                      />
                    </S.Td>
                    <S.Td>{item.name}</S.Td>
                    <S.Td>{item.secondName}</S.Td>
                    <S.Td>{item.post}</S.Td>
                  </S.Tr>
                );
              })
            : undefined}
        </tbody>
      </S.Table>
      <div ref={callbackRef}></div>
    </>
  );
};

export default EmployeesTable;
