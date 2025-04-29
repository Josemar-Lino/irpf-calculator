export interface Employee {
    id: string;
    name: string;
    cpf: string;
    grossSalary: number;
    socialSecurityDiscount: number;
    dependents: number;
    irrfBaseSalary?: number;
    irrfDiscount?: number;
}

export const IRRF_TABLE = [
    { min: 0, max: 2259.20, rate: 0, deduction: 0 },
    { min: 2259.21, max: 2826.65, rate: 0.075, deduction: 169.44 },
    { min: 2826.66, max: 3751.05, rate: 0.15, deduction: 381.44 },
    { min: 3751.06, max: 4664.68, rate: 0.225, deduction: 662.77 },
    { min: 4664.69, max: Infinity, rate: 0.275, deduction: 896.00 }
];

export const DEPENDENT_DEDUCTION = 189.59;

export const calculateIRRFBaseSalary = (
    grossSalary: number,
    socialSecurityDiscount: number,
    dependents: number
): number => {
    return grossSalary - socialSecurityDiscount - (DEPENDENT_DEDUCTION * dependents);
};

export const calculateIRRFDiscount = (baseSalary: number): number => {
    const bracket = IRRF_TABLE.find(
        (bracket) => baseSalary >= bracket.min && baseSalary <= bracket.max
    );

    if (!bracket) return 0;

    return baseSalary * bracket.rate - bracket.deduction;
}; 