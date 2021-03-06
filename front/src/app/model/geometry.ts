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


/**
 * GeoJSon geometry
 */
export interface Geometry { 
    /**
     * the geometry type
     */
    type: Geometry.TypeEnum;
}
export namespace Geometry {
    export type TypeEnum = 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon';
    export const TypeEnum = {
        Point: 'Point' as TypeEnum,
        LineString: 'LineString' as TypeEnum,
        Polygon: 'Polygon' as TypeEnum,
        MultiPoint: 'MultiPoint' as TypeEnum,
        MultiLineString: 'MultiLineString' as TypeEnum,
        MultiPolygon: 'MultiPolygon' as TypeEnum
    };
}
