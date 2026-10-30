CREATE SEQUENCE SEQ_PRODUTOS
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE TABLE tbl_produto (
    id NUMBER(18) NOT NULL,
    nome varchar(255) NOT NULL,
    valor NUMBER (10, 2) NOT NULL,
    quantidade NUMBER(10) NOT NULL,
    data_fabricacao DATE NOT NULL,
    CONSTRAINT pk_produtos PRIMARY KEY (id)
);

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

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
