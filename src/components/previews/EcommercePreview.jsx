import React from 'react';
import { ShoppingCart, Star, Heart, Share } from 'lucide-react';
import { Card, Button, Badge } from '../ui';

export default function EcommercePreview({ palette, device = 'desktop' }) {
  const colors = palette || {};
  // Sophisticated, real-world e-commerce UI
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r" style={{
        background: `linear-gradient(to right, ${colors.primary || 'var(--color-primary)'}, ${colors.secondary || 'var(--color-secondary)'})`,
        color: colors.text || 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">TechStore</h2>
            <p className="text-white/90 text-sm md:text-base">Premium electronics and accessories</p>
          </div>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-dynamic-primary w-full md:w-auto">
            <ShoppingCart className="w-5 h-5" />
            <span>Cart (2)</span>
          </Button>
        </div>
      </div>
      <div
        className={
          device === 'mobile'
            ? 'grid grid-cols-1 gap-4'
            : device === 'tablet'
            ? 'grid grid-cols-2 gap-4'
            : 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8'
        }
      >
        {[{
          id: 1,
          name: 'Wireless Headphones',
          price: 299,
          originalPrice: 399,
          rating: 4.8,
          reviews: 124,
          image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=400&q=80',
          featured: true,
          inStock: true
        }, {
          id: 2,
          name: 'Smart Watch',
          price: 199,
          rating: 4.9,
          reviews: 89,
          image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80',
          featured: false,
          inStock: true
        }, {
          id: 3,
          name: 'Ultra-Wide Monitor',
          price: 449,
          rating: 4.7,
          reviews: 67,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
          featured: false,
          inStock: false
        }, {
          id: 4,
          name: 'Mechanical Keyboard',
          price: 129,
          rating: 4.6,
          reviews: 203,
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
          featured: false,
          inStock: true
        }].map(product => (
          <Card
            key={product.id}
            className={`relative group featured={product.featured} flex flex-col shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.03] ${
              device === 'mobile' ? 'p-2' : device === 'tablet' ? 'p-3' : 'p-3 sm:p-4 md:p-6'
            }`}
            style={{ minWidth: 0 }}
          >
            <div className="mb-3 flex justify-center">
              <div className="w-full flex justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`rounded-xl border-2`} style={{ borderColor: colors.primary || 'var(--color-primary)' , aspectRatio: '1 / 1', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.featured && <Badge variant="primary">Featured</Badge>}
              {!product.inStock && <Badge variant="error">Out of Stock</Badge>}
              {product.originalPrice && (
                <Badge variant="success">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</Badge>
              )}
            </div>
            <h3 className={`font-semibold mb-2 line-clamp-2`} style={{ color: colors.text || 'var(--color-text)' }}>{product.name}</h3>
            <div className={`flex items-center ${device === 'mobile' ? 'gap-0.5' : 'gap-1 sm:gap-2'} mb-2 sm:mb-3`}>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-sm text-dynamic-text-secondary">({product.reviews})</span>
            </div>
            <div className="mb-3">
              <div className={`flex items-center ${device === 'mobile' ? 'gap-0.5' : 'gap-1 sm:gap-2'}`}> 
                <span className="text-xl md:text-2xl font-bold" style={{ color: colors.primary || 'var(--color-primary)' }}>${product.price}</span>
                {product.originalPrice && (
                  <span className="text-base md:text-lg line-through" style={{ color: colors.textSecondary || 'var(--color-text-secondary)' }}>${product.originalPrice}</span>
                )}
              </div>
            </div>
            <div className="space-y-2 mt-auto">
              <Button
                variant="primary"
                className={`w-full ${device === 'mobile' ? 'text-xs py-1.5' : 'text-xs sm:text-sm py-2'}`}
                size="sm"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </Button>
              <div className={`flex ${device === 'mobile' ? 'gap-0.5' : 'gap-1 sm:gap-2'}`}>
                <Button variant="outline" size="sm" className={`flex-1 ${device === 'mobile' ? 'px-0' : 'px-0 sm:px-2'}`}>
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className={`flex-1 ${device === 'mobile' ? 'px-0' : 'px-0 sm:px-2'}`}>
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
