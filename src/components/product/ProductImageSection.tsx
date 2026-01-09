import { Badge } from '@/components/ui/badge';

type ProductImageSectionProps = {
  image: string;
  name: string;
  category: string;
};

const ProductImageSection = ({ image, name, category }: ProductImageSectionProps) => {
  return (
    <div className="animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-[600px] object-cover"
        />
        <Badge className="absolute top-4 left-4 bg-primary text-lg px-4 py-2">
          {category}
        </Badge>
      </div>
    </div>
  );
};

export default ProductImageSection;
