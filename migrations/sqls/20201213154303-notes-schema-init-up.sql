create table notes (
  id serial NOT NULL PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  create_at timestamptz NOT NULL default now(),
  update_at timestamptz NOT NULL default now()
);
