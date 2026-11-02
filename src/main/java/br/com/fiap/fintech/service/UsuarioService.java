package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Usuario;
import br.com.fiap.fintech.repository.UsuarioRepository;
import org.apache.catalina.LifecycleState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public List<Usuario> listarTodos(){
        return repository.findAll();
    }

    public Optional<Usuario> buscarPorID(Long id){
        return repository.findById(id);
    }

    public Usuario salvar(Usuario usuario){
        return repository.save(usuario);
    }

    public void deletar(Long id){
        repository.deleteById(id);
    }

    public java.util.Optional<Usuario> validarLogin(String email, String senha) {
        return repository.findByEmailAndSenha(email, senha);
    }
}
