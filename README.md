# 🧮 IRPF Calculator - Gerenciador de Funcionários

Aplicação web desenvolvida em **React + TypeScript + Redux**, com o objetivo de gerenciar funcionários e calcular automaticamente o **IRRF (Imposto de Renda Retido na Fonte)** com base no salário bruto, número de dependentes e desconto do INSS.

---

## ⚙️ Funcionalidades

- ✅ Cadastro de funcionários
- ✅ Edição e exclusão
- ✅ Cálculo automático de IRRF
- ✅ Armazenamento dos dados com Redux
- ✅ Interface moderna com Material UI
- ✅ Carregamento inicial de dados via `employees.json`
- ✅ Carregamento de dados via Botão através de um arquivo .json


---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/)

---

## 📂 Estrutura de Diretórios
src/ ├── components/ # Componentes como Formulário e Lista de Funcionários ├── store/ # Redux (slice + store) ├── types/ # Tipagens TS para os dados ├── data/ # (Opcional) mocks └── App.tsx # Componente principal


---

## ▶️ Como Executar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/Josemar-Lino/irpf-calculator.git
cd irpf-calculator
2. Instale as dependências
bash
Copiar
Editar
npm install
3. Execute o projeto
bash
Copiar
Editar
npm run dev
Abra no navegador: http://localhost:5173

📥 Dados de Funcionários via JSON
Você pode adicionar um arquivo employees.json na pasta public/ com dados de funcionários para carregamento automático:
Exemplo (public/employees.json):

[
  {
    "nome": "Letícia Aurora Farias",
    "cpf": "936.938.039-60",
    "salario": 998,
    "desconto": 74.85,
    "dependentes": 2
  },
  {
    "nome": "Edson Thiago Drumond",
    "cpf": "748.517.476-24",
    "salario": 1045,
    "desconto": 78.38,
    "dependentes": 1
  },
  {
    "nome": "Fátima Elza Tereza Castro",
    "cpf": "701.118.872-08",
    "salario": 5500,
    "desconto": 628.95,
    "dependentes": 0
  },
  {
    "nome": "Sandra Giovanna Drumond",
    "cpf": "715.890.756-25",
    "salario": 4522,
    "desconto": 492.03,
    "dependentes": 3
  },
  {
    "nome": "Valentina Clara Nunes",
    "cpf": "101.151.404-41",
    "salario": 10000,
    "desconto": 713.1,
    "dependentes": 4
  }
]


📄 Licença
Este projeto está sob licença MIT.

👤 Autor
Desenvolvido por Josemar Lino
GitHub: @Josemar Lino
LinkedIn: linkedin.com/in/josêmarlino



