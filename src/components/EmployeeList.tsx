import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    Box,
    Typography,
    Button,
    Stack,
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
    Grid,
    alpha,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Upload as UploadIcon } from '@mui/icons-material';
import { Employee } from '../types/employee';
import { RootState } from '../store';
import { deleteEmployee, setFilter, importEmployees } from '../store/employeeSlice';

interface EmployeeListProps {
    onEdit: (employee: Employee) => void;
    onAdd: () => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onEdit, onAdd }) => {
    const dispatch = useDispatch();
    const { employees, filter } = useSelector((state: RootState) => state.employees);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setFilter({ ...filter, [name]: value }));
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const jsonData = JSON.parse(event.target?.result as string);
                    if (Array.isArray(jsonData)) {
                        dispatch(importEmployees(jsonData));
                    } else {
                        alert('O arquivo JSON deve conter um array de funcionários');
                    }
                } catch (error) {
                    alert('Erro ao ler o arquivo JSON. Certifique-se de que o formato está correto.');
                }
            };
            reader.readAsText(file);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const filteredEmployees = employees.filter((employee) => {
        const nameMatch = employee.name.toLowerCase().includes(filter.name.toLowerCase());
        const cpfMatch = employee.cpf.includes(filter.cpf);
        return nameMatch && cpfMatch;
    });

    const renderMobileView = () => (
        <Grid container spacing={2}>
            {filteredEmployees.map((employee) => (
                <Grid key={employee.id} xs={12}>
                    <Card 
                        sx={{ 
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: theme.shadows[4],
                            }
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
                                {employee.name}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                CPF: {employee.cpf}
                            </Typography>
                            <Box sx={{ 
                                display: 'grid', 
                                gridTemplateColumns: '1fr 1fr',
                                gap: 1,
                                mb: 2
                            }}>
                                <Typography>
                                    <strong>Salário Bruto:</strong><br />
                                    R$ {employee.grossSalary.toFixed(2)}
                                </Typography>
                                <Typography>
                                    <strong>Desconto Previdência:</strong><br />
                                    R$ {employee.socialSecurityDiscount.toFixed(2)}
                                </Typography>
                                <Typography>
                                    <strong>Dependentes:</strong><br />
                                    {employee.dependents}
                                </Typography>
                                <Typography>
                                    <strong>Base IR:</strong><br />
                                    R$ {employee.irrfBaseSalary?.toFixed(2)}
                                </Typography>
                            </Box>
                            <Typography sx={{ 
                                color: theme.palette.error.main,
                                fontWeight: 'bold',
                                mb: 2
                            }}>
                                Desconto IRRF: R$ {employee.irrfDiscount?.toFixed(2)}
                            </Typography>
                            <Box sx={{ 
                                mt: 2, 
                                display: 'flex', 
                                gap: 1,
                                justifyContent: 'flex-end'
                            }}>
                                <IconButton 
                                    onClick={() => onEdit(employee)} 
                                    color="primary"
                                    sx={{
                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                        }
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => dispatch(deleteEmployee(employee.id))}
                                    color="error"
                                    sx={{
                                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.error.main, 0.2),
                                        }
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    const renderDesktopView = () => (
        <TableContainer 
            component={Paper}
            sx={{
                boxShadow: theme.shadows[2],
                borderRadius: 2,
                '& .MuiTableHead-root': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
                '& .MuiTableCell-head': {
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                },
                '& .MuiTableRow-root:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                }
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>CPF</TableCell>
                        <TableCell>Salário Bruto</TableCell>
                        <TableCell>Desconto Previdência</TableCell>
                        <TableCell>Dependentes</TableCell>
                        <TableCell>Base IR</TableCell>
                        <TableCell>Desconto IRRF</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.cpf}</TableCell>
                            <TableCell>R$ {employee.grossSalary.toFixed(2)}</TableCell>
                            <TableCell>R$ {employee.socialSecurityDiscount.toFixed(2)}</TableCell>
                            <TableCell>{employee.dependents}</TableCell>
                            <TableCell>R$ {employee.irrfBaseSalary?.toFixed(2)}</TableCell>
                            <TableCell sx={{ color: theme.palette.error.main }}>
                                R$ {employee.irrfDiscount?.toFixed(2)}
                            </TableCell>
                            <TableCell>
                                <IconButton 
                                    onClick={() => onEdit(employee)} 
                                    color="primary"
                                    sx={{
                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                        }
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => dispatch(deleteEmployee(employee.id))}
                                    color="error"
                                    sx={{
                                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.error.main, 0.2),
                                        }
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Box sx={{ p: { xs: 1, sm: 2 } }}>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between', 
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: 2,
                mb: 2,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                p: 2,
                borderRadius: 2,
            }}>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                    Lista de Funcionários
                </Typography>
                <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={2}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    <input
                        type="file"
                        accept=".json"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<UploadIcon />}
                        onClick={handleImportClick}
                        fullWidth={isMobile}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        Importar JSON
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                        fullWidth={isMobile}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            boxShadow: theme.shadows[2],
                            '&:hover': {
                                boxShadow: theme.shadows[4],
                            }
                        }}
                    >
                        Novo Funcionário
                    </Button>
                </Stack>
            </Box>
            <Box sx={{ 
                mb: 2, 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                p: 2,
                borderRadius: 2,
            }}>
                <TextField
                    label="Filtrar por Nome"
                    name="name"
                    value={filter.name}
                    onChange={handleFilterChange}
                    size="small"
                    fullWidth={isMobile}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                        }
                    }}
                />
                <TextField
                    label="Filtrar por CPF"
                    name="cpf"
                    value={filter.cpf}
                    onChange={handleFilterChange}
                    size="small"
                    fullWidth={isMobile}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                        }
                    }}
                />
            </Box>
            {isMobile ? renderMobileView() : renderDesktopView()}
        </Box>
    );
};

export default EmployeeList; 