import { AddClientDialog } from "@/components/clients/AddClientDialog";
import { ClientTable } from "@/components/clients/ClientTable";

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Clients
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your client master data.
            </p>
          </div>
          <AddClientDialog />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <ClientTable />
        </div>
      </div>
    </div>
  );
}