module.exports = () => {
  const data = {
    companies: [],
    employees: [],
    paging: {
      total: 50,
    },
  };
  for (let i = 0; i < data.paging.total; i++) {
    data.companies.push({
      id: i,
      name: `Company ${i}`,
      address: `Address ${i}`,
    });
  }
  for (let i = 0; i < Math.random() * 10000; i++) {
    data.employees.push({
      name: `employee ${i}`,
      secondName: `secondName ${i}`,
      post: `developer`,
      companyId: Math.floor(0 + Math.random() * (data.paging.total + 1)),
      id: i,
    });
  }
  return data;
};
