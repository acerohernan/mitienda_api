import { Router } from "express";

export function register(router: Router) {
  router.get("/status", (req, res) => res.sendStatus(200));
}
