import { AddClientDialog } from "@/components/clients/AddClientDialog";
import { ClientTable } from "@/components/clients/ClientTable";

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
              Clients
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Manage your client master data.
            </p>
          </div>
          <AddClientDialog />
        </div>

        {/* Table Container */}
        <div className="overflow-hidden">
          <ClientTable />
        </div>
      </div>
    </div>
  );
}