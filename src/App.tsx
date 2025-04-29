import React, { useState, useRef, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { store } from './store';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import { Employee } from './types/employee';
import { importEmployees } from './store/employeeSlice';

const theme = createTheme();

const defaultEmployees = [
  {
    nome: "Letícia Aurora Farias",
    cpf: "936.938.039-60",
    salario: 998,
    desconto: 74.85,
    dependentes: 2
  },
  {
    nome: "Edson Thiago Drumond",
    cpf: "748.517.476-24",
    salario: 1045,
    desconto: 78.38,
    dependentes: 1
  },
  {
    nome: "Fátima Elza Tereza Castro",
    cpf: "701.118.872-08",
    salario: 5500,
    desconto: 628.95,
    dependentes: 0
  },
  {
    nome: "Sandra Giovanna Drumond",
    cpf: "715.890.756-25",
    salario: 4522,
    desconto: 492.03,
    dependentes: 3
  },
  {
    nome: "Valentina Clara Nunes",
    cpf: "101.151.404-41",
    salario: 10000,
    desconto: 713.1,
    dependentes: 4
  }
];

const AppContent: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Convert the default employees to match the expected format
    const formattedEmployees = defaultEmployees.map(emp => ({
      name: emp.nome,
      cpf: emp.cpf,
      grossSalary: emp.salario,
      socialSecurityDiscount: emp.desconto,
      dependents: emp.dependentes
    }));
    
    dispatch(importEmployees(formattedEmployees));
  }, [dispatch]);

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAdd = () => {
    setSelectedEmployee(undefined);
    setIsFormOpen(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCloseForm = () => {
    setSelectedEmployee(undefined);
    setIsFormOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <EmployeeList onEdit={handleEdit} onAdd={handleAdd} />
        {isFormOpen && (
          <div ref={formRef}>
            <EmployeeForm employee={selectedEmployee} onClose={handleCloseForm} />
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
