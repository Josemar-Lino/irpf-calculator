import { Employee } from '../types/employee';

export const mockEmployees: Omit<Employee, 'id' | 'irrfBaseSalary' | 'irrfDiscount'>[] = [
    {
        name: 'João Silva',
        cpf: '123.456.789-00',
        grossSalary: 5000,
        socialSecurityDiscount: 550,
        dependents: 2,
    },
    {
        name: 'Maria Santos',
        cpf: '987.654.321-00',
        grossSalary: 3000,
        socialSecurityDiscount: 330,
        dependents: 1,
    },
    {
        name: 'Pedro Oliveira',
        cpf: '456.789.123-00',
        grossSalary: 8000,
        socialSecurityDiscount: 880,
        dependents: 3,
    },
    {
        name: 'Ana Costa',
        cpf: '789.123.456-00',
        grossSalary: 2500,
        socialSecurityDiscount: 275,
        dependents: 0,
    },
    {
        name: 'Carlos Souza',
        cpf: '321.654.987-00',
        grossSalary: 6000,
        socialSecurityDiscount: 660,
        dependents: 2,
    },
]; 