PGDMP     #                     z            Tausch #   12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)    14.2     t           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            u           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            v           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            w           1262    16397    Tausch    DATABASE     Y   CREATE DATABASE "Tausch" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
    DROP DATABASE "Tausch";
                postgres    false            x           0    0    DATABASE "Tausch"    ACL     3   GRANT ALL ON DATABASE "Tausch" TO tauschdeveloper;
                   postgres    false    2935            �            1259    16501    activation_token    TABLE     �   CREATE TABLE public.activation_token (
    email character varying NOT NULL,
    token character varying NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL
);
 $   DROP TABLE public.activation_token;
       public         heap    tauschdeveloper    false            �
           2606    16508 &   activation_token activation_token_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.activation_token
    ADD CONSTRAINT activation_token_pkey PRIMARY KEY (email);
 P   ALTER TABLE ONLY public.activation_token DROP CONSTRAINT activation_token_pkey;
       public            tauschdeveloper    false    205            �
           2606    16509    activation_token email    FK CONSTRAINT     x   ALTER TABLE ONLY public.activation_token
    ADD CONSTRAINT email FOREIGN KEY (email) REFERENCES public.usuario(email);
 @   ALTER TABLE ONLY public.activation_token DROP CONSTRAINT email;
       public          tauschdeveloper    false    205           