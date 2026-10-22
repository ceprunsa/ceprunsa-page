-- ==============================================================================
-- CEPRUNSA - Script de configuración inicial para Supabase
-- Ejecuta este script en el "SQL Editor" de tu proyecto de Supabase.
-- ==============================================================================

-- 1. TABLA: site_config (Variables globales de la web)
-- ------------------------------------------------------------------------------
create table if not exists public.site_config (
  id text primary key default 'global',
  config jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS (Seguridad a nivel de fila)
alter table public.site_config enable row level security;

-- Permitir lectura pública a cualquier visitante
drop policy if exists "Public config is readable by everyone" on public.site_config;
create policy "Public config is readable by everyone"
  on public.site_config for select
  using (true);

-- Permitir inserción y actualización
drop policy if exists "Allow insert/update for site_config" on public.site_config;
create policy "Allow insert/update for site_config"
  on public.site_config for all
  using (true)
  with check (true);

-- Insertar configuración inicial por defecto
insert into public.site_config (id, config)
values (
  'global',
  '{
    "nextProcessToStart": 3,
    "psychologyServiceActive": true,
    "whatsappNumber": "908892331",
    "whatsappPsychologyNumber": "908892326",
    "phoneNumber": "054-391911",
    "phoneAnnex": "1422",
    "emailInstitutional": "ceprunsa@unsa.edu.pe",
    "emailClientQuery": "atencion.cliente@cepr.unsa.pe",
    "emailApplicantQuery": "atencion.postulante@cepr.unsa.pe"
  }'::jsonb
)
on conflict (id) do nothing;


-- 2. TABLA: site_images (Reemplazos y mapeo de imágenes)
-- ------------------------------------------------------------------------------
create table if not exists public.site_images (
  id text primary key,
  target_path text unique not null,
  image_url text not null,
  name text,
  page text,
  section text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS
alter table public.site_images enable row level security;

-- Permitir lectura pública
drop policy if exists "Public images are readable by everyone" on public.site_images;
create policy "Public images are readable by everyone"
  on public.site_images for select
  using (true);

-- Permitir modificaciones
drop policy if exists "Allow all operations on site_images" on public.site_images;
create policy "Allow all operations on site_images"
  on public.site_images for all
  using (true)
  with check (true);


-- 3. BUCKET DE STORAGE: ceprunsa-images (Para almacenar los archivos de imagen)
-- ------------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('ceprunsa-images', 'ceprunsa-images', true)
on conflict (id) do update set public = true;

-- Políticas de acceso al Storage
drop policy if exists "Public Access to ceprunsa-images" on storage.objects;
create policy "Public Access to ceprunsa-images"
  on storage.objects for select
  using ( bucket_id = 'ceprunsa-images' );

drop policy if exists "Allow uploads to ceprunsa-images" on storage.objects;
create policy "Allow uploads to ceprunsa-images"
  on storage.objects for insert
  with check ( bucket_id = 'ceprunsa-images' );

drop policy if exists "Allow updates to ceprunsa-images" on storage.objects;
create policy "Allow updates to ceprunsa-images"
  on storage.objects for update
  using ( bucket_id = 'ceprunsa-images' );

drop policy if exists "Allow deletions in ceprunsa-images" on storage.objects;
create policy "Allow deletions in ceprunsa-images"
  on storage.objects for delete
  using ( bucket_id = 'ceprunsa-images' );


-- 4. TABLA: noticias (Noticias, comunicados y publicaciones del CEPRUNSA)
-- ------------------------------------------------------------------------------
create table if not exists public.noticias (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  date text,
  image_url text,
  summary text,
  source_url text,
  category text default 'Institucional',
  featured boolean default false,
  content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Si la tabla ya fue creada anteriormente sin la columna 'content', añadirla:
alter table public.noticias add column if not exists content text;


-- Habilitar RLS
alter table public.noticias enable row level security;

-- Permitir lectura pública a cualquier visitante
drop policy if exists "Public noticias are readable by everyone" on public.noticias;
create policy "Public noticias are readable by everyone"
  on public.noticias for select
  using (true);

-- Permitir operaciones completas
drop policy if exists "Allow all operations on noticias" on public.noticias;
create policy "Allow all operations on noticias"
  on public.noticias for all
  using (true)
  with check (true);

