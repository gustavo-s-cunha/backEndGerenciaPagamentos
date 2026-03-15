# Gateway 1 (http://localhost:3001)

###testando as rotas com autenticação:

## testando loggin

```bash
fetch('http://localhost:3001/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": "dev@betalent.tech",
    "token": "FEC9BB078BF338F464F96B48089EB498"
  })
})
.then(response => response.json())
.then(data => console.log('Sucesso:', data))
.catch(error => console.error('Erro:', error));
```

Sucesso: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzM2MDQ5MzQsImV4cCI6MTc3MzYwNDk5NH0.JImNs_lSjZyjg6tFYPQO1qeOfM8q3l3-qvUZ2_Y_rHU"}


---

## Criando transação simples
```bash
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzM2MDQ5MzQsImV4cCI6MTc3MzYwNDk5NH0.JImNs_lSjZyjg6tFYPQO1qeOfM8q3l3-qvUZ2_Y_rHU';

fetch('http://localhost:3001/transactions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "amount": 1000,
    "name": "tester",
    "email": "tester@email.com",
    "cardNumber": "5569000000006063",
    "cvv": "010"
  })
})
.then(response => response.json())
.then(data => console.log('Transação Criada:', data))
.catch(error => console.error('Erro na criação:', error));
```
Transação Criada: {id: '2510d2f4-68a4-4ac8-8b54-7574562c4838'}


---

## Criando transação com produtos
```bash
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzM2MDQ5MzQsImV4cCI6MTc3MzYwNDk5NH0.JImNs_lSjZyjg6tFYPQO1qeOfM8q3l3-qvUZ2_Y_rHU';

fetch('http://localhost:3001/transactions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      amount: 1000,
      name: "tester",
      email: "tester@email.com",
      cardNumber: "5569000000006063",
      cvv: "010",
      type: "Purchase",
      status: "pending",
      products: [
        {
          id_product: "3f3aeed1-12e1-4ca5-9029-e6cb4d4ab3fc",
          price: 500,
          quantity: 1
        },
        {
          id_product: "5c2bce04-c25b-4fd5-bc1a-27f61169c9ff",
          price: 250,
          quantity: 2
        }
      ]
    })
})
.then(response => response.json())
.then(data => console.log('Transação Criada:', data))
.catch(error => console.error('Erro na criação:', error));
```

Transação Criada: {id: 'b39a7446-5649-4928-98ef-e29df67fa225'}


---

## Realizar o reembolso da compra
```bash
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzM2MDQ5MzQsImV4cCI6MTc3MzYwNDk5NH0.JImNs_lSjZyjg6tFYPQO1qeOfM8q3l3-qvUZ2_Y_rHU';
const transactionId = 'b39a7446-5649-4928-98ef-e29df67fa225'; 

fetch(`http://localhost:3001/transactions/${transactionId}/charge_back`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log('Estorno realizado com sucesso:', data))
.catch(error => console.error('Falha ao processar estorno:', error));
```

Estorno realizado com sucesso: 
{
  "id": "b39a7446-5649-4928-98ef-e29df67fa225",
  "name": "tester",
  "email": "tester@email.com",
  "status": "charged_back",
  "card_first_digits": "5569",
  "card_last_digits": "6063",
  "amount": 1000
}

---

## Listar as transações

```bash
fetch('http://localhost:3001/transactions', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
})
.then(response => response.json())
.then(data => console.log('Sucesso:', data))
.catch(error => console.error('Erro:', error));
```
Sucesso: 
{
  "data": [
    {
      "id": "2510d2f4-68a4-4ac8-8b54-7574562c4838",
      "name": "tester",
      "email": "tester@email.com",
      "status": "paid",
      "card_first_digits": "5569",
      "card_last_digits": "6063",
      "amount": 1000
    },
    {
      "id": "b39a7446-5649-4928-98ef-e29df67fa225",
      "name": "tester",
      "email": "tester@email.com",
      "status": "charged_back",
      "card_first_digits": "5569",
      "card_last_digits": "6063",
      "amount": 1000
    }
  ]
}

---
# Gateway 2 (http://localhost:3002)

###testando as rotas com autenticação fixa:

## Gerar nova transação

```bash
fetch('http://localhost:3002/transacoes', {
  method: 'POST',
  headers: {
    'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
    'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "valor": 1000,
    "nome": "tester",
    "email": "tester@email.com",
    "numeroCartao": "5569000000006063",
    "cvv": "010"
  })
})
.then(response => response.json())
.then(data => console.log('Transação Criada no Gateway 2:', data))
.catch(error => console.error('Erro na criação:', error));
```
Transação Criada no Gateway 2: {id: '81ca7250-d72f-4e03-bc6f-68d2079ba195'}


--- 

## Listar as transações

```bash
fetch('http://localhost:3002/transacoes', {
  method: 'GET',
  headers: {
    'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
    'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log('Lista Gateway 2:', data))
.catch(error => console.error('Erro na listagem:', error));
```

Lista Gateway 2:
{
  "data": [
    {
      "id": "81ca7250-d72f-4e03-bc6f-68d2079ba195",
      "name": "tester",
      "email": "tester@email.com",
      "status": "paid",
      "card_first_digits": "5569",
      "card_last_digits": "6063",
      "amount": 1000
    }
  ]
}


## Realizar o reembolso da compra
```bash
fetch(`http://localhost:3002/transacoes/reembolso`, {
  method: 'POST',
  headers: {
    'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
    'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "id": "81ca7250-d72f-4e03-bc6f-68d2079ba195"
  })
})
.then(response => response.json())
.then(data => console.log('Resultado do Reembolso Gateway 2:', data))
.catch(error => console.error('Erro ao processar reembolso:', error));
```
Resultado do Reembolso Gateway 2: {}

---


## Listar as transações após estorno

```bash
fetch('http://localhost:3002/transacoes', {
  method: 'GET',
  headers: {
    'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
    'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log('Lista Gateway 2:', data))
.catch(error => console.error('Erro na listagem:', error));
```

Lista Gateway 2:
{
  "data": [
    {
      "id": "81ca7250-d72f-4e03-bc6f-68d2079ba195",
      "name": "tester",
      "email": "tester@email.com",
      "status": "charged_back",
      "card_first_digits": "5569",
      "card_last_digits": "6063",
      "amount": 1000
    }
  ]
}