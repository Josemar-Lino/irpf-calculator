# Sistema de Gerenciamento de Funcionários

Este é um sistema de gerenciamento de funcionários desenvolvido com React, TypeScript e Redux Toolkit.

## Funcionalidades

- Cadastro de novos funcionários
- Atualização de funcionários existentes
- Exclusão de funcionários
- Listagem de funcionários com cálculo automático de IRRF
- Filtragem por nome e CPF

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Acesse a aplicação em `http://localhost:5173`

## Tecnologias Utilizadas

- React
- TypeScript
- Redux Toolkit
- Material-UI
- Vite

## Estrutura do Projeto

- `src/types/employee.ts`: Definição dos tipos e funções de cálculo do IRRF
- `src/store/`: Configuração do Redux e slice de funcionários
- `src/components/`: Componentes React
  - `EmployeeForm.tsx`: Formulário de cadastro/edição
  - `EmployeeList.tsx`: Lista de funcionários com filtros

## Cálculo do IRRF

O sistema calcula automaticamente:
- Salário Base IR = Salário bruto - Desconto da Previdência - (Dedução por Dependente × Quantidade de Dependentes)
- Desconto IRRF = Salário Base IR × Alíquota - Parcela a Deduzir

A tabela progressiva do IRRF é aplicada conforme a legislação vigente.
