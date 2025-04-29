import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, calculateIRRFBaseSalary, calculateIRRFDiscount } from '../types/employee';
import { mockEmployees } from '../data/mockEmployees';

interface EmployeeState {
    employees: Employee[];
    filter: {
        name: string;
        cpf: string;
    };
}

const initialState: EmployeeState = {
    employees: mockEmployees.map(employee => ({
        ...employee,
        id: Date.now().toString() + Math.random(),
        irrfBaseSalary: calculateIRRFBaseSalary(
            employee.grossSalary,
            employee.socialSecurityDiscount,
            employee.dependents
        ),
        irrfDiscount: calculateIRRFDiscount(
            calculateIRRFBaseSalary(
                employee.grossSalary,
                employee.socialSecurityDiscount,
                employee.dependents
            )
        ),
    })),
    filter: {
        name: '',
        cpf: '',
    },
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<Omit<Employee, 'id' | 'irrfBaseSalary' | 'irrfDiscount'>>) => {
            const newEmployee: Employee = {
                ...action.payload,
                id: Date.now().toString(),
                irrfBaseSalary: calculateIRRFBaseSalary(
                    action.payload.grossSalary,
                    action.payload.socialSecurityDiscount,
                    action.payload.dependents
                ),
                irrfDiscount: calculateIRRFDiscount(
                    calculateIRRFBaseSalary(
                        action.payload.grossSalary,
                        action.payload.socialSecurityDiscount,
                        action.payload.dependents
                    )
                ),
            };
            state.employees.push(newEmployee);
        },
        updateEmployee: (state, action: PayloadAction<Employee>) => {
            const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
            if (index !== -1) {
                state.employees[index] = {
                    ...action.payload,
                    irrfBaseSalary: calculateIRRFBaseSalary(
                        action.payload.grossSalary,
                        action.payload.socialSecurityDiscount,
                        action.payload.dependents
                    ),
                    irrfDiscount: calculateIRRFDiscount(
                        calculateIRRFBaseSalary(
                            action.payload.grossSalary,
                            action.payload.socialSecurityDiscount,
                            action.payload.dependents
                        )
                    ),
                };
            }
        },
        deleteEmployee: (state, action: PayloadAction<string>) => {
            state.employees = state.employees.filter((emp) => emp.id !== action.payload);
        },
        setFilter: (state, action: PayloadAction<{ name: string; cpf: string }>) => {
            state.filter = action.payload;
        },
        importEmployees: (state, action: PayloadAction<Omit<Employee, 'id' | 'irrfBaseSalary' | 'irrfDiscount'>[]>) => {
            const newEmployees = action.payload.map(employee => ({
                ...employee,
                id: Date.now().toString() + Math.random(),
                irrfBaseSalary: calculateIRRFBaseSalary(
                    employee.grossSalary,
                    employee.socialSecurityDiscount,
                    employee.dependents
                ),
                irrfDiscount: calculateIRRFDiscount(
                    calculateIRRFBaseSalary(
                        employee.grossSalary,
                        employee.socialSecurityDiscount,
                        employee.dependents
                    )
                ),
            }));
            state.employees = [...state.employees, ...newEmployees];
        },
    },
});

export const { addEmployee, updateEmployee, deleteEmployee, setFilter, importEmployees } = employeeSlice.actions;
export default employeeSlice.reducer; 