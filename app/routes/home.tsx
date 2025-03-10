import type { Route } from "./+types/home";
import Main from "~/pages/main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Insurance Application" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Main />;
}
