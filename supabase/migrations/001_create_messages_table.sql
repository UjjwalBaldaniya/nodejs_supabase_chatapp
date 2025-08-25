create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);
