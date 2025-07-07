import { redirect } from "next/navigation";

export default function Home() {
  const session = true;

  if (session) {
    redirect("/dashboard/1");
  }

  return (
    <main>
      <h1>Welcome to Pawlytics</h1>
      <p>Track your pet hotel performance with our dashboards</p>
    </main>
  );
}
