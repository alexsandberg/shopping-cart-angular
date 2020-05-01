import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
    products: Product[];
    filteredProducts = [];
    subscription: Subscription;

    constructor(private productService: ProductService) {
        this.subscription = this.productService.getAll()
            .subscribe(products => {
                this.filteredProducts = this.products = products.map(
                    product => {
                        return {
                            title: product.payload.val()['title'],
                            category: product.payload.val()['category'],
                            imageUrl: product.payload.val()['imageUrl'],
                            price: product.payload.val()['price'],
                            key: product.key
                        } as Product;
                    }
                );
            });
    }

    filter(query: string) {
        this.filteredProducts = (query) ?
            this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
            this.products;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnInit(): void {
    }

}
