import { Router } from "express";
import fs from "fs";
import path from "path";

export async function registerRoutes(router: Router) {
  let routes = fs.readdirSync(path.resolve(__dirname));
  routes = routes.filter((file) => file !== "index.ts");

  routes.map((route) => register(route, router));
}

function register(routePath: string, router: Router) {
  const parsedPath = getRouterPath(routePath);
  const route = require(parsedPath);
  route.register(router);
}

function getRouterPath(routerName: string): string {
  return `./${routerName.slice(0, routerName.length - 3)}`;
}
