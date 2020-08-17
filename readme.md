## Sobre o projeto

Este projeto se trata de uma aplicação para consulta de saldo, depósito e saque de uma determinada conta. A aplicação foi dividita em duas partes, sendo a primeira uma API RESTFul e a segunda uma Simgle Page Application (SPA) que irá consumir a API.

## Estrutura

#### 1 - API RESTFul

A API foi desenvolvida utilizando o Laravel Framework v5.8 e disponibiliza 5 endpoints para contulta/envio dos dados pelo SPA, sendo elas:

``GET /api/accounts/{number}/`` 
- para buscar informações de uma conta.

``POST /api/accounts/{number}/move``
- Para realizar um saque ou depósito

``POST /api/accounts/{number}/movements``
- Para consultar as movimentações realizadas em determinada conta.

``POST /api/accounts/{number}/balance``
- Para consultar o saldo de uma determinada conta.

##### Controller
Foi criado apenas um controller ``AccountController`` para implementar a lógica da aplicação.

##### Resources

Para auxiliar o controller, foi criado os resources ``AccountBalanceResource``, ``AccountMovementsResource`` e ``AccountShowResource`` mantendo neles a estrutura de dado que será retornada para a SPA.

##### Models, Migrations, Factories e Seeds

Para os models foi criado apenas o ``Account`` e ``AccountMovement`` e suas respectivas migrations. Para acelerar o desenvolvimento, foi feito uso de factories e seeds para gerar dados fakes. Estes dados já se encontram na base sqlite em ``/database/database.sqlite``

#### 2 - Single Page Application (SPA)

A SPA foi desenvolvida utilizando a versão 2 do framework VueJS. Para resolver o problema proposto, foi criado tanto uma página inicial quanto um menu lateral para exibir as opções disponíveis: saldo, depósito e saque. Caso uma ação seja iniciada, a SPA é capaz de monitorar se o usuário já concluiu ou não, armazenando alguns dados no seu state. Para cada subetapas de uma ação foi criada uma página para manter o mais simples possível a utilização pelo usuário.

O que difere entre cada ação é que na consulta do saldo é solicitado apenas o número da conta e sua senha, já no saque e depósito tem uma etapa a mais que é a solicitação do valor.

Para centralizar os dados e mantê-los íntegros, foi feita a utilização do vuex. Para isso, foi necessário apenas uma store, contendo os states, mutations, getters e actions. Quando o usuário inicia uma ação, é armazenada no state a ação (depósito, saque, saldo), se foi iniciada e finalizada. Quando o usuário informa o número da conta, a SPA faz uma requisição na API buscando dados da conta e seu titular e também armazena no state para ser utilizada nas etapas seguintes que são a solicitação do valor (saque e depósito) e a senha da conta.

## Executando o projeto

(assumindo que já tenha feito o clone..)

Para executar a aplicação, primeiro faça o download do docker e docker-compose.

Em seguida, insira um registro no arquivo ``/etc/hosts`` (se for no linux) com o ip ``172.17.0.1`` e a url ``app.capgemini.local``.

Após a etapa anterior inicie os containers com o comando ``docker-compose up -d``.

Pronto! A aplicação já estará rodando! =D

Caso ocorra algum erro, crie os arquivos de log do nginx.

