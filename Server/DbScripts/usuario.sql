PGDMP                          z            Tausch #   12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)    14.2     {           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            |           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            }           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ~           1262    16397    Tausch    DATABASE     Y   CREATE DATABASE "Tausch" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
    DROP DATABASE "Tausch";
                postgres    false                       0    0    DATABASE "Tausch"    ACL     3   GRANT ALL ON DATABASE "Tausch" TO tauschdeveloper;
                   postgres    false    2942            �            1259    16443    usuario    TABLE     c  CREATE TABLE public.usuario (
    nombre_de_usuario character varying(30) NOT NULL,
    email character varying(45) NOT NULL,
    login_de_google boolean NOT NULL,
    password character varying(65) NOT NULL,
    estado_de_cuenta boolean NOT NULL,
    tipo_de_usuario character varying(15) NOT NULL,
    fecha_de_registro date NOT NULL,
    CONSTRAINT regex_nombre_usuario CHECK (((nombre_de_usuario)::text ~ '^(?=.*[A-Za-z])\S{3,}$'::text)),
    CONSTRAINT "tipo_válido_de_usuario" CHECK (((tipo_de_usuario)::text = ANY ((ARRAY['Administrador'::character varying, 'Regular'::character varying])::text[])))
);
    DROP TABLE public.usuario;
       public         heap    tauschdeveloper    false            �           0    0    TABLE usuario    COMMENT     Q   COMMENT ON TABLE public.usuario IS 'Tabla datos generales e inicio de sesión ';
          public          tauschdeveloper    false    203            �
           2606    16517    usuario email_unique 
   CONSTRAINT     P   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT email_unique UNIQUE (email);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT email_unique;
       public            tauschdeveloper    false    203            �
           2606    16486    usuario nombre_usuario_unico 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT nombre_usuario_unico UNIQUE (nombre_de_usuario);
 F   ALTER TABLE ONLY public.usuario DROP CONSTRAINT nombre_usuario_unico;
       public            tauschdeveloper    false    203            �
           2606    16451    usuario regex_email    CHECK CONSTRAINT     �   ALTER TABLE public.usuario
    ADD CONSTRAINT regex_email CHECK (((email)::text ~ '^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$'::text)) NOT VALID;
 8   ALTER TABLE public.usuario DROP CONSTRAINT regex_email;
       public          tauschdeveloper    false    203    203            �
           2606    16515    usuario regex_password    CHECK CONSTRAINT     �   ALTER TABLE public.usuario
    ADD CONSTRAINT regex_password CHECK (((password)::text ~ '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'::text)) NOT VALID;
 ;   ALTER TABLE public.usuario DROP CONSTRAINT regex_password;
       public          tauschdeveloper    false    203    203            �
           2606    16449    usuario usuario_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (email);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            tauschdeveloper    false    203           