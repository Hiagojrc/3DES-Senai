drop database if exists estacionamentos;
create database estacionamentos;
use estacionamentos;

create table servicos(
	id_servico integer not null auto_increment, 
	tipo varchar(10) not null,
    placa varchar(9) not null,
    data_de_registro date,
    entrada TIME not null,
    saida TIME,
    valor decimal(8,2),
	primary key (id_servico)
);
/*insert into servicos(tipo,placa,entrada,saida,valor) values
("carro","cdb 1012",(NOW()),DATE_ADD(NOW(),INTERVAL 2 HOUR),5.00),
("moto","dds 4045",(NOW()),DATE_ADD(NOW(),INTERVAL 8 HOUR ),5.00),
("moto","fgh 1412",(NOW()),DATE_ADD(NOW(),INTERVAL 6 HOUR),5.00),
("carro","asd 1516",(NOW()),DATE_ADD(NOW(),INTERVAL 3 HOUR),5.00);*/

select * from servicos; show tables;

create view vw_Proprietario as
select s.id_servico, s.tipo, s.placa, s.data_de_registro, s.entrada, s.saida, s.valor, round(time_to_sec(timediff(saida, entrada))/3600.0 ,2) as tempo_na_vaga,
                                            round((time_to_sec(timediff(saida, entrada))/3600.0 *valor),2) as valor_total from servicos s;