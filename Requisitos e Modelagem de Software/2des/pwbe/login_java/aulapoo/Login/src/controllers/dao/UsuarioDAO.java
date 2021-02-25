package controllers.dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import model.Usuario;

public class UsuarioDAO {
	private BufferedReader br;
	private BufferedWriter bw;
	private String arquivo = "./bd/usuarios.csv";
	private String[] campos;
	private Usuario usuario;
	
	public ArrayList<Usuario> getUsuarios(){
		ArrayList<Usuario> usuarios = new ArrayList<>();
		try {
			br = new BufferedReader(new FileReader(arquivo));
			String linha = br.readLine();
			while(linha != null) {
				campos = linha.split(";");
				usuario = new Usuario();
				usuario.setLogin(campos[0]);
				usuario.setSenha(campos[1]);
				usuarios.add(usuario);
				linha = br.readLine();
			}
			br.close();
		} catch (FileNotFoundException e) {
			System.out.println("Arquivo " + arquivo + " não encontrado.");
		} catch (IOException e) {
			System.out.println("Erro "+e);
		}
		return usuarios;
	}
	
	public void setUsuarios(ArrayList<Usuario> usuarios) {
		try {
			bw = new BufferedWriter(new FileWriter(arquivo));
			for(Usuario u: usuarios) {
				bw.write(u.toCSV());
			}
			bw.close();
		} catch (IOException e) {
			System.out.println("Erro: "+e);
		}
		
	}
	
}
