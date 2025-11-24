'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// MOCKUP DATA - In Production von API laden via /api/merchant/orders
const MOCKUP_ORDERS = [
  {
    id: 'ord-001',
    code: '384917',
    customer: 'Max Mustermann',
    time: '12:18',
    items: ['2x Latte Macchiato', '1x Croissant'],
    total: 1360,
    status: 'paid',
    notes: 'Extra heiß bitte',
  },
  {
    id: 'ord-002',
    code: '742891',
    customer: 'Anna Schmidt',
    time: '12:25',
    items: ['1x Cappuccino', '2x Brötchen'],
    total: 890,
    status: 'paid',
  },
  {
    id: 'ord-003',
    code: '159753',
    customer: 'Peter König',
    time: '12:30',
    items: ['1x Americano', '1x Cheesecake'],
    total: 1450,
    status: 'preparing',
  },
  {
    id: 'ord-004',
    code: '628374',
    customer: 'Lisa Müller',
    time: '12:35',
    items: ['3x Espresso'],
    total: 750,
    status: 'preparing',
  },
  {
    id: 'ord-005',
    code: '951753',
    customer: 'Tom Weber',
    time: '12:40',
    items: ['1x Flat White', '1x Muffin'],
    total: 980,
    status: 'ready',
  },
];

interface Order {
  id: string;
  code: string;
  customer: string;
  time: string;
  items: string[];
  total: number;
  status: string;
  notes?: string;
}

function OrderCard({ order, isOverlay = false }: { order: Order; isOverlay?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  };

  const cardContent = (
    <Card className="p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {order.code}
            </span>
            <Badge variant="outline" className="text-xs">
              {order.time}
            </Badge>
          </div>
          <p className="font-semibold">{order.customer}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">{formatPrice(order.total)}</p>
        </div>
      </div>

      <div className="space-y-1 mb-3">
        {order.items.map((item, i) => (
          <p key={i} className="text-sm text-neutral-600 dark:text-neutral-400">
            • {item}
          </p>
        ))}
      </div>

      {order.notes && (
        <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs text-yellow-900 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-800">
          📝 {order.notes}
        </div>
      )}
    </Card>
  );

  if (isOverlay) {
    return cardContent;
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {cardContent}
    </div>
  );
}

export default function MerchantOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(MOCKUP_ORDERS);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // In Production: Update via API /api/merchant/orders/[id]/status
      console.log(`Move order ${active.id} to column ${over.id}`);
    }

    setActiveId(null);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    // MOCKUP: In Production API call
    // await fetch(`/api/merchant/orders/${orderId}/status`, {
    //   method: 'POST',
    //   body: JSON.stringify({ status: newStatus }),
    // });
  };

  const columns = [
    { id: 'paid', title: 'Neu', icon: '📝', color: 'bg-blue-100 dark:bg-blue-900/30', textColor: 'text-blue-600 dark:text-blue-400' },
    { id: 'preparing', title: 'In Vorbereitung', icon: '👨‍🍳', color: 'bg-orange-100 dark:bg-orange-900/30', textColor: 'text-orange-600 dark:text-orange-400' },
    { id: 'ready', title: 'Bereit', icon: '✅', color: 'bg-green-100 dark:bg-green-900/30', textColor: 'text-green-600 dark:text-green-400' },
    { id: 'picked_up', title: 'Abgeholt', icon: '✨', color: 'bg-neutral-100 dark:bg-neutral-800', textColor: 'text-neutral-600 dark:text-neutral-400' },
  ];

  const getOrdersByStatus = (status: string) => {
    return orders.filter((o) => o.status === status);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1920px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                <h1 className="text-lg font-bold">Live Orders Board</h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {orders.length} Bestellungen • Heute
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Auto-Refresh
              </Button>
              <Button size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Sound: AN
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-4 py-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {columns.map((column) => {
              const columnOrders = getOrdersByStatus(column.id);
              return (
                <div key={column.id} className="space-y-3">
                  {/* Column Header */}
                  <div className={`p-4 rounded-lg ${column.color}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{column.icon}</span>
                        <h3 className={`font-bold ${column.textColor}`}>
                          {column.title}
                        </h3>
                      </div>
                      <Badge variant="secondary">
                        {columnOrders.length}
                      </Badge>
                    </div>
                  </div>

                  {/* Orders */}
                  <SortableContext
                    items={columnOrders.map(o => o.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3 min-h-[400px]">
                      {columnOrders.length === 0 ? (
                        <div className="p-8 text-center text-neutral-400 dark:text-neutral-600">
                          <p className="text-4xl mb-2">📭</p>
                          <p className="text-sm">Keine Bestellungen</p>
                        </div>
                      ) : (
                        columnOrders.map((order) => (
                          <div key={order.id}>
                            <OrderCard order={order} />
                            {/* Quick Action Buttons */}
                            <div className="flex gap-2 mt-2">
                              {column.id === 'paid' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() => updateOrderStatus(order.id, 'preparing')}
                                >
                                  Start 👨‍🍳
                                </Button>
                              )}
                              {column.id === 'preparing' && (
                                <Button
                                  size="sm"
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                  onClick={() => updateOrderStatus(order.id, 'ready')}
                                >
                                  Fertig ✅
                                </Button>
                              )}
                              {column.id === 'ready' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() => updateOrderStatus(order.id, 'picked_up')}
                                >
                                  Abgeholt ✨
                                </Button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </SortableContext>
                </div>
              );
            })}
          </div>

          <DragOverlay>
            {activeId ? (
              <OrderCard
                order={orders.find((o) => o.id === activeId)!}
                isOverlay
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
}
