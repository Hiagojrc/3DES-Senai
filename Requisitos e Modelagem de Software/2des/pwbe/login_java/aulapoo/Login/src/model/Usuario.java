package model;

public class Usuario {

	private String login;
	private String senha;
	
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((login == null) ? 0 : login.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		if (login == null) {
			if (other.login != null)
				return false;
		} else if (!login.equals(other.login))
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "usuario [login=" + login + ", senha=" + senha + "]";
	}
	
	public String toCSV() {
		return login + ";"+ senha +"\r\n";
	}
	
	public String[] toVetor() {
		return new String[] { login, senha };
	}
	
	public String encripta(String frase) {
		char[] c = frase.toCharArray();
		for(int i = 0; i < c.length; i++) {
			c[i] = (char) c[c.length - 1 - i];
		}
		return new String(c);
	}
}
