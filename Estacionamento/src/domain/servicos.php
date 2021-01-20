<?php

	class Servicos {
		var $id_servico;
		var $tipo;
		var $placa;
		var $data_de_registro;
		var $entrada;
		var $saida;
		var $tempo_na_vaga;
		var $valor;
		

		function getId_servico(){
			return $this->id_servico;
		}
		function setId_servico($id_servico){
			$this->id_servico = $id_servico;
		}

		function getTipo(){
			return $this->tipo;
		}
		function setTipo($tipo){
			$this->tipo = $tipo;
		}

		function getPlaca(){
			return $this->placa;
		}
		function setPlaca($placa){
			$this->placa = $placa;
		}
		function getData_de_registro(){
			return $this->data_de_registro;
		}

		function setData_de_registro($data_de_registro){
			$this->data_de_registro = $data_de_registro;
		}

		function getEntrada(){
			return $this->entrada;
		}
		function setEntrada($entrada){
			$this->entrada = $entrada;
		}

		function getSaida(){
			return $this->saida;
		}
		function setSaida($saida){
			$this->saida = $saida;
		}

		function getTempo_na_vaga(){
			return $this->tempo_na_vaga;
		}
		function setTempo_na_vaga($tempo_na_vaga){
			$this->tempo_na_vaga = $tempo_na_vaga;
		}

		function getValor(){
			return $this->valor;
		}
		function setValor($valor){
			$this->valor = $valor;
		}

		
		
	}

	class ServicosDAO {

		function create($servicos) {
			$result = array();

			try {
				$query = "INSERT INTO servicos VALUES (default, '".$servicos->getTipo()."','".$servicos->getPlaca()."',CURDATE(),CURTIME(), '".$servicos->getSaida()."', '".$servicos->getValor()."')";

				$con = new Connection();
				
				if(Connection::getInstance()->exec($query) >= 1){
					$result["id_servico"] = connection::getInstance()->lastInsertId();
					$result["tipo"] = $servicos->getTipo();
					$result["placa"] = $servicos->getPlaca();
					$result["data_de_registro"] = $servicos->getData_de_registro();
					$result["entrada"] = $servicos->getEntrada();
					$result["saida"] = $servicos->getSaida();
					$result["valor"] = $servicos->getValor();
				} else{
					$result["erro"] = "Não foi possivel adicionar veiculo.!!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}
		function readView() {
			$result = array();
			
			try {
				$query = "SELECT * FROM vw_Proprietario";
				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($linha = $resultSet->fetchObject()){
					$servicos = new Servicos();
					$servicos->setId_servico($linha->id_servico);
					$servicos->setTipo($linha->tipo);
					$servicos->setPlaca($linha->placa);
					$servicos->setData_de_registro($linha->data_de_registro);
					$servicos->setEntrada($linha->entrada);
					$servicos->setSaida($linha->saida);
					$servicos->setTempo_na_vaga($linha->tempo_na_vaga);
					$servicos->setValor($linha->valor_total);
					$result[] = $servicos;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

		function update($serv) {
			$result = array();
			$id_servico = $serv-> getId_servico();
			$tipo = $serv-> getTipo();
			$placa = $serv-> getPlaca();
			$data_de_registro = $serv-> getData_de_registro();
			$entrada = $serv-> getEntrada();
			$saida = $serv-> getSaida();
			$valor = $serv-> getValor();

			try {
				$query = "UPDATE servicos SET tipo = '$tipo', placa = '$placa',data_de_registro = '$data_de_registro',entrada = '$entrada',saida = '$saida',valor = '$valor' WHERE id_servico = $id_servico";

				$con = new Connection();

				$status = Connection::getInstance()->prepare($query);
				
				if($status->execute()){
					$result = $serv;
				}else{
					$result["erro"] = "Não foi possivel atualizar os dados";
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

		function delete($id_servico) {
			$result = array();
			$query = "DELETE FROM servicos WHERE id_servico = $id_servico";
			try {
			
				$con = new Connection();

				if(Connection::getInstance()->exec($query) >= 1){
					$result["cod"] = 1;
					$result["msg"] = "Veiculo excluido!!!";
				}else{
					$result["cod"] = 2;
					$result["msg"] = "Veiculo não excluido!!!";
				}

				$con = null;
			}catch(PDOException $e) {
				$result["cod"] = 3;
				$result["msg"] = $e->getMessage();
			}

			return $result;
		}

	}
	