# 📊 Fintech - Gestão Financeira Pessoal

## 📝 Sobre o Projeto
Este é um projeto *full-stack* de gestão financeira, desenvolvido como entrega final para a consolidação de conhecimentos em desenvolvimento web e arquitetura de sistemas. A aplicação permite o registo de utilizadores, o controlo detalhado de gastos e receitas, e a categorização de transações financeiras.

O sistema foi desenhado com uma arquitetura de microsserviços simulada através de uma API REST no backend e uma interface reativa no frontend, garantindo uma comunicação fluida e segura com uma base de dados relacional.

## 🚀 Tecnologias Utilizadas

### Backend
* **Java**
* **Spring Boot**
* **Spring Data JPA / Hibernate** (Mapeamento Objeto-Relacional)
* **Oracle SQL** 

### Frontend
* **ReactJS**
* **React Router DOM** (Navegação SPA)
* **React Hooks** (Gestão de estado e ciclo de vida)

## ⚙️ Arquitetura e Funcionalidades

**Backend:**
- [x] **API RESTful:** *Endpoints* implementados com verbos HTTP corretos (GET, POST, PUT, DELETE) e *status codes* padronizados.
- [x] **Arquitetura em Camadas:** Código rigorosamente estruturado em `Model` (Entidades), `Repository` (Persistência), `Service` (Regras de Negócio) e `Controller` (Rotas).
- [x] **Modelagem de Dados Avançada:** Estrutura relacional contemplando entidades fundamentais (`Utilizador`, `Gasto`, `Categoria`, `Receita`) com as respetivas restrições de chaves estrangeiras.

**Frontend:**
- [x] **Single Page Application (SPA):** Navegação ágil sem recarregamento de página.
- [x] **Gestão de Sessão:** Ecrã de autenticação e login de utilizadores.
- [x] **Operações CRUD UI:** Ecrãs e formulários dedicados para consulta, inserção, atualização e remoção de dados consumindo a API.
- [x] **Tratamento de Exceções Visuais:** Página inicial intuitiva e ecrã de erro (404) personalizado.

## 🗄️ Base de Dados e Modelagem
A documentação da base de dados, incluindo o diagrama lógico/relacional e o script `DDL` para a criação das tabelas no Oracle, encontra-se armazenada na pasta `/database` deste repositório.

---
*Desenvolvido por Lucas de Moraes*
