package views;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

import controllers.ProcessaUsuarios;
import model.Usuario;

public class MainForm extends JFrame implements ActionListener {

	private static final long serialVersionUID = 1L;
	private JPanel panel = new JPanel();
	private JMenu menu = new JMenu("Usuário");
	private JMenuBar buteco = new JMenuBar();
	private JMenuItem itemConfig = new JMenuItem("Configurações");
	private JMenuItem itemCadastrar = new JMenuItem("Cadastrar");
	private JMenuItem itemListar = new JMenuItem("Listar");
	private JMenuItem itemSair = new JMenuItem("Sair");
	private JLabel lbLogin = new JLabel("Login");
	private JLabel lbSenha = new JLabel("Senha");
	private JTextField tfLogin = new JTextField();
	private JPasswordField pfSenha = new JPasswordField();
	private JButton btAdd = new JButton("Adicionar");
	private JButton btSalvar = new JButton("Salvar");
	private DefaultTableModel dtm;
	private JTable table;
	private JScrollPane scroll;
	private Usuario usuario;

	MainForm() {
		//Alteracao de Teste
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setTitle("Área do Usuário.");
		setBounds(300, 100, 800, 550);
		setJMenuBar(buteco);
		setContentPane(panel);
		setLayout(null);

		buteco.add(menu);
		menu.add(itemConfig);
		menu.add(itemCadastrar);
		menu.add(itemListar);
		menu.addSeparator();
		menu.add(itemSair);

		lbLogin.setBounds(110, 30, 200, 30);
		tfLogin.setBounds(110, 60, 200, 30);
		lbSenha.setBounds(310, 30, 200, 30);
		pfSenha.setBounds(310, 60, 200, 30);
		btAdd.setBounds(510, 60, 100, 30);
		btSalvar.setBounds(610, 60, 100, 30);
		panel.add(lbLogin);
		panel.add(lbSenha);
		panel.add(tfLogin);
		panel.add(pfSenha);
		panel.add(btAdd);
		panel.add(btSalvar);

		btAdd.addActionListener(this);
		btSalvar.addActionListener(this);

		dtm = new DefaultTableModel();
		dtm.addColumn("Login");
		dtm.addColumn("Senha");
		for (Usuario u : ProcessaUsuarios.getUsuarios()) {
			dtm.addRow(u.toVetor());
		}
		table = new JTable(dtm);
		scroll = new JScrollPane(table);
		scroll.setBounds(20, 100, 740, 370);
		panel.add(scroll);

	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if (e.getSource() == btAdd) {
			usuario = new Usuario();
			usuario.setLogin(tfLogin.getText());
			String senha = new String(pfSenha.getPassword());
			usuario.setSenha(usuario.encripta(senha));
			dtm.addRow(usuario.toVetor());
		} else if (e.getSource() == btSalvar) {
			ArrayList<Usuario> usuarios = new ArrayList<>();
			Usuario usuario;
			for (int i = 0; i < table.getRowCount(); i++) {
				usuario = new Usuario();
				usuario.setLogin(table.getValueAt(i, 0).toString());
				usuario.setSenha(table.getValueAt(i, 1).toString());
				usuarios.add(usuario);
			}
			ProcessaUsuarios.setUsuarios(usuarios);
			ProcessaUsuarios.save();
		}
	}

	public static void main(String[] args) {

		ProcessaUsuarios.open();
		MainForm mf = new MainForm();
		mf.setVisible(true);

		LoginForm lf = new LoginForm();
		lf.setModal(true);
		lf.setVisible(true);

		/*String s = "admin";
		MessageDigest m;
		try {
			m = MessageDigest.getInstance("MD5");
			m.update(s.getBytes(), 0, s.length());
			System.out.println("MD5: " + new BigInteger(1, m.digest()).toString(16));
		} catch (NoSuchAlgorithmException e) {
			System.out.println(e);
		}*/


	}

}
