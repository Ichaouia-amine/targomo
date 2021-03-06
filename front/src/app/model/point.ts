/**
 * Targomo API
 * This is a sample server Targomo server.
 *
 * OpenAPI spec version: 1.0.0
 * Contact: ichaouia.amine@gmx.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Geometry } from './geometry';
import { Point2D } from './point2D';


/**
 * GeoJSon geometry
 */
export interface Point extends Geometry { 
    coordinates?: Array<Point2D>;
}
export namespace Point {
}
