# Money Makers I.A — Mentoria Exclusiva

Landing page estática (HTML + CSS + JS) da Mentoria Money Makers I.A com captura de leads integrada ao Supabase (Lovable Cloud) e painel interno de leads.

## O que já existe

- `index.html` — landing completa: hero, countdown 72h, nav, prova, 4 pilares, como funciona, depoimentos, bônus/garantia, oferta (R$ 139,89), formulário de captura, FAQ, live, footer, CTAs de WhatsApp.
- `admin.html` — painel interno de leads (visual dark/neon): lista `mentorship_leads` ordenado por `created_at desc`, busca por nome/e-mail, contador total, exportar CSV, estados de loading/vazio/erro.
- `src/integrations/supabase/client.ts` — client Supabase do projeto (não duplicar).

## Captura de leads

- Formulário em `#captura` (`index.html`): nome, WhatsApp com máscara `(11) 99999-9999`, e-mail e aceite LGPD obrigatório.
- Validação no front + botão com loading (`ENVIANDO...` desabilitado).
- Insert tenta `name, email, phone, whatsapp, source` (`source='landing_mm_ia'`) e faz fallback automático para `name, email, phone, source` se a coluna `whatsapp` ainda não existir.
- Sucesso mostra `✅ Cadastro recebido!` e abre o WhatsApp oficial; falha mostra `⚠️ Não foi possível salvar...` (só aparece em falha real) e mesmo assim abre o WhatsApp para não perder a conversão.

## Tabela `mentorship_leads` + RLS

Colunas esperadas: `id uuid PK`, `name text`, `email text`, `phone text`, `whatsapp text` (opcional, recomendado), `source text`, `created_at timestamptz default now()`.

Para a captura anônima funcionar, libere no banco (etapa SQL separada):

- `ENABLE ROW LEVEL SECURITY` na tabela;
- policy de `INSERT` para `anon` (captura pública);
- policy de `SELECT` para leitura do painel (idealmente restrita; hoje o painel usa a chave publicável, então mantenha o `admin.html` fora do índice/Google com `noindex` e senha de sessão).

Se o insert falhar com erro de coluna/RLS, o formulário exibe o motivo no `admin.html` e no console, sem travar o redirecionamento ao WhatsApp.

## WhatsApp oficial e lives

- WhatsApp: `https://wa.me/5511989353418` (mensagem personalizada com nome/e-mail/telefone do lead).
- Lives: `https://meet.google.com/` (botão `ENTRAR NA LIVE`).

## Como visualizar leads

1. Abra `admin.html` no navegador.
2. Digite a senha de sessão (padrão inicial `moneymakers2025` — troque a constante `ADMIN_PASS` no arquivo após publicar).
3. Use a busca, o contador total e o botão `Exportar CSV`.
4. Se der erro de leitura, confira as policies RLS de `mentorship_leads` e a conectividade com o Supabase.

> Não há build/stack nova: é HTML estático + Supabase via CDN (`esm.sh`). Não criar `src/pages/` nem trocar o client existente.
