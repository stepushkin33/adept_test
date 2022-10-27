import React from "react";
import { Employee } from "../../shared/companies/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedEmployees } from "../../redux/slices/companiesSlice";
import { useIntersectionObserver } from "../../shared/hooks/useIntersectionObserver";
import * as S from "../tables.styles";

type Props = {
  employees: Employee[];
};

const EmployeesTable = ({ employees }: Props) => {
  const [employeesList, setEmployeesList] = React.useState<Employee[]>([]);
  const [offset, setOffset] = React.useState<number>(1);
  const total = employees.length;
  const limit = 10;
  const hasNextPage = total <= limit + offset;
  const dispatch = useAppDispatch();
  const selectedEmployees = useAppSelector(
    (state) => state.companiesReducer.selectedEmployees
  );
  const [selectAll, setSelectAll] = React.useState<boolean>(false);

  React.useEffect(() => {
    setEmployeesList(employees.slice(offset, offset + limit));
  }, [employees, offset]);

  React.useEffect(() => {
    selectAll
      ? dispatch(setSelectedEmployees(employees.map((item) => item.id)))
      : dispatch(setSelectedEmployees([]));
  }, [dispatch, employees, selectAll]);

  const changeCheckboxes = (id: number) => {
    dispatch(
      setSelectedEmployees(
        selectedEmployees.includes(id)
          ? selectedEmployees.filter((item) => item !== id)
          : [...selectedEmployees, id]
      )
    );
  };

  const cb: IntersectionObserverCallback = React.useCallback(
    ([entry]) => {
      if (hasNextPage && entry.isIntersecting) {
        setOffset(offset + limit);
      }
    },
    [hasNextPage, offset]
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
                onChange={() => setSelectAll(!selectAll)}
              />
            </S.Td>
            <S.Td>Имя</S.Td>
            <S.Td>Фамилия</S.Td>
            <S.Td>Должность</S.Td>
          </tr>
        </thead>
        <tbody>
          {employeesList &&
            employeesList.map((item, i) => {
              return (
                <tr key={i}>
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
                </tr>
              );
            })}
        </tbody>
      </S.Table>
    </>
  );
};

export default EmployeesTable;
