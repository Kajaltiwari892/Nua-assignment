import { useCartStore } from "@/lib/store";
import { Trash2, Minus, Plus } from "lucide-react";

export function CartDrawer() {
  const { items, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-4">
      {/* Items List */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-lg">Your cart is empty</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={`${item.id}-${item.color}-${item.size}`}
              className="flex gap-4 py-4 border-b border-border last:border-b-0"
            >
              {/* Image */}
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground line-clamp-1 mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  ${item.price.toFixed(2)}
                </p>
                <div className="text-xs text-muted-foreground">
                  {item.color && <div>Color: {item.color}</div>}
                  {item.size && <div>Size: {item.size}</div>}
                </div>
              </div>

              {/* Quantity & Price */}
              <div className="flex flex-col items-end gap-2">
                <span className="font-semibold text-foreground">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <div className="flex items-center gap-1 bg-muted rounded">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.color, item.size)}
                    className="p-1 hover:bg-background rounded"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                    className="p-1 hover:bg-background rounded"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id, item.color, item.size)}
                  className="text-muted-foreground hover:text-destructive transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {items.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold text-foreground">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-semibold text-foreground">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-semibold text-foreground">
              ${tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
