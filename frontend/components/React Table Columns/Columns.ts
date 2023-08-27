const Department = [
  {
    Header: "id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
];
const TASKS = [
  {
    Header: "id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "fk_department",
    accessor: "fk_department",
  },
  {
    Header: "Department",
    accessor: "Depname",
  },
];

export { Department, TASKS };
