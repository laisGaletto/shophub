# Configuração do Projeto ShopHub

## Configuração do Firebase

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Clique em "Criar projeto"
3. Digite um nome para o projeto (ex: "shophub-ecommerce")
4. Siga os passos de configuração

### 2. Configurar Firestore Database

1. No console do Firebase, vá para "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar no modo de teste" (para desenvolvimento)
4. Escolha uma localização (recomendado: us-central1)

### 3. Obter Credenciais

1. No console do Firebase, vá para "Configurações do Projeto"
2. Na aba "Geral", role até "Seus aplicativos"
3. Clique em "Adicionar app" e escolha "Web"
4. Registre o app e copie as credenciais

### 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id_aqui
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id_aqui
```

### 5. Configurar Regras do Firestore

No console do Firebase, vá para "Firestore Database" > "Regras" e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura de produtos para todos
    match /products/{productId} {
      allow read: if true;
    }
    
    // Permitir escrita de pedidos para todos
    match /orders/{orderId} {
      allow write: if true;
    }
  }
}
```

## Instalação e Execução

### 1. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 2. Executar o Projeto

```bash
npm run dev
# ou
yarn dev
```

### 3. Acessar a Aplicação

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Populando o Banco de Dados

### Opção 1: Usando a API Fake Store (Recomendado para Testes)

O projeto já está configurado para usar a API Fake Store, então não é necessário popular o Firestore para testes básicos.

### Opção 2: Populando o Firestore

Se quiser usar o Firestore, você pode adicionar produtos de exemplo:

1. Abra o console do navegador na aplicação
2. Execute:

```javascript
// Importar a função de seed
import { seedProducts } from '@/lib/products'

// Executar o seed
await seedProducts()
```

## Estrutura do Banco de Dados

### Coleção: products
```javascript
{
  title: "Nome do Produto",
  price: 99.99,
  description: "Descrição do produto",
  category: "electronics",
  image: "https://url-da-imagem.jpg",
  rating: {
    rate: 4.5,
    count: 100
  }
}
```

### Coleção: orders
```javascript
{
  customer: {
    name: "Nome do Cliente",
    email: "email@exemplo.com",
    phone: "123456789",
    address: "Endereço completo",
    city: "Cidade",
    zipCode: "12345-678"
  },
  items: [
    {
      id: 1,
      title: "Nome do Produto",
      price: 99.99,
      image: "https://url-da-imagem.jpg",
      quantity: 2
    }
  ],
  totalItems: 2,
  totalPrice: 199.98,
  status: "pending",
  createdAt: Timestamp
}
```

## Solução de Problemas

### Erro de Conexão com Firebase
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto Firebase está ativo
- Verifique as regras do Firestore

### Erro de CORS
- Configure as regras do Firestore adequadamente
- Verifique se o domínio está autorizado no Firebase

### Produtos não aparecem
- Verifique se a API Fake Store está funcionando
- Se usando Firestore, confirme se os produtos foram adicionados

## Próximos Passos

1. Configure autenticação de usuários (opcional)
2. Implemente sistema de avaliações
3. Adicione filtros avançados
4. Configure notificações push
5. Implemente PWA 