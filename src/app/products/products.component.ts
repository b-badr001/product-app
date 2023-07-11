import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  public products :Array<Product> = [] ;
  public keyword : string = "";

  constructor(private ProductService:ProductService){

  }
  ngOnInit() {
    this.getProducts();
  }
  
  getProducts(){
    this.ProductService.getProducts()
    .subscribe({
      next : data => {
        this.products=data
      },
      error : err =>{
        console.log(err)
      }
    })
    //this.products$ = this.ProductService.getProducts();
  }

  handleCheckProduct(product:Product){
    this.ProductService.checkProducts(product).subscribe({
      next :updatedProduct => {
        product.checked=!product.checked;
        //this.getProducts();
      }
    })
    
  }

  handleDeleteProduct(product:Product){
    if(confirm("Etes vous sure?"))
    this.ProductService.deleteProduct(product).subscribe({
      next:value => {
        //this.getProducts();
        this.products = this.products.filter(p=>p.id!=product.id);
      }
    })
  }

  searchProducts(){
    this.ProductService.searchProducts(this.keyword).subscribe({
      next : value => {
        this.products = value;
      }
    });
  }
}
