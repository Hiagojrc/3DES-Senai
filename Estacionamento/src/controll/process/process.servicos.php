<?php

	require("../../domain/connection.php");
	require("../../domain/Servicos.php");

	class ServicosProcess {
		var $sd;

		function doGet($arr){
			$sd = new ServicosDAO();
			if($arr["id_servico"]=="0"){
				$sucess = $sd->readView();
			}/*else{
				$sucess = $sd->read($arr["id_servico"]);
			}*/
			
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doPost($arr){
			$sd = new ServicosDAO();
			$servicos = new Servicos();
			$servicos->setTipo($arr["tipo"]);
			$servicos->setPlaca($arr["placa"]);
			$servicos->setData_de_registro($arr["data_de_registro"]);
			$servicos->setEntrada($arr["entrada"]);
			$servicos->setSaida($arr["saida"]);
			$servicos->setValor($arr["valor"]);
			$sucess = $sd->create($servicos);
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doPut($arr){
			$sd = new ServicosDAO();
			$servicos = new Servicos();
			$servicos->setId_servico($arr["id_servico"]);
			$servicos->setTipo($arr["tipo"]);
			$servicos->setPlaca($arr["placa"]);
			$servicos->setData_de_registro($arr["data_de_registro"]);
			$servicos->setEntrada($arr["entrada"]);
			$servicos->setSaida($arr["saida"]);
			$servicos->setValor($arr["valor"]);
			$sucess = $sd->update($servicos);
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doDelete($arr){
			$sd = new ServicosDAO();
			$sucess = $sd->delete($arr["id_servico"]);
			http_response_code(200);
			echo json_encode($sucess);
		}
	}