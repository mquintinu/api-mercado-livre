# API Mercado Livre - Fullstack Project

Este projeto é uma aplicação fullstack que integra Node.js no back-end com Fastify e React no front-end, utilizando Material-UI (MUI) para o design da interface.

## Tecnologias Utilizadas

- **Node.js** com **Fastify** (Back-end)
- **React** com **Material-UI (MUI)** (Front-end)
- **Docker** para gerenciar os containers

## Como Executar o Projeto

Siga os passos abaixo para clonar e executar o projeto localmente usando Docker:

1. Clone este repositório:

    ```bash
    git clone https://github.com/mquintinu/api-mercado-livre.git
    ```

2. Acesse a pasta do projeto clonado:

    ```bash
    cd api-mercado-livre
    ```

3. Execute o Docker Compose para iniciar os containers:

    ```bash
    docker compose up
    ```

    - O back-end estará disponível na porta `3333`.
    - O front-end estará disponível na porta `5173`.

Certifique-se de estar dentro da pasta do projeto clonado antes de executar o comando do Docker.

## Estrutura do Projeto

- **api/**: Contém o código do back-end com Fastify.
- **web/**: Contém o código do front-end com React e MUI.
- **docker-compose.yml**: Arquivo de configuração para orquestrar os containers do projeto.

## Pré-requisitos

- Docker instalado na sua máquina
