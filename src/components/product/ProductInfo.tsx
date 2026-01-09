import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  fullDescription: string;
  sizes: string[];
  colors: string[];
  features: string[];
};

type ProductInfoProps = {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  isFavorite: boolean;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
};

const ProductInfo = ({
  product,
  selectedSize,
  selectedColor,
  isFavorite,
  onSizeChange,
  onColorChange,
  onToggleFavorite,
  onAddToCart
}: ProductInfoProps) => {
  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <h1 className="text-4xl font-heading font-bold mb-4">{product.name}</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Icon 
                key={i} 
                name="Star" 
                size={24} 
                className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-muted-foreground">
            {product.rating} ({product.reviews} отзывов)
          </span>
        </div>
        <p className="text-5xl font-heading font-bold text-primary mb-6">
          {product.price.toLocaleString()} ₽
        </p>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold text-lg mb-3">Описание</h3>
        <p className="text-muted-foreground leading-relaxed">{product.fullDescription}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">Размер</h3>
        <div className="flex gap-2">
          {product.sizes.map(size => (
            <Button
              key={size}
              variant={selectedSize === size ? 'default' : 'outline'}
              onClick={() => onSizeChange(size)}
              className="min-w-[60px]"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">Цвет</h3>
        <div className="flex gap-2">
          {product.colors.map(color => (
            <Button
              key={color}
              variant={selectedColor === color ? 'default' : 'outline'}
              onClick={() => onColorChange(color)}
            >
              {color}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">Особенности</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Icon name="Check" size={20} className="text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4">
        <Button 
          size="lg" 
          className="flex-1"
          onClick={onAddToCart}
        >
          <Icon name="ShoppingCart" size={20} className="mr-2" />
          Добавить в корзину
        </Button>
        <Button 
          size="lg" 
          variant={isFavorite ? 'default' : 'outline'}
          onClick={onToggleFavorite}
        >
          <Icon 
            name="Heart" 
            size={20} 
            className={isFavorite ? 'fill-current' : ''}
          />
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
