package views;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JRootPane;
import javax.swing.JTextField;
import javax.swing.WindowConstants;

import controllers.ProcessaUsuarios;
import model.Usuario;

public class LoginForm extends JDialog implements ActionListener{

	private static final long serialVersionUID = 1L;
	private JPanel panel = new JPanel();
	private JLabel lbNome = new JLabel("Nome");
	private JLabel lbSenha = new JLabel("Senha"); 
	private JLabel lbEsqueci = new JLabel("Esqueci a senha");
	private JTextField tfNome = new JTextField();
	private JPasswordField pfSenha = new JPasswordField();
	private JButton btLogin = new JButton("LOGIN");
	
	LoginForm(){
		getRootPane().setWindowDecorationStyle(JRootPane.PLAIN_DIALOG);
		setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
		setUndecorated(true);
		setTitle("Bem vindo.");
		setBounds(500,100,400,550);
		setContentPane(panel);
		setLayout(null);
	
		lbNome.setBounds(50,100,100, 30);
		tfNome.setBounds(50,130,280, 30);
		lbSenha.setBounds(50,200,100, 30);
		pfSenha.setBounds(50,230,280, 30);
		btLogin.setBounds(50,330,280, 30);
		lbEsqueci.setBounds(50,370,100, 30);
	
		panel.add(lbNome);
		panel.add(lbSenha);
		panel.add(lbEsqueci);
		panel.add(tfNome);
		panel.add(pfSenha);
		panel.add(btLogin);
		btLogin.addActionListener(this);		
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		String senha = new String(pfSenha.getPassword());
		if(e.getSource() == btLogin) {
			boolean encontrado = false;
			for(Usuario u: ProcessaUsuarios.getUsuarios()) {
				if(tfNome.getText().contentEquals(u.getLogin())) {
					encontrado = true;
					if(u.encripta(senha).contentEquals(u.getSenha())) {
						dispose();
					}else {
						JOptionPane.showMessageDialog(this, "A senha não confere.");
					}
				}
			}
			if(!encontrado) {
				JOptionPane.showMessageDialog(this, "Usuário não está cadastrado.");
			}
		}
	}
	
}
