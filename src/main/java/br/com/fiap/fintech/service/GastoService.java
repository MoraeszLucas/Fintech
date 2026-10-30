package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Gasto;
import br.com.fiap.fintech.repository.GastoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GastoService {

    @Autowired
    private GastoRepository repository;

    public List<Gasto> listarTodos(){
        return repository.findAll();
    }

    public Optional<Gasto> buscarPorId(Long id){
        return repository.findById(id);
    }

    public Gasto salvar(Gasto gasto){
        return repository.save(gasto);
    }

    public void deletar(Long id){
        repository.deleteById(id);
    }
}
