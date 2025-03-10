import {
    type RouteConfig,
    route,
} from "@react-router/dev/routes";

export default [
    route("/", "./routes/home.tsx"),
    route("/list", "./routes/list.tsx"),
] satisfies RouteConfig;
