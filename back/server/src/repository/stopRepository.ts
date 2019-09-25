import {EntityRepository, Repository} from "typeorm";
import {Stop} from "../entity/Stop";

@EntityRepository(Stop)
export class StopRepository extends Repository<Stop> {

    async findGeojson() {
        const rawData =  this.query(`SELECT jsonb_build_object(
                    'type',     'FeatureCollection',
                    'features', jsonb_agg(feature)
                ) as geojson
                FROM (
                SELECT jsonb_build_object(
                    'type',       'Feature',
                    'geometry',   ST_AsGeoJSON(geom)::jsonb,
                    'properties', to_jsonb(row) - 'geom'
                ) AS feature
                FROM (SELECT * FROM stop) row) features`);
                /*const rawData =  this.query(`SELECT row_to_json(fc)
 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
 FROM (SELECT 'Feature' As type
    , ST_AsGeoJSON(st.geom)::json As geometry
    , row_to_json((SELECT l FROM (SELECT stop_id, name, people_off, people_on, prev_stop_id
    ,next_stop_id,reach_pop_30_walk ,reach_pop_30_bike, lat, lng) As l
      )) As properties
   FROM stop As st   ) As f )  As fc;`);*/
         return rawData;
    }

}