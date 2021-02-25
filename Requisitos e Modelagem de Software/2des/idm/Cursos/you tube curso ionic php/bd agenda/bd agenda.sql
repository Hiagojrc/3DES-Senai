cd/	--para voltar para o disco c:
mkdir nome_pasta	--para criar uma pagina
cd nome_pasta	--entrar na pasta
ionic start nome_app sidemenu	--baixa as dependencias do projeto
--selecione a opção angular
--digite 'y' para ligar com corduva

ionic generate page nome	--comnado para criar pagina

drop database if exists agenda;
create database agenda;
use agenda;
create table telefonica(
    id integer primary key auto_increment,
    nome varchar(40) null,
    telefone varchar(20) null,
    email varchar(30)
);

insert into telefonica values
(1,"homem arranha","12 9999 9999","homemarranha@gmail.com"),
(2,"capitão america","13 8888 8888","capitãoamerica@gmail.com");