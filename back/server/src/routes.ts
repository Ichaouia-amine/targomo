import {StopController} from "./controller/StopController";

export const Routes = [{
    method: "get",
    route: "/stops",
    controller: StopController,
    action: "all"
}, {
    method: "get",
    route: "/stops/:id",
    controller: StopController,
    action: "one"
}, {
    method: "post",
    route: "/stops",
    controller: StopController,
    action: "save"
}, {
    method: "delete",
    route: "/stops/:id",
    controller: StopController,
    action: "remove"
}, {
    method: "get",
    route: "/stopsGeojson",
    controller: StopController,
    action: "getGeojson"
}];