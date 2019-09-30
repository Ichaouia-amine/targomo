# targomo

## Server 

## Project Build with TypeORM
Steps to run this project:
0. cd back/server

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file

    "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "postgres",
   "password": "postgres",
   "database": "targomo"

   && 
   Create dataBase

        -- DROP DATABASE targomo;

        CREATE DATABASE targomo
        WITH OWNER = postgres
            ENCODING = 'UTF8'
            TABLESPACE = pg_default
            LC_COLLATE = 'French_France.1252'
            LC_CTYPE = 'French_France.1252'
            CONNECTION LIMIT = -1;


        -- Extension: postgis

        -- DROP EXTENSION postgis;

        CREATE EXTENSION postgis
        SCHEMA public
        VERSION "2.3.7";
        

        -- DROP TABLE public.stop;

        CREATE TABLE public.stop
        (
        stop_id character varying NOT NULL,
        name character varying NOT NULL,
        people_off integer NOT NULL,
        people_on integer NOT NULL,
        prev_stop_id character varying NOT NULL,
        next_stop_id character varying NOT NULL,
        reach_pop_30_walk integer NOT NULL,
        reach_pop_30_bike integer NOT NULL,
        lat double precision NOT NULL,
        lng double precision NOT NULL,
        geom geometry(Point,4326),
        CONSTRAINT "PK_6522d349488a7c5bc31e985b84f" PRIMARY KEY (stop_id)
        )
        WITH (
        OIDS=FALSE
        );
        ALTER TABLE public.stop
        OWNER TO postgres;

        -- Index: public.stop_geom_index

        -- DROP INDEX public.stop_geom_index;

        CREATE INDEX stop_geom_index
        ON public.stop
        USING gist
        (geom);
        
        && Isert data from file insert.txt

3. Run `npm start` command
4. view api description
    http://localhost:3000/swagger


## Front

run : cd front 

## This project was generated with [Angular CLI]

(https://github.com/angular/angular-cli) version 8.2.2.

## Development server

Run `npm run start` for a dev server and use angular proxy for x. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests (karma-jasmine, PhantomJS)

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


