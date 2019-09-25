import { Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Stop {
    @PrimaryColumn()
    stop_id: string;

    // id of the stop
    @Column()
    name: string;

    // name of the stop
    @Column()
    people_off: number;

    //number of people getting off at that stop
    @Column()
    people_on: number;

    // number of people getting on at that stop
    @Column()
    prev_stop_id: string;

    // id of the previous stop
    @Column()
    next_stop_id: string;

    // id of the next stop
    @Column()
    reach_pop_30_walk: number;

    // number of reachable population in 30 min (walk)
    @Column()
    reach_pop_30_bike: number;

    // number of reachable population in 30 min (bike)
    @Column("float")
    lat: number;

    // latitude coordinate
    @Column("float")
    lng: number;
    // longitude coordinate

    // coordiantes
    @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 4326})
    geom!: string;
}