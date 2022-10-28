import React from "react";
import CompaniesTable from "./components/Companies/CompaniesTable";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  fetchEmployees,
  deleteEmployee,
  setSelectedEmployees,
} from "./redux/slices/employeesSlice";
import {
  deleteCompany,
  setSelectedCompanies,
} from "./redux/slices/companiesSlice";
import { setTotal } from "./redux/slices/pagingSlice";
import EmployeesTable from "./components/Employees/EmployeesTable";
import * as S from "./app.styles";
import CompanyForm from "./components/Companies/CompanyForm";
import EmployeeForm from "./components/Employees/EmployeeForm";

function App() {
  const dispatch = useAppDispatch();

  const total = useAppSelector((state) => state.pagingReducer.total);

  const url = "http://localhost:3000";

  const { selectedCompanies } = useAppSelector(
    (state) => state.companiesReducer
  );

  const { employees, selectedEmployees } = useAppSelector(
    (state) => state.employeesReducer
  );

  const handleDeleteCompanies = () => {
    selectedCompanies.length &&
      selectedCompanies.forEach((item) => {
        dispatch(deleteCompany({ url: `${url}/companies`, id: item }));
      });
    dispatch(
      setTotal({
        url: "http://localhost:3000/paging",
        value: { total: total - selectedCompanies.length },
      })
    );
    dispatch(setSelectedCompanies([]));
  };

  const handleDeleteEmployees = () => {
    selectedEmployees.length &&
      selectedEmployees.forEach((item) => {
        dispatch(deleteEmployee({ url: `${url}/employees`, id: item }));
      });
    dispatch(setSelectedEmployees([]));
  };

  React.useEffect(() => {
    dispatch(fetchEmployees({ url: `${url}/employees` }));
  }, [dispatch]);

  return (
    <S.Wrapper>
      <CompaniesTable url={`${url}/companies`} />
      <button onClick={handleDeleteCompanies}>
        Удалить выбранные компании
      </button>

      <CompanyForm url={`${url}/companies`} />

      {selectedCompanies.length === 1 &&
      employees.filter((item) => item.companyId === selectedCompanies[0])
        .length ? (
        <EmployeesTable selectedCompany={selectedCompanies[0]} />
      ) : (
        ""
      )}

      {selectedCompanies.length === 1 ? (
        <EmployeeForm url={`${url}/employees`} />
      ) : (
        ""
      )}

      {selectedCompanies.length === 1 ? (
        <button onClick={handleDeleteEmployees}>
          Удалить выбранных сотрудников
        </button>
      ) : (
        ""
      )}
    </S.Wrapper>
  );
}
export default App;
