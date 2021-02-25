<?php
    require("../domain/pessoa.php");
    header("Content-type: application/json");
   
$p1 = new Pessoa();

    $p1->setIdPessoa(1);
    $p1->setNome("André Silva");
    $p1->setTelefone("19 92345-1234");
    echo $p1->getIdPessoa()."<br>";
    echo $p1->getNome()."<br>";
    echo $p1->getTelefone()."<br>";

    var_dump($p1);

    $pessoas = [];

    $pessoa = new Pessoa();
    $pessoa->setIdPessoa(1);
    $pessoa->setNome("Jair Silva");
    $pessoa->setTelefone("19 92345-1234");
    $pessoas[0] = $pessoa;

    $pessoa = new Pessoa();
    $pessoa->setIdPessoa(2);
    $pessoa->setNome("Alice");
    $pessoa->setTelefone("19 92345-0000");
    $pessoas[1] = $pessoa;

    $pessoa = new Pessoa();
    $pessoa->setIdPessoa(3);
    $pessoa->setNome("Silva");
    $pessoa->setTelefone("19 91111-1111");
    $pessoas[2] = $pessoa;
    
    //var_dump($pessoas);
    for($i = 0; $i < count($pessoas); $i++) {
        echo $pessoas[$i]->getIdPessoa();
        echo $pessoas[$i]->getNome();
        echo $pessoas[$i]->getTelefone();
        echo "<br>";
    }
    foreach ($pessoas as $p) {
        echo $p->getIdPessoa();
        echo $p->getNome();
        echo $p->getTelefone();
        echo "<br>";
    }
     //unset($P);
     echo json_encode($pessoas);
