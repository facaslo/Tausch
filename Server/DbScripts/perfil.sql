PGDMP     5                     z            Tausch #   12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)    14.2 
    x           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            y           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            z           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            {           1262    16397    Tausch    DATABASE     Y   CREATE DATABASE "Tausch" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
    DROP DATABASE "Tausch";
                postgres    false            |           0    0    DATABASE "Tausch"    ACL     3   GRANT ALL ON DATABASE "Tausch" TO tauschdeveloper;
                   postgres    false    2939            �            1259    16460    perfil    TABLE     �  CREATE TABLE public.perfil (
    nombres character varying(45) NOT NULL,
    apellidos character varying(45) NOT NULL,
    edad smallint NOT NULL,
    celular character varying(15) NOT NULL,
    facebook character varying(30),
    twitter character varying(30),
    instagram character varying(30),
    email character varying(50) NOT NULL,
    CONSTRAINT edad_menor_100 CHECK ((edad <= 100)),
    CONSTRAINT edad_positiva CHECK ((edad >= 1))
);
    DROP TABLE public.perfil;
       public         heap    tauschdeveloper    false            �
           2606    16469    perfil perfil_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT perfil_pkey PRIMARY KEY (email);
 <   ALTER TABLE ONLY public.perfil DROP CONSTRAINT perfil_pkey;
       public            tauschdeveloper    false    204            �
           2606    16482    perfil regex_apellidos    CHECK CONSTRAINT     �   ALTER TABLE public.perfil
    ADD CONSTRAINT regex_apellidos CHECK (((apellidos)::text ~ '^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*$'::text)) NOT VALID;
 ;   ALTER TABLE public.perfil DROP CONSTRAINT regex_apellidos;
       public          tauschdeveloper    false    204    204            �
           2606    16481    perfil regex_nombres    CHECK CONSTRAINT     �   ALTER TABLE public.perfil
    ADD CONSTRAINT regex_nombres CHECK (((nombres)::text ~ '^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*$'::text)) NOT VALID;
 9   ALTER TABLE public.perfil DROP CONSTRAINT regex_nombres;
       public          tauschdeveloper    false    204    204            �
           2606    16476    perfil email    FK CONSTRAINT     n   ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT email FOREIGN KEY (email) REFERENCES public.usuario(email);
 6   ALTER TABLE ONLY public.perfil DROP CONSTRAINT email;
       public          tauschdeveloper    false    204           