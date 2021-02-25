package controllers;

import java.util.ArrayList;

import controllers.dao.UsuarioDAO;
import model.Usuario;

public class ProcessaUsuarios {

	private static ArrayList<Usuario> usuarios = new ArrayList<>();
	private static UsuarioDAO ud = new UsuarioDAO();

	public static ArrayList<Usuario> getUsuarios() {
		return usuarios;
	}

	public static void setUsuarios(ArrayList<Usuario> usuarios) {
		ProcessaUsuarios.usuarios = usuarios;
	}

	public static void open() {
		usuarios = ud.getUsuarios();
	}
	
	public static void save() {
		ud.setUsuarios(usuarios);
	}
}
