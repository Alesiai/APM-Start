import { style } from "@angular/animations";
import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.sevice";
import { Subscription } from "rxjs";

@Component({
templateUrl: './product-list-component.html',
styleUrls: ['./product-list.component.css'],

})

export class ProductCompnent implements OnInit, OnDestroy
{
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;

    showImage: boolean = false;

    errorMessage: string = '';
    sub!: Subscription; 

    private _listFilter: string = '';
    get listFilter():string 
    {
        return this._listFilter;
    }
    set listFilter(value: string)
    {
        this._listFilter = value;
        this.filteredProducts = this.perfomFilter(value);
    }
    
    filteredProducts: IProduct[] = [];

    products: IProduct[] = [];

    constructor(private productServise: ProductService){ }

    perfomFilter(filterBy: string): IProduct[]
    {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product:IProduct)=>product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void 
    {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void
    {
        this.sub = this.productServise.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            } ,
            error: err => this.errorMessage = err
        });
        
        
    }

    ngOnDestroy(): void{
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string) : void{
        this.pageTitle = 'Product List: ' + message;
    }
}

