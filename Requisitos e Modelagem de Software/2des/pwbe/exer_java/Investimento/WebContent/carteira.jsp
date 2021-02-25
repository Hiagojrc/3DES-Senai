<%@page import="controllers.CarteirasControllers"%>
<%@page import="controllers.Carteira"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Carteira</title>
</head>
<body>
<table>
		<thead>
			<th>id Cliente</th>
			<th>Nome</th>
			<th>lucro Esperado</th>
			<th>Prejuizo Maximo</th>
			<th>Perfil de Investimento</th>
		</thead>
		<tbody>
			<%
				for (Carteira c : CarteirasControllers.getCarteiras()) {
				out.print("<tr>");
				out.print(c.toHTML());
				out.print("<td><button>Atualizar</button>");
				out.print("<button>Excluir</button></td>");
				out.print("</tr>");
			}
			%>
			<tr>
				<form method="POST" action="carteira">
					<td>Id</td>
					<td><input type="text" name="nome" placeholder="Nome" /></td>
					<td><input type="number" name="lucro_esperado" placeholder="Lucro Esperado" /></td>
					<td><input type="number" name="prejuiso_maximo" placeholder="Prejuizo Maximo" /></td>
					<td><select name="perfil_investimento">
						<option>Perfil de Investimento</option>
						<option>Conservador</option>
						<option>Moderado</option>
						<option>Agressivo</option>						
					</select></td>
					<td><input type="submit" value="Cadastrar"/></td>
				</form>
			</tr>
		</tbody>
	</table>
</body>
</html>