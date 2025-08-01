# ShopHub - E-commerce Web Application

## Descrição

ShopHub é uma aplicação web de e-commerce desenvolvida com React, Next.js e Firebase. A aplicação oferece uma experiência completa de compra online, incluindo navegação por produtos, carrinho de compras, checkout e integração com banco de dados em tempo real.

## Funcionalidades Implementadas

### ✅ Lista e Detalhe de Produtos
- **ItemListContainer**: Componente container que gerencia a lógica de busca de produtos
- **ItemList**: Componente de apresentação que exibe a lista de produtos
- **Item**: Componente que exibe um produto individual
- **ItemDetailContainer**: Container que gerencia a lógica de detalhes do produto
- **ItemDetail**: Componente de apresentação dos detalhes do produto
- **Separação de responsabilidades**: Containers vs Presentational Components

### ✅ Componente ItemCount
- **Seleção de quantidade**: Controles de incremento/decremento
- **Validações**: Valor mínimo (1) e limite por estoque
- **Ocultação**: Componente é ocultado após adicionar produto ao carrinho
- **Feedback visual**: Exibe quantidade restante em estoque

### ✅ Navegação
- **Next.js App Router**: Roteamento baseado em arquivos
- **NavBar**: Menu de navegação com categorias
- **Rotas dinâmicas**: `/product/[id]` e `/category/[id]`
- **Single Page App**: Navegação sem recarregamento da página

### ✅ Carrinho de Compras
- **CartContext**: Gerenciamento de estado global com Context API
- **Cart**: Componente que exibe itens do carrinho
- **CartWidget**: Widget na navbar com total de itens
- **Persistência**: Dados salvos no localStorage
- **Operações**: Adicionar, remover, atualizar quantidade, limpar carrinho

### ✅ Firebase Integration
- **Firestore**: Banco de dados NoSQL em tempo real
- **Produtos**: Coleção com informações dos produtos
- **Pedidos**: Geração de documentos ao confirmar compra
- **Configuração**: Variáveis de ambiente para credenciais

### ✅ Experiência do Usuário
- **Loading States**: Skeleton loaders durante carregamento
- **Error Handling**: Mensagens de erro amigáveis
- **Renderização condicional**: Estados diferentes baseados em dados
- **Responsividade**: Interface adaptável para mobile e desktop
- **Feedback**: Confirmação de ações do usuário

## Estrutura de Componentes

```
App
├── NavBar
│   └── CartWidget
├── ItemListContainer (Container)
│   └── ItemList (Presentational)
│       └── Item (Presentational)
├── ItemDetailContainer (Container)
│   └── ItemDetail (Presentational)
│       └── ItemCount (Presentational)
├── Cart
│   └── CartItem
└── CheckoutForm
```

## Tecnologias Utilizadas

### Frontend
- **React 19**: Biblioteca principal
- **Next.js 15**: Framework com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Framework CSS utilitário
- **Radix UI**: Componentes acessíveis
- **Lucide React**: Ícones modernos

### Backend & Banco de Dados
- **Firebase**: Plataforma de desenvolvimento
- **Firestore**: Banco de dados NoSQL
- **Firebase SDK**: Integração com serviços

### Gerenciamento de Estado
- **React Context API**: Estado global do carrinho
- **useReducer**: Lógica complexa de estado
- **localStorage**: Persistência local

## Arquitetura do Projeto

### Padrão Container/Presentational
- **Containers**: Gerenciam lógica de negócio e estado
- **Presentational**: Focam apenas na apresentação
- **Separação clara**: Responsabilidades bem definidas

### Hooks Utilizados
- **useState**: Estado local dos componentes
- **useEffect**: Efeitos colaterais (fetch de dados)
- **useReducer**: Estado complexo do carrinho
- **useContext**: Acesso ao estado global

### Navegação
- **App Router**: Roteamento baseado em arquivos
- **Dynamic Routes**: Rotas dinâmicas para produtos/categorias
- **Client-side Navigation**: Navegação sem recarregamento

## Configuração do Firebase

### Variáveis de Ambiente
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Estrutura do Firestore
```
firestore/
├── products/             # Coleção de produtos
│   ├── [productId]      # Documento do produto
│   │   ├── title        # Título
│   │   ├── price        # Preço
│   │   ├── description  # Descrição
│   │   ├── category     # Categoria
│   │   ├── image        # URL da imagem
│   │   └── rating       # Avaliações
└── orders/              # Coleção de pedidos
    ├── [orderId]        # Documento do pedido
    │   ├── customer     # Dados do cliente
    │   ├── items        # Itens do pedido
    │   ├── totalPrice   # Preço total
    │   ├── status       # Status do pedido
    │   └── createdAt    # Data de criação
```

## Instalação e Execução

### Pré-requisitos
- Node.js 18.18.0 ou superior
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/laisGaletto/shophub.git
cd shophub

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas credenciais do Firebase

# Execute o projeto
npm run dev
```

### Acessar a Aplicação
Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Funcionalidades Detalhadas

### 1. Catálogo de Produtos
- **API Integration**: Integração com Fake Store API
- **Filtros por Categoria**: Navegação por categorias
- **Loading States**: Skeleton loaders durante carregamento
- **Error Handling**: Tratamento de erros de API

### 2. Carrinho de Compras
- **Context API**: Estado global compartilhado
- **Persistência**: Dados salvos no localStorage
- **Validações**: Controle de quantidade e estoque
- **Cálculos**: Subtotal e total automáticos

### 3. Checkout
- **Formulário**: Coleta de dados do cliente
- **Validação**: Campos obrigatórios
- **Firebase**: Salvamento do pedido
- **Confirmação**: ID do pedido gerado

### 4. Interface Responsiva
- **Mobile First**: Design adaptável
- **Componentes UI**: Radix UI para acessibilidade
- **Animações**: Transições suaves
- **Feedback Visual**: Estados de loading e erro

## Boas Práticas Implementadas

### Código Limpo
- **TypeScript**: Tipagem forte
- **ESLint**: Linting de código
- **Prettier**: Formatação consistente
- **Convenções**: Nomes descritivos

### Performance
- **Lazy Loading**: Carregamento sob demanda
- **Memoização**: Otimização de re-renders
- **Bundle Splitting**: Divisão de código
- **Image Optimization**: Otimização de imagens

### Acessibilidade
- **ARIA Labels**: Labels para screen readers
- **Keyboard Navigation**: Navegação por teclado
- **Focus Management**: Gerenciamento de foco
- **Color Contrast**: Contraste adequado

## Testes e Qualidade

### Funcionalidades Testadas
- ✅ Navegação entre páginas
- ✅ Adição de produtos ao carrinho
- ✅ Atualização de quantidade
- ✅ Remoção de produtos
- ✅ Checkout completo
- ✅ Persistência de dados
- ✅ Responsividade

### Validações Implementadas
- ✅ Quantidade mínima (1)
- ✅ Limite de estoque
- ✅ Campos obrigatórios no checkout
- ✅ Tratamento de erros de API
- ✅ Estados de loading

## Deploy e Produção

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Deploy manual ou via GitHub
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Contato

Para dúvidas ou sugestões, entre em contato através do repositório do projeto.

---

**Desenvolvido por:** Lais Galetto  
**Tecnologias:** React, Next.js, TypeScript, Firebase  
**Data:** 2024
