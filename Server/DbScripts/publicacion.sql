PGDMP                         z            Tausch #   12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)    14.2 
    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    Tausch    DATABASE     Y   CREATE DATABASE "Tausch" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
    DROP DATABASE "Tausch";
                postgres    false            �           0    0    DATABASE "Tausch"    ACL     3   GRANT ALL ON DATABASE "Tausch" TO tauschdeveloper;
                   postgres    false    2949            �            1259    16525    publicacion    TABLE       CREATE TABLE public.publicacion (
    email character varying(50) NOT NULL,
    id bigint NOT NULL,
    titulo character varying(50) NOT NULL,
    categoria character varying(30) NOT NULL,
    subcategoria character varying(30),
    descripcion character varying(200),
    fecha_publicacion date NOT NULL,
    estado_item character varying(30),
    activa boolean DEFAULT true NOT NULL,
    intercambio_por character varying(30),
    numero_propuestas integer DEFAULT 0,
    imagen bytea,
    CONSTRAINT valores_categoria CHECK (((categoria)::text = ANY ((ARRAY['Tecnología'::character varying, 'Ropa y accesorios'::character varying, 'Deportes'::character varying, 'Arte'::character varying, 'Entretenimiento'::character varying, 'Hogar'::character varying, 'Servicios'::character varying, 'Libros y revistas'::character varying, 'Música'::character varying, 'Vehículos'::character varying, 'Otros'::character varying])::text[]))),
    CONSTRAINT valores_estado_item CHECK (((estado_item)::text = ANY ((ARRAY['nuevo'::character varying, 'usado'::character varying])::text[]))),
    CONSTRAINT valores_intercambio_por CHECK (((intercambio_por)::text = ANY ((ARRAY['Tecnología'::character varying, 'Ropa y accesorios'::character varying, 'Deportes'::character varying, 'Arte'::character varying, 'Entretenimiento'::character varying, 'Hogar'::character varying, 'Servicios'::character varying, 'Libros y revistas'::character varying, 'Música'::character varying, 'Vehículos'::character varying, 'Otros'::character varying])::text[])))
);
    DROP TABLE public.publicacion;
       public         heap    tauschdeveloper    false            �           0    0    TABLE publicacion    COMMENT     \   COMMENT ON TABLE public.publicacion IS 'guarda datos de las publicaciones de los usuarios';
          public          tauschdeveloper    false    206            �            1259    16523    publicacion_id_seq    SEQUENCE     �   ALTER TABLE public.publicacion ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.publicacion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          tauschdeveloper    false    206                        2606    16537    publicacion publicacion_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.publicacion
    ADD CONSTRAINT publicacion_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.publicacion DROP CONSTRAINT publicacion_pkey;
       public            tauschdeveloper    false    206                       2606    16538    publicacion email foraneo    FK CONSTRAINT     �   ALTER TABLE ONLY public.publicacion
    ADD CONSTRAINT "email foraneo" FOREIGN KEY (email) REFERENCES public.usuario(email) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.publicacion DROP CONSTRAINT "email foraneo";
       public          tauschdeveloper    false    206           