sudo docker run --name mydb -p 5432:5432 -e POSTGRES_PASSWORD=csc648demo -d postgres

# add inbound rule for port 5432
# docker port mapping

psql -h PUBLIC-IP-INSTANCE -p 5432 -d postgres -U postgres

CREATE TABLE todo (
    id serial PRIMARY KEY,
    item VARCHAR
);

INSERT INTO todo (item) VALUES ('test');
