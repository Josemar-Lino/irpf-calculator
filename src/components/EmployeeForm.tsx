import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Typography, useTheme, useMediaQuery, Paper, alpha } from '@mui/material';
import { Employee } from '../types/employee';
import { addEmployee, updateEmployee } from '../store/employeeSlice';

interface EmployeeFormProps {
    employee?: Employee;
    onClose: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onClose }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [formData, setFormData] = useState<Omit<Employee, 'id' | 'irrfBaseSalary' | 'irrfDiscount'>>({
        name: '',
        cpf: '',
        grossSalary: 0,
        socialSecurityDiscount: 0,
        dependents: 0,
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name,
                cpf: employee.cpf,
                grossSalary: employee.grossSalary,
                socialSecurityDiscount: employee.socialSecurityDiscount,
                dependents: employee.dependents,
            });
        }
    }, [employee]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (employee) {
            dispatch(updateEmployee({ ...formData, id: employee.id }));
        } else {
            dispatch(addEmployee(formData));
        }
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: ['grossSalary', 'socialSecurityDiscount', 'dependents'].includes(name)
            ? parseFloat(value) || 0
            : value,
        }));
    };

    return (
        <Paper 
            elevation={3}
            sx={{ 
                maxWidth: { xs: '100%', sm: 500 },
                mx: 'auto',
                p: { xs: 2, sm: 3 },
                width: '100%',
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
            }}
        >
            <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    mb: 3,
                    textAlign: 'center'
                }}
            >
                {employee ? 'Editar Funcionário' : 'Novo Funcionário'}
            </Typography>
            <Box 
                component="form" 
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <TextField
                    fullWidth
                    label="Nome"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    size={isMobile ? "small" : "medium"}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="CPF"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                    size={isMobile ? "small" : "medium"}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Salário Bruto"
                    name="grossSalary"
                    type="number"
                    value={formData.grossSalary}
                    onChange={handleChange}
                    required
                    size={isMobile ? "small" : "medium"}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Desconto da Previdência"
                    name="socialSecurityDiscount"
                    type="number"
                    value={formData.socialSecurityDiscount}
                    onChange={handleChange}
                    required
                    size={isMobile ? "small" : "medium"}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Número de Dependentes"
                    name="dependents"
                    type="number"
                    value={formData.dependents}
                    onChange={handleChange}
                    required
                    size={isMobile ? "small" : "medium"}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                        },
                    }}
                />
                <Box sx={{ 
                    mt: 3, 
                    display: 'flex', 
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' }
                }}>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        fullWidth={isMobile}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            py: 1.5,
                            boxShadow: theme.shadows[2],
                            '&:hover': {
                                boxShadow: theme.shadows[4],
                            }
                        }}
                    >
                        {employee ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                    <Button 
                        variant="outlined" 
                        onClick={onClose}
                        fullWidth={isMobile}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            py: 1.5,
                        }}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default EmployeeForm; 