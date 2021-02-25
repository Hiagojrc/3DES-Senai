<%@page import="java.util.ArrayList"%>
<%@page import="model.dao.ClienteDAO"%>
<%@page import="model.Cliente"%>
<%@page import="java.util.*"%>
<%@ page language="java" contentType="text/html; charset=UTF8"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF8">
<title>Cliente</title>
</head>
<body>
	<form method="POST">
		<input type="text" size="12" name="cpf" placeholder="cpf" />
				<input type="text" size="12" name="telefone" placeholder="telefone" />
		<input type="text" size="12" name="nome" placeholder="nome" />
		<input type="text" size="12" name="ano" placeholder="ano" /></br></br>
	
		<input type="submit" value="Cadastrar Cliente" /> 
	</form> </br>
		<table border="0">
		<thead>
			<tr>
				<th>Cpf</th>
				<th>Nome</th>
				<th>Ano</th>
				<th>Telefone</th>
			</tr>
		</thead>
		<tbody>
		<%
		Cliente cliente;
		ClienteDAO cd = new ClienteDAO();
		ArrayList<Cliente> clientes = cd.open();
		String cpf = request.getParameter("cpf");
		String telefone = request.getParameter("telefone");
		String nome = request.getParameter("nome");
		String ano = request.getParameter("ano");
				
		if (cpf != null && nome != null && ano != null && telefone != null) {
			cliente = new Cliente(); 
			cliente.setCpf(cpf);
			cliente.setNome(nome);
			cliente.setAno(ano);
			cliente.setTelefone(telefone);
			//clientes.add(cliente);
			if (!clientes.contains(clientes)) {
				clientes.add(cliente);
				cd.save(clientes);
				response.sendRedirect("#");
			} else {
				clientes.set(clientes.indexOf(cliente), cliente);
				out.print("Usuário já está cadastrado e foi atualizado");
			}
		}

		if (cpf == null) {
			//Todos
			for (Cliente c : clientes) {
				out.print("<tr>");//Inicio da linha da tabela
				out.print(c.toHTML()); //Percorre toda a lista
				out.print("<form method='POST'>");
				out.print("<td><input type='hidden' name='delete' value='" + c.getCpf() + "' ></td>");
				out.print("<td><input type='submit' value=	' - '></td>");
				out.print("</form>");
				out.print("</tr>");//Fim da linha da tabela
			}
		} else {
			cliente = new Cliente();
			cliente.setCpf(request.getParameter("cpf"));
			if (clientes.contains(clientes)) {
				//Só um
				out.print("<tr>");
				out.print(clientes.get(clientes.indexOf(cliente)).toHTML());
				out.print("<td><input type='submit' value=	' - '></td>");
				out.print("</tr>");
			} else {
				out.print("Cpf não encontrada.");
			}
		}
		
		if (request.getParameter("delete") != null) {
			cliente = new Cliente();
			cliente.setCpf(request.getParameter("delete"));
			clientes.remove(clientes.indexOf(cliente));
			cd.save(clientes);
			response.sendRedirect("#"); //Renova a página respondendo vazio #
			out.print("Usuário removido com sucesso");
		}
		%>
		</tbody>
	</table>
</body>
</html>