import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type Review = {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
};

type ProductReviewsSectionProps = {
  reviews: Review[];
};

const ProductReviewsSection = ({ reviews }: ProductReviewsSectionProps) => {
  return (
    <Card className="animate-fade-in">
      <CardContent className="p-8">
        <Tabs defaultValue="reviews">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="reviews">
              Отзывы ({reviews.length})
            </TabsTrigger>
            <TabsTrigger value="delivery">
              Доставка и оплата
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Пока нет отзывов. Будьте первым!
              </p>
            ) : (
              reviews.map(review => (
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
  );
};

export default ProductReviewsSection;
