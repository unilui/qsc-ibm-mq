# Queue Service Controller

## Estrutura do Projeto

O backend expõe os seguintes endpoints:

- **POST /api/queue/send**
- **GET /api/queue/read/{queueName}**

## Controlador de Mensagens

A classe `MessageBrokerApiController` é responsável por gerenciar a comunicação com o IBM MQ. Abaixo estão os detalhes dos métodos implementados.

### Anotações

- `@RestController`: Indica que a classe é um controlador REST.
- `@RequestMapping("/api")`: Mapeia a URL base para todos os métodos da classe.
- `@EnableJms`: Ativa o suporte a JMS (Java Message Service).
