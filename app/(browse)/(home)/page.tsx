import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <main className="flex">
      <p>Dashboard</p>

      <UserButton 
        afterSignOutUrl="/"
      />
    </main>
  );
}
