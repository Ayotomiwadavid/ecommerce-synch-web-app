import type React from "react"
import { ShoppingBag, TrendingUp, Truck, Store, AlertCircle, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const stores = [
  { name: "Amazon", connected: true, orders: 532, revenue: 15234.56 },
  { name: "Etsy", connected: true, orders: 217, revenue: 5678.9 },
  { name: "eBay", connected: false, orders: 0, revenue: 0 },
]

const recentOrders = [
  { id: "1234", store: "Amazon", customer: "John Doe", total: 59.99, status: "Shipped" },
  { id: "1235", store: "Etsy", customer: "Jane Smith", total: 29.99, status: "Processing" },
  { id: "1236", store: "Amazon", customer: "Bob Johnson", total: 99.99, status: "Delivered" },
  { id: "1237", store: "Etsy", customer: "Alice Brown", total: 39.99, status: "Pending" },
]

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<ShoppingBag />} title="Total Orders" value="749" />
        <StatCard icon={<TrendingUp />} title="Total Revenue" value="$20,913.46" />
        <StatCard icon={<Truck />} title="Shipments" value="687" />
        <StatCard icon={<Store />} title="Active Stores" value="2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Connected Stores</h2>
          <div className="space-y-4">
            {stores.map((store) => (
              <StoreConnection key={store.name} store={store} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.store}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
        <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
          <BarChart2 className="w-12 h-12 text-gray-400" />
          <span className="ml-2 text-gray-500">Chart will be implemented here</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Alerts</h2>
        <div className="space-y-4">
          <Alert message="Low stock alert: 5 products are running low" />
          <Alert message="New feature available: Multi-channel inventory sync" />
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center">
    <div className="mr-4 text-blue-500">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{value}</h3>
      <p className="text-gray-500">{title}</p>
    </div>
  </div>
)

const StoreConnection = ({
  store,
}: { store: { name: string; connected: boolean; orders: number; revenue: number } }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center">
      <Store className="mr-2" />
      <span>{store.name}</span>
    </div>
    <div className="text-sm text-gray-500">
      {store.connected ? (
        <>
          <span className="mr-2">{store.orders} orders</span>
          <span>${store.revenue.toFixed(2)} revenue</span>
        </>
      ) : (
        <Button variant="outline" size="sm">
          Connect
        </Button>
      )}
    </div>
    <div
      className={`px-3 py-1 rounded-full text-sm ${store.connected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
    >
      {store.connected ? "Connected" : "Disconnected"}
    </div>
  </div>
)

const Alert = ({ message }: { message: string }) => (
  <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
    <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
    <span>{message}</span>
  </div>
)

export default Dashboard

