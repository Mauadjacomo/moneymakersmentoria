# LuminaShop — Loja virtual completa

Loja reconstruída do zero em HTML estático + Supabase (Lovable Cloud). Rápida, responsiva e pronta para produção.

## Estrutura

- `index.html` — vitrine SPA completa: header (logo, busca com debounce, suporte Telegram, carrinho com badge), nav de categorias, hero principal + 2 secundários, grade de categorias, Destaques, Mais Vendidos, catálogo com filtro por categoria + ordenação + busca, modal de produto (galeria, qtd, frete simulado), drawer do carrinho (localStorage, alterar qtd/remover), checkout em 3 passos (dados → entrega → pagamento Pix/cartão/boleto) salvando em `orders`/`order_items`, tela de confirmação com código, footer e botão flutuante Telegram.
- `admin.html` — painel do lojista (fora do Google, `noindex`): login de sessão (`loja-admin-2025`), aba Produtos (CRUD: nome, preço, oferta, estoque, categoria, imagens, descrição, destaque/mais vendido/ativo) e aba Pedidos (busca por código/nome, status editável, itens).
- `src/integrations/supabase/client.ts` — client oficial Lovable Cloud (URL `sqpevkuahatlcjhcseqv` + chave real).

## Banco (Lovable Cloud)

Tabelas esperadas:

- `categories(id uuid/text, name, slug, icon)`
- `products(id uuid, category_id, name, description, price numeric, compare_at_price numeric, stock int, images text[], featured bool, best_seller bool, active bool, rating numeric, created_at)`
- `orders(id uuid, code, customer_name, email, phone, cep, address, city, uf, complement, payment_method, status, subtotal, shipping, discount, total, created_at)`
- `order_items(id uuid, order_id ref, product_id text, name, qty, price)`

RLS: leitura pública (`SELECT` para `anon` em categories/products ativos) + `INSERT` público em orders/order_items para o checkout funcionar sem login. O `admin.html` usa a chave publicável, então mantenha-o com `noindex` e troque `ADMIN_PASS`.

> A vitrine tem fallback local: mesmo sem tabelas criadas ela exibe 12 produtos demo e o checkout gera o código do pedido. Com as tabelas criadas, tudo persiste de verdade.

## Como rodar

1. Sirva a pasta (ex: `npx serve .`) ou abra `index.html` no navegador.
2. Abra `admin.html`, entre com a senha e cadastre categorias/produtos reais.
3. Suporte: `https://t.me/luminashop_suporte` (troque pelo seu @ no `index.html`/`admin.html`).

## Checklist produção

- [ ] Criar tabelas + RLS + seed no SQL do Lovable Cloud.
- [ ] Trocar `ADMIN_PASS` e Telegram real.
- [ ] Cadastrar produtos/categorias com fotos e estoque.
- [ ] Testar busca, filtros, carrinho, checkout (Pix/cartão/boleto) no mobile e desktop.
- [ ] Conferir pedidos no `admin.html`.
