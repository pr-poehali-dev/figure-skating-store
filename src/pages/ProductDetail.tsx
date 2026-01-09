import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type Review = {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
};

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

const products: Product[] = [
  {
    id: 1,
    name: 'Платье "Кристалл"',
    price: 25000,
    image: 'https://cdn.poehali.dev/projects/ae59187c-cd51-447e-b9d3-ed32e3509b20/files/77bfdf33-7e04-4e7e-8edc-3ed3ec905d47.jpg',
    category: 'Платья',
    rating: 5,
    reviews: 12,
    description: 'Элегантное платье с кристаллами Swarovski для выступлений',
    fullDescription: 'Профессиональное платье для фигурного катания, украшенное кристаллами Swarovski. Изготовлено из высококачественного эластичного материала, обеспечивающего максимальную свободу движений. Идеально подходит для соревнований высокого уровня.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Синий', 'Фиолетовый', 'Белый'],
    features: [
      'Кристаллы Swarovski',
      'Эластичная ткань премиум класса',
      'Ручная работа',
      'Подкладка из дышащего материала',
      'Усиленные швы'
    ]
  },
  {
    id: 2,
    name: 'Термобельё Pro',
    price: 4500,
    image: 'https://cdn.poehali.dev/projects/ae59187c-cd51-447e-b9d3-ed32e3509b20/files/a3374cf7-0918-4e98-b86f-5b048f78735c.jpg',
    category: 'Термобельё',
    rating: 4,
    reviews: 8,
    description: 'Компрессионное термобельё для тренировок',
    fullDescription: 'Профессиональное компрессионное термобельё для фигуристов. Обеспечивает оптимальную терморегуляцию и поддержку мышц во время тренировок.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Чёрный', 'Тёмно-синий'],
    features: [
      'Компрессионный эффект',
      'Влагоотводящий материал',
      'Антибактериальная обработка',
      'Плоские швы',
      'UV защита'
    ]
  },
  {
    id: 3,
    name: 'Набор аксессуаров',
    price: 2800,
    image: 'https://cdn.poehali.dev/projects/ae59187c-cd51-447e-b9d3-ed32e3509b20/files/db368308-66c4-495a-a8f5-f40475e07673.jpg',
    category: 'Аксессуары',
    rating: 5,
    reviews: 15,
    description: 'Чехлы для лезвий и перчатки для фигурного катания',
    fullDescription: 'Полный набор аксессуаров для фигуриста: защитные чехлы для лезвий из неопрена и удобные перчатки с антискользящим покрытием.',
    sizes: ['Универсальный'],
    colors: ['Оранжевый', 'Синий', 'Розовый'],
    features: [
      'Чехлы из неопрена',
      'Перчатки с антискользящим покрытием',
      'Защита от влаги',
      'Удобная посадка',
      'Яркие цвета'
    ]
  },
  {
    id: 4,
    name: 'Костюм "Энергия"',
    price: 32000,
    image: 'https://cdn.poehali.dev/projects/ae59187c-cd51-447e-b9d3-ed32e3509b20/files/77bfdf33-7e04-4e7e-8edc-3ed3ec905d47.jpg',
    category: 'Костюмы',
    rating: 5,
    reviews: 20,
    description: 'Профессиональный костюм для соревнований',
    fullDescription: 'Эксклюзивный костюм для профессиональных соревнований. Разработан совместно с ведущими фигуристами и учитывает все требования международных федераций.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Красный', 'Синий', 'Чёрный'],
    features: [
      'Эксклюзивный дизайн',
      'Стразы премиум класса',
      'Максимальная эластичность',
      'Соответствие правилам ISU',
      'Индивидуальный пошив'
    ]
  },
  {
    id: 5,
    name: 'Защита колен Premium',
    price: 3200,
    image: 'https://cdn.poehali.dev/projects/ae59187c-cd51-447e-b9d3-ed32e3509b20/files/a3374cf7-0918-4e98-b86f-5b048f78735c.jpg',
    category: 'Защита',
    rating: 4,
    reviews: 10,
    description: 'Надёжная защита для тренировок',
    fullDescription: 'Профессиональная защита колен с усиленными вставками. Разработана специально для фигуристов, учитывает особенности нагрузок на лёд.',
    sizes: ['S', 'M', 'L'],
    colors: ['Чёрный'],
    features: [
      'Усиленные защитные вставки',
      'Эргономичная форма',
      'Дышащий материал',
      'Не сковывает движения',
      'Регулируемые ремни'
    ]
  },
  {
    id: 6,
    name: 'Платье "Лебедь"',
    price: 28000,
    image: 'https://cdn.poehali.dev/projects/ae59187c-cd51-447e-b9d3-ed32e3509b20/files/77bfdf33-7e04-4e7e-8edc-3ed3ec905d47.jpg',
    category: 'Платья',
    rating: 5,
    reviews: 18,
    description: 'Изящное платье с перьями для элегантных номеров',
    fullDescription: 'Эффектное платье с декором из натуральных перьев. Создаёт невероятно красивый образ на льду и подчёркивает грациозность каждого движения.',
    sizes: ['XS', 'S', 'M'],
    colors: ['Белый', 'Жемчужный'],
    features: [
      'Декор из натуральных перьев',
      'Многослойная юбка',
      'Ручная вышивка',
      'Лёгкий вес',
      'Элегантный силуэт'
    ]
  },
];

const reviewsData: { [key: number]: Review[] } = {
  1: [
    {
      id: 1,
      author: 'Анна Петрова',
      rating: 5,
      date: '15.12.2024',
      text: 'Потрясающее платье! Кристаллы переливаются на свету, качество пошива на высшем уровне. Дочка выступала на соревнованиях - все в восторге!',
      verified: true
    },
    {
      id: 2,
      author: 'Мария Сидорова',
      rating: 5,
      date: '10.12.2024',
      text: 'Идеальная посадка, очень удобное. Материал хорошо тянется, не сковывает движения. Рекомендую!',
      verified: true
    },
    {
      id: 3,
      author: 'Елена Иванова',
      rating: 4,
      date: '05.12.2024',
      text: 'Красивое платье, но доставка заняла больше времени, чем ожидалось. В остальном всё отлично!',
      verified: false
    }
  ],
  2: [
    {
      id: 4,
      author: 'Дмитрий Козлов',
      rating: 4,
      date: '18.12.2024',
      text: 'Хорошее термобельё для тренировок. Не жарко и не холодно, отлично отводит влагу.',
      verified: true
    },
    {
      id: 5,
      author: 'Олег Смирнов',
      rating: 4,
      date: '12.12.2024',
      text: 'Качественный материал, удобное. Единственный минус - немного маломерит.',
      verified: true
    }
  ],
  3: [
    {
      id: 6,
      author: 'Светлана Морозова',
      rating: 5,
      date: '20.12.2024',
      text: 'Отличный набор! Чехлы плотные, перчатки удобные. Всё что нужно для тренировок.',
      verified: true
    }
  ]
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get('id') || '1');
  
  const product = products.find(p => p.id === productId) || products[0];
  const productReviews = reviewsData[productId] || [];
  
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    alert(`Товар "${product.name}" добавлен в корзину!\nРазмер: ${selectedSize}\nЦвет: ${selectedColor}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад к каталогу
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-2xl">⛸️</span>
              </div>
              <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FigureShop
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="ShoppingCart" size={24} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={24} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-[600px] object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-primary text-lg px-4 py-2">
                {product.category}
              </Badge>
            </div>
          </div>

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
                    onClick={() => setSelectedSize(size)}
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
                    onClick={() => setSelectedColor(color)}
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
                onClick={handleAddToCart}
              >
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Добавить в корзину
              </Button>
              <Button 
                size="lg" 
                variant={isFavorite ? 'default' : 'outline'}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Icon 
                  name="Heart" 
                  size={20} 
                  className={isFavorite ? 'fill-current' : ''}
                />
              </Button>
            </div>
          </div>
        </div>

        <Card className="animate-fade-in">
          <CardContent className="p-8">
            <Tabs defaultValue="reviews">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="reviews">
                  Отзывы ({productReviews.length})
                </TabsTrigger>
                <TabsTrigger value="delivery">
                  Доставка и оплата
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reviews" className="space-y-6">
                {productReviews.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Пока нет отзывов. Будьте первым!
                  </p>
                ) : (
                  productReviews.map(review => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {review.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.author}</h4>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                            {review.verified && (
                              <Badge variant="secondary" className="gap-1">
                                <Icon name="CheckCircle" size={14} />
                                Проверенная покупка
                              </Badge>
                            )}
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Icon 
                                key={i} 
                                name="Star" 
                                size={16} 
                                className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="delivery" className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Icon name="Truck" size={24} className="text-primary" />
                    Доставка
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Доставка по Москве — 1-2 дня (бесплатно от 5000 ₽)</li>
                    <li>• Доставка по России — 3-7 дней (от 500 ₽)</li>
                    <li>• Самовывоз из магазина — бесплатно</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Icon name="CreditCard" size={24} className="text-primary" />
                    Оплата
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Банковская карта онлайн</li>
                    <li>• Наличными курьеру</li>
                    <li>• Банковский перевод</li>
                    <li>• Рассрочка от банков-партнёров</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

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

export default ProductDetail;
