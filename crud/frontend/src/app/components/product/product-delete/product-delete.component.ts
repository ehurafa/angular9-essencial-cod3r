import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(
    private producService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.producService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  deleteProduct() {
    this.producService.delete(this.product.id).subscribe(() => {
      this.producService.showMessage('Produto excluído com sucesso!');
      this.router.navigate(['/products']);
    });
  }

  cancel() {
    this.router.navigate(['/products']);
  }

}
