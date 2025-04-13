# 📁 FileStorage System

Este é um projeto desenvolvido exclusivamente para fins de estudo, com o objetivo de explorar uma arquitetura moderna de armazenamento de arquivos utilizando tecnologias amplamente utilizadas no mercado.

O sistema conta com frontend em Next.js + Node, backend em Java Spring Boot, banco de dados PostgreSQL e MinIO como solução de armazenamento S3. Todos os serviços são containerizados com Docker Compose.

---

## 🧩 Tecnologias Utilizadas

- Backend: Java 21 + Spring Boot  
- Frontend: Next.js (Node.js)  
- Banco de dados: PostgreSQL  
- Armazenamento de arquivos: MinIO (compatível com Amazon S3)  
- Containerização: Docker & Docker Compose

---

## 🚀 Como executar o projeto

### 1. Pré-requisitos

- Docker  
- Docker Compose

---

### 2. Clone o repositório

```bash
git clone https://github.com/Lucashcr/filestorage.git  
cd filestorage
```

---

### 3. Suba todos os serviços com Docker Compose

```bash
docker-compose up --build
```

Isso irá inicializar:

- backend: aplicação Spring Boot na porta 8080  
- frontend: aplicação Next.js na porta 3000  
- postgres: banco de dados PostgreSQL na porta 5432  
- minio: serviço S3-like na porta 9000

---

### 4. Configure o domínio do bucket (se estiver usando localmente)

Devido à conexão da rede interna do Docker, provavelmente você terá problemas ao salvar, recuperar ou deletar arquivos já que o domínio configurado no backend é o interno da rede e as chamadas são feitas pelo frontend utilizando urls pré-assinadas. Para resolver isso, adicione o domínio `minio` redirecionando para o localhost.

Se você estiver utilizando Linux, basta adicionar a seguinte linha no arquivo `/etc/hosts`:

```
127.0.0.1  	minio
```

---

## 📂 Estrutura de Pastas

```
projeto/
├── backend/           → Código Java Spring Boot  
│   └── Dockerfile  
├── frontend/          → Código Next.js  
│   └── Dockerfile  
├── docker-compose.yml → Orquestra todos os serviços  
└── README.md
```

---

## 🔐 Acesso ao MinIO

- URL: http://localhost:9001  
- Usuário: admin  
- Senha: password

> Você pode alterar essas credenciais no docker-compose.yml se necessário.

---

## 👨‍💻 Contribuindo

Este projeto é apenas para estudos, mas sinta-se à vontade para sugerir melhorias ou abrir pull requests por diversão ou aprendizado!

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
