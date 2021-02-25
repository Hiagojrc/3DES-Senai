drop database if exists cgmtb;
create database cgmtb;
use cgmtb;
--tabela com os grupos de alimentos
create table grupos(
    cod_grupo integer(6) primary key not null auto_increment,
    nome_grupo varchar(40) not null
);
--tabela com os produtos
create table produtos(
    cod_prod integer(12) primary key not null,
    cod_grupo integer(6),
    nome_prod varchar(40) not null,
    constraint fk_grupos_produtos foreign key (cod_grupo) references grupos (cod_grupo)
);
--tabela que lista
create table lista(
    cod_lista integer(6) primary key not null auto_increment,
    data date not null
);
--tabela que monta a lista de compra
create table compra(
    cod_compra integer(6) primary key not null auto_increment,
    cod_lista integer(6) not null,
    cod_prod integer(12) not null,
    nome_prod varchar(40),
    marca varchar(40),
    qtd integer,
    valor_uni decimal(8,2),
    constraint fk_produtos_compra foreign key (cod_prod) references produtos (cod_prod),
    constraint fk_lista_compra foreign key (cod_lista) references lista (cod_lista)
);
--tabela view para mostrar os dados para o usuário
create view vw_calcompra as
select p.nome_prod, c.marca, c.qtd, c.valor_uni, c.valor_uni * c.qtd as sobtotal from compra c left join produtos p on p.cod_prod = c.cod_prod; 

--tabela para os gastos
create table gastos(
    cod_gastos integer(6) primary key not null auto_increment,
    nome_gastos varchar(40) not null,
    descricao varchar(40),
    data date not null,
    valor decimal(8,2) not null 
);
--tabela para montar um histórico de gastos
create table historico(
    cod_his integer(6) primary key not null auto_increment,
    cod_gastos integer(6) not null,
    data date not null,
    constraint fk_gastos_historico foreign key (cod_gastos) references gastos (cod_gastos)
);
--tabela view para mostrar os dados para o usuário
create view vw_dados as
select g.nome_gastos, g.descricao, g.data, g.valor, sum(valor) as total from gastos g left join historico h on g.cod_gastos = h.cod_gastos;

insert into gastos values
("30001","fatura","internet",curtime(),"100"),
("30002","aluguel","casa",curtime(),"1000"),
("30003","combustivel","",curtime(),"80");

insert into grupos values
("1","Itens sexta básica"),
("2","legumes e frutas"),
("3","churrasco"),
("4","congelados"),
("5","padaria"),
("6","higiene"),
("7","outros");

insert into produtos values
("100001","1","arroz"),
("100002","1","feijao"),
("100003","1","acucar"),
("100004","1","macarrão"),
("100005","1","massa de milho"),
("100006","1","oléo"),

("100007","2","alface"),
("100008","2","tomate"),
("100009","2","banana"),
("100010","2","morango"),
("100011","2","repolho"),
("100012","2","mamão"),

("100013","3","alcatara"),
("100014","3","fraldinha"),
("100015","3","cupim"),
("100016","3","bisteca"),
("100017","3","cerveja"),
("100018","3","whiski"),

("100019","4","sorvete"),
("100020","4","peixe"),
("100021","4","carne"),
("100022","4","danone"),
("100023","4","iorgute"),
("100024","4","gelo"),

("100025","5","bolacha"),
("100026","5","pão"),
("100027","5","café"),
("100028","5","bolo"),
("100029","5","nutela"),
("100030","5","bisnaguinha"),

("100031","6","sabonete"),
("100032","6","champoo"),
("100033","6","desodorante"),
("100034","6","fralda"),
("100035","6","papel higiênico"),
("100036","6","contonete");

insert into lista values
("1",CURTIME()),
("2",CURTIME()-1),
("3",CURTIME()),
("4",CURTIME()-1),
("5",CURTIME()),
("6",CURTIME()-1),
("7",CURTIME()),
("8",CURTIME()-1),
("9",CURTIME()),
("10",CURTIME()-1),
("11",CURTIME()),
("12",CURTIME()-1);

insert into compra values
("6","1","100031","sabonete","lux colo","3","3"),
("7","1","100032","champoo","clear","2","18"),
("8","2","100033","desodorante","rexona","1","17"),
("9","3","100034","fralda","baby","1","26"),
("5","4","100035","papel higiênico","","1","8"),
("4","5","100036","contonete","limp","1","3"),

("3","2","100025","bolacha","maizena","3","4"),
("2","2","100026","pão","","2","1"),
("1","3","100027","café","ouro verde","1","8"),
("10","4","100028","bolo","chocolate","1","20"),
("11","5","100029","nutela","","1","16"),
("12","5","100030","bisnaguinha","","1","5");
