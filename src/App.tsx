import React from "react";
import CompaniesTable from "./components/Companies/CompaniesTable";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchCompanies, setCompanies } from "./redux/slices/companiesSlice";
import EmployeesTable from "./components/Employees/EmployeesTable";
import * as S from "./app.styles";
import CompanyForm from "./components/Companies/CompanyForm";
import EmployeeForm from "./components/Employees/EmployeeForm";

function App() {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [total, setTotal] = React.useState<number>(0);

  const limit = 10;

  const url = "http://localhost:3000/companies";

  const { companies, error, selectedCompanies } = useAppSelector(
    (state) => state.companiesReducer
  );

  React.useEffect(() => {
    const fetchTotal = async () => {
      const { data } = await axios.get("http://localhost:3000/paging");
      setTotal(data.total);
    };
    fetchTotal();
  }, []);
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

  const handleDelete = () => {
    dispatch(
      setCompanies(
        companies.filter((item) => !selectedCompanies.includes(item.id))
      )
    );
    selectedCompanies.map((item) => axios.delete(`${url}/${item}`));
  };

  return (
    <S.Wrapper>
      <CompaniesTable
        companies={companies}
        error={error}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        hasNextPage={hasNextPage}
      />

      <CompanyForm url={url} />

      <button onClick={() => handleDelete()}>Удалить компании</button>

      {selectedCompanies.length === 1 &&
        companies[selectedCompanies[0]].employees.length && (
          <EmployeesTable
            employees={companies[selectedCompanies[0]].employees}
          />
        )}
    </S.Wrapper>
  );
}
export default App;
