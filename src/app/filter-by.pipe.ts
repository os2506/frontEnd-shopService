import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../app/product.class';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
    transform(products: Product[], category: string): Product[] {
      if (!category || category === 'All') {
        return products;
      }
      return products.filter(product => product.category === category);
    }
  }
