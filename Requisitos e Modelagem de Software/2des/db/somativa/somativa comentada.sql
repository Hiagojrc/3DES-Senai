drop database if exists somativa;
create database somativa; --criando o banco de dados somativa
use somativa; --entrando dentro do banco
create table bebidas(   --criando a tabela bebidas
    codBebida integer(6) primary key not null auto_increment, --o primary key, referece a chave primaria da tabela
    nomeBebida varchar(40) not null,
    volumeVasilhame integer(6) not null
);

-- essa tabela está ligada com a tabela bebidas. Na tabela bebidas o codBebida é uma chave primaria, já nessa
-- tabela ela passa a ser uma chave estrangeira

create table tipo_Bebida( --essa tabela surgiu por que na questão uma bebida tem mais de um tipo, Ex: com álcool e sem álcool. Ex: a cerveja tem com álcool e sem álcool.
    codBebida integer(6) not null,  -- chave estrangeira
    tipoBebida varchar(20),
    constraint fk_tipo_babidas foreign key (codBebida) references bebidas(codBebida) --as tabelas são ligadas através desse comando
);

create table pratileiras(
    numPratileiras integer(8) primary key not null, -- chave primaria
    posicaoDeposito varchar(30) not null,
    pesoSuportado decimal(8,2) not null,
    dataAquisicao date
);

--a tabela movimento esta ligada a tabela bebidas e a tabela pratileiras. A chave primaria da tabela bebidas e a tabela pratileiras
--passa a ser chave estrangeira na tabela movimento, permitindo assim ligar todas as tabelas.

create table movimento(
    numPedido integer(8) primary key not null,-- chave primaria
    codBebida integer(6) not null, -- chave estrangeira
    numPratileiras integer(8) not null,-- chave estrangeira
    dataMovimento date not null,
    tipoMovimento varchar(30) not null,
    totalVasilhames decimal(8,2) not null,
    valorUnitario decimal (8,2) not null,
    constraint fk_bebidas_movimento foreign key (codBebida) references bebidas (codBebida),  --lingando a tabela bebidas com movimento
    constraint fk_pratileiras_movimento foreign key (numPratileiras) references pratileiras (numPratileiras)  --lingando a tabela pratileiras com movimento
);

--inserindo dados na tabela bebidas 'codBebida, nomeBebida, volumeVasilhame'. 

insert into bebidas values
(10001,"cerveja",240),
(10002,"guarana",60),
(10003,"energetico",120),
(10004,"whisky",140);

--inserindo dados na tabela tipo_Bebida 'codBebida, tipoBebida'.

insert into tipo_Bebida values
(10001,"com álcool"), --cerveja com álcool
(10001,"sem álcool"), --cerveja sem álcool
(10002,"sem álcool"),
(10003,"sem álcool"),
(10003,"com álcool"),
(10004,"com álcool");

--inserindo dados na tabela pratileiras 'numPratileiras, posicaoDeposito, pesoSuportado, dataAquisicao'.

insert into pratileiras values
(1,"latas",500,curdate()),
(2,"garrafas plastica",1000,curdate()-1),
(3,"garrafas de vidros",2000,curdate()+1),
(4,"garrafas retornaveis",1200,curdate()+2);

--inserindo dados na tabela movimento 'numPedido, codBebida, numPratileiras, dataMovimento, tipoMovimento, totalVasilhames, valorUnitario'.

insert into movimento values
(200001,10001,1,curdate(),"cerveja",48,100),
(200002,10002,2,curdate()-1,"guarana",30,300),
(200003,10003,4,curdate()+1,"whisky",38,1000),
(200004,10004,3,curdate()+2,"energetico",100,700);

-- essa view é só para mostrar os dados salvos do estoque, e o valor total do estoque

create view vw_estoque as
select m.numPedido, m.codBebida, m.numPratileiras, m.dataMovimento, m.tipoMovimento, m.totalVasilhames, m.valorUnitario, valorUnitario * totalVasilhames as valorTotal from movimento m left join bebidas b on m.codBebida = b.codBebida;