import React from 'react';
import { CategoryType } from '../../types';
import { Utensils, ShoppingCart, Carrot, Beef, Shirt, Smartphone, Package } from 'lucide-react';

interface CategoryBadgeProps {
  category: CategoryType;
  showIconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, showIconOnly = false, size = 'md' }) => {
  const getCategoryConfig = (cat: CategoryType) => {
    switch (cat) {
      case 'FOOD':
        return {
          label: 'FOOD',
          icon: Utensils,
          bgColor: 'bg-amber-500/15',
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/30',
        };
      case 'GROCERY':
        return {
          label: 'GROCERY',
          icon: ShoppingCart,
          bgColor: 'bg-emerald-500/15',
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/30',
        };
      case 'VEGETABLES':
        return {
          label: 'FRUITS & VEG',
          icon: Carrot,
          bgColor: 'bg-green-500/15',
          textColor: 'text-green-400',
          borderColor: 'border-green-500/30',
        };
      case 'MEAT':
        return {
          label: 'FRESH MEAT',
          icon: Beef,
          bgColor: 'bg-red-500/15',
          textColor: 'text-red-400',
          borderColor: 'border-red-500/30',
        };
      case 'FASHION':
        return {
          label: 'FASHION',
          icon: Shirt,
          bgColor: 'bg-purple-500/15',
          textColor: 'text-purple-400',
          borderColor: 'border-purple-500/30',
        };
      case 'ELECTRONICS':
        return {
          label: 'ELECTRONICS',
          icon: Smartphone,
          bgColor: 'bg-blue-500/15',
          textColor: 'text-blue-400',
          borderColor: 'border-blue-500/30',
        };
      case 'HYPERLOCAL':
      default:
        return {
          label: 'HYPERLOCAL',
          icon: Package,
          bgColor: 'bg-cyan-500/15',
          textColor: 'text-cyan-400',
          borderColor: 'border-cyan-500/30',
        };
    }
  };

  const config = getCategoryConfig(category);
  const Icon = config.icon;

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  if (showIconOnly) {
    return (
      <div className={`p-2 rounded-lg border ${config.bgColor} ${config.textColor} ${config.borderColor} flex items-center justify-center`}>
        <Icon size={iconSizes[size]} />
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
      <Icon size={iconSizes[size]} />
      <span>{config.label}</span>
    </span>
  );
};
