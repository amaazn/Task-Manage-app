import { redirect } from "next/navigation";

export default function RootPage() {
  // This tells Next.js: "If someone lands on '/', send them to '/login' immediately."
  redirect("/login");
}
