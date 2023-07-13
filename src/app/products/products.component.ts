import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  

  constructor(private ProductService:ProductService, 
              private router : Router,
              public appState : AppStateService){

  }
  ngOnInit() {
    this.searchProducts();
  }
  
  searchProducts(){
    this.ProductService.searchProducts(this.appState.productsState.keyword,
      this.appState.productsState.currentPage, 
      this.appState.productsState.pageSize)
    .subscribe({
      next : (resp) => {
        let products = resp.body as Product[];
        let totalProducts:number = parseInt(resp.headers.get('x-total-count')!);
        let size = this.appState.productsState.pageSize;
        let totalPages = Math.floor(totalProducts / size);
        if(totalProducts % size !=0){
          ++totalPages;
        }
        this.appState.setProductState({
          products : products,
          totalProducts : totalProducts,
          totalPages : totalPages,
          status : "LOADED"
        })
      },  
      error : err =>{
        this.appState.productsState({
          status : "ERROR",
          errorMessage : err
        })
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
        let products = this.appState.productsState.products.filter((p:any)=>p.id!==product.id);
        if(products.length==0 ){
          --this.appState.productsState.currentPage;
          if(this.appState.productsState.currentPage==0){
            this.appState.productsState.currentPage=1;
          }
          this.searchProducts()
        } else{
          let totalCount=this.appState.productsState.totalPages-1;
        }
      }
    })
  }

  handleEditProduct(product: Product){
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
  

  handleGotoPage(page:number){
    this.appState.productsState.currentPage = page;
    this.searchProducts();
  }

}
