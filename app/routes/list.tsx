import type { Route } from "./+types/home";
import List from "~/pages/list";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Insurance Application | list" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <List />;
}
