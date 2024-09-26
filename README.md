
# Queue Service Controller

## Angular + Spring + Firebase + IBM MQ

Este projeto é uma demonstração técnica de uma aplicação Angular com autenticação via Firebase, integrada tanto no frontend quanto no backend. O backend foi desenvolvido usando Spring Boot e expõe dois endpoints REST para enviar e receber mensagens de uma fila do IBM MQ.

## Visão Geral da Stack

- **Frontend**: Angular com Bootstrap para a interface de usuário.
- **Backend**: Spring Boot com endpoints REST.
- **Autenticação**: Firebase para autenticação tanto no frontend quanto no backend.
- **Mensageria**: IBM MQ para manipulação de mensagens em filas.
- **Conteinerização**: Docker para os serviços do frontend e backend.

## Pré-requisitos

Certifique-se de ter o Docker instalado na sua máquina.

### Arquivos Necessários

Coloque os seguintes dois arquivos na raiz do projeto:

1. **.env** – Este arquivo deve conter suas credenciais do Firebase e a configuração do IBM MQ:
   ```bash
   MY_MQ_QMGR=QM1
   MY_MQ_PASSWORD=
   FIREBASE_API_KEY=
   FIREBASE_AUTH_DOMAIN=
   FIREBASE_PROJECT_ID=
   FIREBASE_STORAGE_BUCKET=
   FIREBASE_MESSAGING_SENDER_ID=
   FIREBASE_APP_ID=
   ```

2. **FirebaseServiceKey.json** – Chave de serviço da conta do Firebase para autenticação no backend (pode ser gerada no Console do Firebase).

## Executando o Projeto

1. Clone o repositório.
2. Adicione os arquivos `.env` e `FirebaseServiceKey.json` na raiz do projeto.
3. Execute o projeto usando Docker:
   ```bash
   docker-compose up
   ```

## Curiosidades Sobre o Desenvolvimento

- Tempo total de desenvolvimento: aproximadamente 70 horas.
- Cerca de 100 janelas do Firefox abertas durante o desenvolvimento.
- Combustível do projeto: 7 litros de café.