import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setSelectedCompanies,
  fetchCompanies,
} from "../../redux/slices/companiesSlice";
import { fetchTotal } from "../../redux/slices/pagingSlice";
import { useIntersectionObserver } from "../../shared/hooks/useIntersectionObserver";
import * as S from "../tables.styles";

type Props = {
  url: string;
};

const CompaniesTable = ({ url }: Props) => {
  const dispatch = useAppDispatch();

  const { selectedCompanies, companies, error } = useAppSelector(
    (state) => state.companiesReducer
  );
  const employees = useAppSelector((state) => state.employeesReducer.employees);

  const total = useAppSelector((state) => state.pagingReducer.total);

  const [selectAll, setSelectAll] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    dispatch(fetchTotal({ url: "http://localhost:3000/paging" }));
  }, [dispatch]);

  const limit = 10;
  const hasNextPage = total >= limit * currentPage;

  React.useEffect(() => {
    dispatch(
      fetchCompanies({
        url: "http://localhost:3000/companies",
        limit,
        page: currentPage,
      })
    );
  }, [currentPage, dispatch]);

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      dispatch(setSelectedCompanies(companies.map((item) => item.id)));
    } else {
      dispatch(setSelectedCompanies([]));
      setSelectAll(false);
    }
  };

  const changeCheckboxes = (id: number) => {
    if (selectedCompanies.includes(id)) {
      dispatch(
        setSelectedCompanies(selectedCompanies.filter((item) => id !== item))
      );
      setSelectAll(false);
    } else {
      dispatch(setSelectedCompanies([...selectedCompanies, id]));
    }
  };

  React.useEffect(() => {
    !selectedCompanies.length && setSelectAll(false);
  }, [selectedCompanies.length]);

  const cb: IntersectionObserverCallback = React.useCallback(
    ([entry]) => {
      if (!error && hasNextPage && entry.isIntersecting) {
        setCurrentPage(currentPage + 1);
      }
    },
    [currentPage, error, hasNextPage, setCurrentPage]
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
            <S.Td>Название компании</S.Td>
            <S.Td>Количество сотрудников</S.Td>
            <S.Td>Адрес</S.Td>
          </tr>
        </thead>
        <tbody>
          {companies &&
            companies.map((item, i) => {
              return (
                <S.Tr
                  $active={selectedCompanies.includes(item.id)}
                  key={item.id}
                >
                  <S.Td>
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(item.id)}
                      onChange={() => changeCheckboxes(item.id)}
                    />
                  </S.Td>
                  <S.Td>{item.name}</S.Td>
                  <S.Td>
                    {
                      employees.filter(
                        (employee) => employee.companyId === item.id
                      ).length
                    }
                  </S.Td>
                  <S.Td>{item.address}</S.Td>
                </S.Tr>
              );
            })}
        </tbody>
      </S.Table>
      <div ref={callbackRef}></div>
    </>
  );
};

export default CompaniesTable;
