import { AddClientDialog } from "@/components/clients/AddClientDialog";
import { ClientTable } from "@/components/clients/ClientTable";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
              Manage your client master data and subscription tiers.
            </p>
          </div>
          <AddClientDialog />
        </div>

        {/* Utilities Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search clients..." 
              className="pl-10 bg-white border-gray-200 focus-visible:ring-green-600"
            />
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" className="text-gray-600 gap-2">
               <Filter className="w-4 h-4" /> Filter
             </Button>
             <Button variant="outline" size="sm" className="text-gray-600 gap-2">
               <Settings2 className="w-4 h-4" /> Columns
             </Button>
             <Button variant="outline" size="sm" className="text-gray-600">
               <Download className="w-4 h-4" />
             </Button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <ClientTable />
          
          {/* Pagination Footer */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-gray-50/50">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">1-10</span> of <span className="font-medium text-gray-900">48</span> clients
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}