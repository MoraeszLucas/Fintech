package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Receita;
import br.com.fiap.fintech.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository repository;

    public List<Receita> listarTodas(){
        return repository.findAll();
    }

    public Optional<Receita> buscarPorId(long id){
        return repository.findById(id);

    }

    public Receita salvar(Receita receita){
        return repository.save(receita);
    }

    public void deletar(Long id){
        repository.deleteById(id);
    }
}
