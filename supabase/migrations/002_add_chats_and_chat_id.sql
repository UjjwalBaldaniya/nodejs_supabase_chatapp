-- 1. Create chats table
create table if not exists public.chats (
  id uuid primary key default uuid_generate_v4(),
  user1 uuid references auth.users(id) on delete cascade,
  user2 uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now()
);

-- 2. Add chat_id column to messages table
alter table public.messages
add column if not exists chat_id uuid references public.chats(id) on delete cascade;
