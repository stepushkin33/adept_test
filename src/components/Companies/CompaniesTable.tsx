import React from "react";
import { Company } from "../../shared/companies/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedCompanies } from "../../redux/slices/companiesSlice";
import { useIntersectionObserver } from "../../shared/hooks/useIntersectionObserver";
import * as S from "../tables.styles";

type Props = {
  companies: Company[];
  error: string | undefined;
  hasNextPage: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const CompaniesTable = ({
  companies,
  error,
  hasNextPage,
  currentPage,
  setCurrentPage,
}: Props) => {
  const dispatch = useAppDispatch();
  const selectedCompanies = useAppSelector(
    (state) => state.companiesReducer.selectedCompanies
  );
  const [selectAll, setSelectAll] = React.useState<boolean>(false);

  React.useEffect(() => {
    selectAll
      ? dispatch(setSelectedCompanies(companies.map((item) => item.id)))
      : dispatch(setSelectedCompanies([]));
  }, [companies, dispatch, selectAll]);

  const changeCheckboxes = (id: number) => {
    dispatch(
      setSelectedCompanies(
        selectedCompanies.includes(id)
          ? selectedCompanies.filter((item) => item !== id)
          : [...selectedCompanies, id]
      )
    );
  };

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
                onChange={() => setSelectAll(!selectAll)}
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
                <S.Tr $active={selectedCompanies.includes(item.id)} key={i}>
                  <S.Td>
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(item.id)}
                      onChange={() => changeCheckboxes(item.id)}
                    />
                  </S.Td>
                  <S.Td>{item.name}</S.Td>
                  <S.Td>{item.employees.length}</S.Td>
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
