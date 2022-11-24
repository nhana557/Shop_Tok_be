create table product(
    id text,
    name text,
    stock  INT,
    price INT,
    description varchar,
    merk varchar,
    photo text [],
    condition text,
    id_transaksi text,
    id_category text,
    id_toko text,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp
)

create table toko(
    id text,
    name text,
    description text
)