PGDMP     "                    z            Tausch #   12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)    14.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    Tausch    DATABASE     Y   CREATE DATABASE "Tausch" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
    DROP DATABASE "Tausch";
                postgres    false            �           0    0    DATABASE "Tausch"    ACL     3   GRANT ALL ON DATABASE "Tausch" TO tauschdeveloper;
                   postgres    false    2951            �            1259    16545 	   propuesta    TABLE     �  CREATE TABLE public.propuesta (
    email_proponente character varying(45) NOT NULL,
    email_receptor character varying(45) NOT NULL,
    id_propuesta bigint NOT NULL,
    id_publicacion_receptor bigint NOT NULL,
    id_publicacion_proponente bigint,
    mensaje character varying(200),
    fecha_propuesta date NOT NULL,
    estado_propuesta character varying(30) DEFAULT 'en espera'::character varying NOT NULL,
    fecha_trueque date,
    numero_confirmaciones smallint DEFAULT 0 NOT NULL
);
    DROP TABLE public.propuesta;
       public         heap    tauschdeveloper    false            �            1259    16543    propuesta_id_propuesta_seq    SEQUENCE     �   ALTER TABLE public.propuesta ALTER COLUMN id_propuesta ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.propuesta_id_propuesta_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          tauschdeveloper    false    208            �
           2606    16551    propuesta propuesta_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.propuesta
    ADD CONSTRAINT propuesta_pkey PRIMARY KEY (id_propuesta);
 B   ALTER TABLE ONLY public.propuesta DROP CONSTRAINT propuesta_pkey;
       public            tauschdeveloper    false    208            �
           2606    16577    propuesta tipos_estado    CHECK CONSTRAINT       ALTER TABLE public.propuesta
    ADD CONSTRAINT tipos_estado CHECK (((estado_propuesta)::text = ANY (ARRAY[('en espera'::character varying)::text, ('aceptada'::character varying)::text, ('rechazada'::character varying)::text, ('concluida'::character varying)::text]))) NOT VALID;
 ;   ALTER TABLE public.propuesta DROP CONSTRAINT tipos_estado;
       public          tauschdeveloper    false    208    208                       2620    16575    propuesta trigger_propuesta    TRIGGER     ~   CREATE TRIGGER trigger_propuesta AFTER INSERT ON public.propuesta FOR EACH ROW EXECUTE FUNCTION public.aumentar_propuestas();
 4   DROP TRIGGER trigger_propuesta ON public.propuesta;
       public          tauschdeveloper    false    208            �
           2606    16552 "   propuesta email_proponente_foraneo    FK CONSTRAINT     �   ALTER TABLE ONLY public.propuesta
    ADD CONSTRAINT email_proponente_foraneo FOREIGN KEY (email_proponente) REFERENCES public.usuario(email) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.propuesta DROP CONSTRAINT email_proponente_foraneo;
       public          tauschdeveloper    false    208                        2606    16557     propuesta email_receptor_foraneo    FK CONSTRAINT     �   ALTER TABLE ONLY public.propuesta
    ADD CONSTRAINT email_receptor_foraneo FOREIGN KEY (email_receptor) REFERENCES public.usuario(email) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.propuesta DROP CONSTRAINT email_receptor_foraneo;
       public          tauschdeveloper    false    208                       2606    16567 (   propuesta publicacion_proponente_foraneo    FK CONSTRAINT     �   ALTER TABLE ONLY public.propuesta
    ADD CONSTRAINT publicacion_proponente_foraneo FOREIGN KEY (id_publicacion_proponente) REFERENCES public.publicacion(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.propuesta DROP CONSTRAINT publicacion_proponente_foraneo;
       public          tauschdeveloper    false    208                       2606    16562 &   propuesta publicacion_receptor_foraneo    FK CONSTRAINT     �   ALTER TABLE ONLY public.propuesta
    ADD CONSTRAINT publicacion_receptor_foraneo FOREIGN KEY (id_publicacion_receptor) REFERENCES public.publicacion(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.propuesta DROP CONSTRAINT publicacion_receptor_foraneo;
       public          tauschdeveloper    false    208           