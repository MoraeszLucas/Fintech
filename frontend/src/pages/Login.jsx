import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro(''); 

        try {
           
            const response = await api.post('/api/users/login', { 
                email: email, 
                senha: senha 
            });
            
            console.log("Sucesso!", response.data);
            navigate('/dashboard'); 
        } catch (error) {
            console.error("Falha no login", error);
            setErro('Email ou palavra-passe incorretos!');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f9' }}>
            <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '300px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Prisma Fintech</h2>
                
                {erro && <p style={{ color: 'red', textAlign: 'center', fontSize: '14px', marginBottom: '15px' }}>{erro}</p>}
                
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ fontSize: '14px', color: '#666' }}>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                        />
                    </div>
                    
                    <div>
                        <label style={{ fontSize: '14px', color: '#666' }}>Palavra-passe</label>
                        <input 
                            type="password" 
                            value={senha} 
                            onChange={(e) => setSenha(e.target.value)} 
                            required 
                            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                        />
                    </div>
                    
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;