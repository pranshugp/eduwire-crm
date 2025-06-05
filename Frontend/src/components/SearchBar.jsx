import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    onSearch(searchTerm).finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow"
      />
      <Button onClick={handleSearch} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : <Search />}
      </Button>
    </div>
  );
}
