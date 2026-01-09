import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
};

const products: Product[] = [
  {
    id: 1,
    name: 'Платье "Кристалл"',
    price: 25000,
    image: 'https://cdn.poehali.dev/projects/ae59187c-cd51-447e-b9d3-ed32e3509b20/files/77bfdf33-7e04-4e7e-8edc-3ed3ec905d47.jpg',
    category: 'Платья',
    rating: 5,
    reviews: 12,
    description: 'Элегантное платье с кристаллами Swarovski для выступлений'
  },
  {
    id: 2,
    name: 'Термобельё Pro',
    price: 4500,
    image: 'https://cdn.poehali.dev/projects/ae59187c-cd51-447e-b9d3-ed32e3509b20/files/a3374cf7-0918-4e98-b86f-5b048f78735c.jpg',
    category: 'Термобельё',
    rating: 4,
    reviews: 8,
    description: 'Компрессионное термобельё для тренировок'
  },
  {
    id: 3,
    name: 'Набор аксессуаров',
    price: 2800,
    image: 'https://cdn.poehali.dev/projects/ae59187c-cd51-447e-b9d3-ed32e3509b20/files/db368308-66c4-495a-a8f5-f40475e07673.jpg',
    category: 'Аксессуары',
    rating: 5,
    reviews: 15,
    description: 'Чехлы для лезвий и перчатки для фигурного катания'
  },
  {
    id: 4,
    name: 'Костюм "Энергия"',
    price: 32000,
    image: 'https://cdn.poehali.dev/projects/ae59187c-cd51-447e-b9d3-ed32e3509b20/files/77bfdf33-7e04-4e7e-8edc-3ed3ec905d47.jpg',
    category: 'Костюмы',
    rating: 5,
    reviews: 20,
    description: 'Профессиональный костюм для соревнований'
  },
  {
    id: 5,
    name: 'Защита колен Premium',
    price: 3200,
    image: 'https://cdn.poehali.dev/projects/ae59187c-cd51-447e-b9d3-ed32e3509b20/files/a3374cf7-0918-4e98-b86f-5b048f78735c.jpg',
    category: 'Защита',
    rating: 4,
    reviews: 10,
    description: 'Надёжная защита для тренировок'
  },
  {
    id: 6,
    name: 'Платье "Лебедь"',
    price: 28000,
    image: 'https://cdn.poehali.dev/projects/ae59187c-cd51-447e-b9d3-ed32e3509b20/files/77bfdf33-7e04-4e7e-8edc-3ed3ec905d47.jpg',
    category: 'Платья',
    rating: 5,
    reviews: 18,
    description: 'Изящное платье с перьями для элегантных номеров'
  },
];

const categories = ['Все', 'Костюмы', 'Платья', 'Термобельё', 'Аксессуары', 'Защита'];

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-2xl">⛸️</span>
              </div>
              <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FigureShop
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="Heart" size={24} />
                    {favorites.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent">
                        {favorites.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Избранное</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {favorites.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Избранных товаров пока нет</p>
                    ) : (
                      favorites.map(id => {
                        const product = products.find(p => p.id === id);
                        if (!product) return null;
                        return (
                          <Card key={id}>
                            <CardContent className="p-4 flex gap-3">
                              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{product.name}</h4>
                                <p className="text-primary font-bold">{product.price.toLocaleString()} ₽</p>
                              </div>
                              <Button size="icon" variant="ghost" onClick={() => toggleFavorite(id)}>
                                <Icon name="X" size={16} />
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={24} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map((item, index) => (
                          <Card key={index}>
                            <CardContent className="p-4 flex gap-3">
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{item.name}</h4>
                                <p className="text-primary font-bold">{item.price.toLocaleString()} ₽</p>
                              </div>
                              <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.id)}>
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                        <div className="border-t pt-4 space-y-4">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Итого:</span>
                            <span className="text-primary">{totalPrice.toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Button variant="ghost" size="icon">
                <Icon name="User" size={24} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-primary via-accent to-secondary text-white py-20 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-heading font-bold mb-4">Всё для фигурного катания</h2>
          <p className="text-xl mb-8 opacity-90">Профессиональная экипировка для побед на льду</p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold">
            Смотреть каталог
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat} className="font-semibold">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/product?id=${product.id}`)}
              >
                <CardHeader className="p-0 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >
                    <Icon 
                      name="Heart" 
                      size={20} 
                      className={favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}
                    />
                  </Button>
                  <Badge className="absolute top-3 left-3 bg-primary">
                    {product.category}
                  </Badge>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2 font-heading">{product.name}</CardTitle>
                  <CardDescription className="mb-4">{product.description}</CardDescription>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={16} 
                          className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary font-heading">
                      {product.price.toLocaleString()} ₽
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Tabs>
      </section>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading font-bold text-xl mb-4">FigureShop</h3>
              <p className="text-gray-400">Всё для фигурного катания</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Костюмы</li>
                <li>Платья</li>
                <li>Термобельё</li>
                <li>Аксессуары</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Помощь</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Доставка</li>
                <li>Оплата</li>
                <li>Возврат</li>
                <li>Поддержка</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (999) 123-45-67</li>
                <li>info@figureshop.ru</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;