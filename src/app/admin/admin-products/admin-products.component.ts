import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
    products = [];
    filteredProducts = [];
    subscription: Subscription;

    constructor(private productService: ProductService) {
        this.subscription = this.productService.getAll()
            .subscribe(products => products.forEach(product => {
                this.products.push(product.payload.val());
            }));
        this.filteredProducts = this.products;
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
