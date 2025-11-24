'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

// MOCKUP DATA - In Production von API laden
const MOCKUP_MENU_ITEMS = [
  { id: '1', name: 'Latte Macchiato', category: 'Kaffee', price: 340, active: true, stock: true, tags: ['beliebt'] },
  { id: '2', name: 'Cappuccino', category: 'Kaffee', price: 320, active: true, stock: true, tags: [] },
  { id: '3', name: 'Flat White', category: 'Kaffee', price: 360, active: true, stock: true, tags: ['neu'] },
  { id: '4', name: 'Americano', category: 'Kaffee', price: 280, active: true, stock: true, tags: [] },
  { id: '5', name: 'Croissant', category: 'Gebäck', price: 220, active: true, stock: true, tags: ['beliebt'] },
  { id: '6', name: 'Pain au Chocolat', category: 'Gebäck', price: 260, active: true, stock: false, tags: [] },
  { id: '7', name: 'Käsekuchen', category: 'Kuchen', price: 380, active: true, stock: true, tags: ['beliebt'] },
  { id: '8', name: 'Apfelstrudel', category: 'Kuchen', price: 350, active: false, stock: true, tags: [] },
];

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  active: boolean;
  stock: boolean;
  tags: string[];
  description?: string;
}

export default function MerchantMenuPage() {
  const router = useRouter();
  const [items, setItems] = useState<MenuItem[]>(MOCKUP_MENU_ITEMS);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  };

  const toggleItemActive = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
    // MOCKUP: In Production API call
  };

  const toggleItemStock = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: !item.stock } : item
      )
    );
    // MOCKUP: In Production API call
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsEditing(true);
  };

  const handleSaveItem = () => {
    if (!editingItem) return;

    setItems((prev) =>
      prev.map((item) => (item.id === editingItem.id ? editingItem : item))
    );
    setIsEditing(false);
    setEditingItem(null);

    // MOCKUP: In Production API call
    alert('MOCKUP: Änderungen gespeichert!');
  };

  const handleDuplicateItem = (item: MenuItem) => {
    const newItem = {
      ...item,
      id: `${Date.now()}`,
      name: `${item.name} (Kopie)`,
    };
    setItems((prev) => [...prev, newItem]);
    // MOCKUP: In Production API call
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-bold">Menü bearbeiten</h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {items.length} Produkte • {items.filter(i => i.active).length} aktiv
                </p>
              </div>
            </div>

            <Button onClick={() => {
              setEditingItem({
                id: `new-${Date.now()}`,
                name: '',
                category: 'Kaffee',
                price: 0,
                active: true,
                stock: true,
                tags: [],
              });
              setIsEditing(true);
            }}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Neues Produkt
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              type="text"
              placeholder="Produkte durchsuchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base bg-neutral-100 dark:bg-neutral-800 border-0"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Desktop Table View */}
        <Card className="p-6 hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left py-3 px-4 font-semibold">Produkt</th>
                  <th className="text-left py-3 px-4 font-semibold">Kategorie</th>
                  <th className="text-left py-3 px-4 font-semibold">Preis</th>
                  <th className="text-center py-3 px-4 font-semibold">Vorrätig</th>
                  <th className="text-center py-3 px-4 font-semibold">Status</th>
                  <th className="text-right py-3 px-4 font-semibold">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <div className="flex gap-1 mt-1">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold">{formatPrice(item.price)}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => toggleItemStock(item.id)}
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                          item.stock
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        }`}
                      >
                        {item.stock ? '✓' : '✗'}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.active}
                          onChange={() => toggleItemActive(item.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditItem(item)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDuplicateItem(item)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <p className="font-bold text-lg">{formatPrice(item.price)}</p>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Vorrätig:</span>
                  <button
                    onClick={() => toggleItemStock(item.id)}
                    className={`w-8 h-8 rounded flex items-center justify-center ${
                      item.stock
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}
                  >
                    {item.stock ? '✓' : '✗'}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Aktiv:</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.active}
                      onChange={() => toggleItemActive(item.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEditItem(item)}
                >
                  Bearbeiten
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDuplicateItem(item)}
                >
                  Duplizieren
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Edit Sheet */}
      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {editingItem?.id.startsWith('new-') ? 'Neues Produkt' : 'Produkt bearbeiten'}
            </SheetTitle>
            <SheetDescription>
              Ändere die Details deines Produkts
            </SheetDescription>
          </SheetHeader>

          {editingItem && (
            <div className="space-y-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="name">Produktname *</Label>
                <Input
                  id="name"
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  placeholder="z.B. Latte Macchiato"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategorie *</Label>
                <Select
                  value={editingItem.category}
                  onValueChange={(value) =>
                    setEditingItem({ ...editingItem, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ Neue Kategorie</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Preis (in Cent) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={editingItem.price}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="340"
                />
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Wird angezeigt als: {formatPrice(editingItem.price)}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Beschreibung</Label>
                <textarea
                  id="description"
                  value={editingItem.description || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  placeholder="Optional: Kurze Produktbeschreibung"
                  className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="active"
                    checked={editingItem.active}
                    onCheckedChange={(checked) =>
                      setEditingItem({ ...editingItem, active: checked as boolean })
                    }
                  />
                  <Label htmlFor="active" className="cursor-pointer">
                    Aktiv
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="stock"
                    checked={editingItem.stock}
                    onCheckedChange={(checked) =>
                      setEditingItem({ ...editingItem, stock: checked as boolean })
                    }
                  />
                  <Label htmlFor="stock" className="cursor-pointer">
                    Vorrätig
                  </Label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>
                  Abbrechen
                </Button>
                <Button className="flex-1" onClick={handleSaveItem}>
                  Speichern
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
