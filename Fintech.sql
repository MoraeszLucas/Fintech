CREATE TABLE categoria 
    ( 
     id_categoria   NUMBER  NOT NULL , 
     ctgr_nome      VARCHAR2 (100)  NOT NULL , 
     ctgr_descricao VARCHAR2 (255) 
    ) 
    LOGGING 
;

ALTER TABLE categoria 
    ADD CONSTRAINT categoria_PK PRIMARY KEY ( id_categoria ) ;

CREATE TABLE gasto 
    ( 
     id_gasto       NUMBER  NOT NULL , 
     gst_valor      NUMBER  NOT NULL , 
     gst_descricao  VARCHAR2 (255) , 
     id_ultilizador NUMBER  NOT NULL , 
     id_categoria   NUMBER  NOT NULL 
    ) 
    LOGGING 
;

ALTER TABLE gasto 
    ADD CONSTRAINT gasto_PK PRIMARY KEY ( id_gasto ) ;

CREATE TABLE receita 
    ( 
     id_receita     NUMBER  NOT NULL , 
     rct_valor      NUMBER  NOT NULL , 
     rct_descricao  VARCHAR2 (255)  NOT NULL , 
     rct_data       DATE  NOT NULL , 
     id_ultilizador NUMBER  NOT NULL 
    ) 
    LOGGING 
;

ALTER TABLE receita 
    ADD CONSTRAINT receita_PK PRIMARY KEY ( id_receita ) ;

CREATE TABLE "user" 
    ( 
     id_user          NUMBER  NOT NULL , 
     usr_name         VARCHAR2 (100)  NOT NULL , 
     usr_email        VARCHAR2 (255)  NOT NULL , 
     usr_passworld    VARCHAR2 (255)  NOT NULL , 
     usr_dataregister DATE  NOT NULL 
    ) 
    LOGGING 
;

ALTER TABLE "user" 
    ADD CONSTRAINT user_PK PRIMARY KEY ( id_user ) ;

ALTER TABLE gasto 
    ADD CONSTRAINT gasto_categoria_FK FOREIGN KEY 
    ( 
     id_categoria
    ) 
    REFERENCES categoria 
    ( 
     id_categoria
    ) 
    NOT DEFERRABLE 
;

ALTER TABLE gasto 
    ADD CONSTRAINT gasto_user_FK FOREIGN KEY 
    ( 
     id_ultilizador
    ) 
    REFERENCES "user" 
    ( 
     id_user
    ) 
    NOT DEFERRABLE 
;

ALTER TABLE receita 
    ADD CONSTRAINT receita_user_FK FOREIGN KEY 
    ( 
     id_ultilizador
    ) 
    REFERENCES "user" 
    ( 
     id_user
    ) 
    NOT DEFERRABLE 
;

INSERT INTO "user" (id_user, usr_name, usr_email, usr_passworld, usr_dataregister) 
VALUES (1, 'Lucas', 'teste@teste.com', '123', SYSDATE);
COMMIT;

INSERT INTO receita (id_receita, rct_descricao, rct_valor, rct_data, id_ultilizador) 
VALUES (1, 'Salário Mensal', 5000.00, SYSDATE, 1);

INSERT INTO receita (id_receita, rct_descricao, rct_valor, rct_data, id_ultilizador) 
VALUES (2, 'Projeto Freelance', 1200.00, SYSDATE, 1);

INSERT INTO receita (id_receita, rct_descricao, rct_valor, rct_data, id_ultilizador) 
VALUES (3, 'Rendimentos', 350.50, SYSDATE, 1);

COMMIT;

SELECT * FROM categoria;
            
INSERT INTO categoria (id_categoria, ctgr_nome) VALUES (1, 'Despesas Gerais');
COMMIT;  

INSERT INTO gasto (id_gasto, gst_descricao, gst_valor, id_ultilizador, id_categoria) 
VALUES (1, 'Aluguel do Apartamento', 1800.00, 1, 1);

INSERT INTO gasto (id_gasto, gst_descricao, gst_valor, id_ultilizador, id_categoria) 
VALUES (2, 'Supermercado', 750.30, 1, 1);

INSERT INTO gasto (id_gasto, gst_descricao, gst_valor, id_ultilizador, id_categoria) 
VALUES (3, 'Conta de Energia', 190.00, 1, 1);

COMMIT;

SELECT table_name, column_name 
FROM user_tab_columns 
WHERE table_name IN ('GASTO', 'RECEITA');

CREATE SEQUENCE gasto_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE receita_seq START WITH 1 INCREMENT BY 1;
    
-- 1. Apaga as sequences atuais
DROP SEQUENCE gasto_seq;
DROP SEQUENCE receita_seq;

-- 2. Recria as sequences iniciando em 100 (ou um número maior que os IDs existentes)
CREATE SEQUENCE sq_gasto START WITH 100 INCREMENT BY 1;
CREATE SEQUENCE sq_receita START WITH 100 INCREMENT BY 1;

COMMIT;

DROP SEQUENCE sq_gasto;
CREATE SEQUENCE sq_gasto START WITH 100 INCREMENT BY 1;
COMMIT;

DROP SEQUENCE sq_gasto;
CREATE SEQUENCE sq_gasto START WITH 500 INCREMENT BY 1;

COMMIT;

ALTER TABLE gasto ADD gst_data DATE;
COMMIT;






















