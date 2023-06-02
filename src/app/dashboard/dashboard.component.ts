
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Utilisateur } from '../utilisateur';
import { ProductsService } from '../products.service';
import { Product } from '../product.class';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsernameService } from '../username.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  items: MenuItem[] = [];
  users: Utilisateur[] = [];
  products: Product[] = [];
  showUserTable = false; // Flag to control the visibility of the table
  cols: any[] = []; // Define the cols property as an array of any type
  showProductTable = false;
  displayDialog = false; // Flag to control the visibility of the dialog
  deleteMenuItems: MenuItem[] = []; // Define the delete menu items
  @ViewChild('rolesTemplate', { static: true })
  rolesTemplate!: TemplateRef<any>; // Declare the template reference variable
  @ViewChild('productEdit', { static: false }) // Add this line to get a reference to the ProductEditComponent
  productEdit!: ProductEditComponent;
  username!: string;
  isLoggedIn: boolean = false;

  openCreateForm = false; // flag to control the visi of the dialog create form product 

  //modification
  //selectedProduct: Product | null = null;

  //suppression
  selectedProduct: Product | undefined;



  //constructor
  constructor(private userService: UserService,
    private productService: ProductsService,
    private dialogService: DialogService,
    private usernameService: UsernameService,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog) {}


  ngOnInit() {

    // this.usernameService.getUsername().subscribe((username: string) => {
    //   this.username = username;
    // });

    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log(isLoggedIn); //true
      const storedUserData = localStorage.getItem('user');
      console.log('Const Stored User Data:', storedUserData);

      try {

        if (storedUserData) {
          this.username = storedUserData;
          this.isLoggedIn = true;
          console.log('Username:', this.username);
        }else{
          console.log('Usernam Not FOUND on the storage');
        }

      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    });

    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus'
          },
          {
            icon: 'pi pi-fw pi-bars',
            label: 'List',
            command: () => {
              this.showUserTable = true; // Set the flag to show the table
              this.showProductTable = false; // Set the flag to show the table
            },
          },
        ]
      },
      {
        label: 'Products',
        icon: 'pi pi-fw pi-database',
        items: [
          {
            label: 'New',
            icon: PrimeIcons.PLUS,
          },
          {
            icon: 'pi pi-fw pi-bars',
            label: 'List',
            command: () => {
              this.showProductTable = true; // Set the flag to show the table
              this.showUserTable = false;
            },
          },
        ]
      },
      {
        label: 'Orders',
        icon: 'pi pi-fw pi-wallet'
      },
      {
        label: 'Bills',
        icon: 'pi pi-fw pi-money-bill'
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logOut()
      }
    ];


    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.showUserTable = true; // Set showUserTable to true after users are fetched
        this.cols = [
          // Define your column configuration here
          { field: 'username', header: 'Username' },
          { field: 'email', header: 'Email' },
          { field: 'city', header: 'City' },
          { field: 'state', header: 'State' },
          { field: 'postalCode', header: 'PostalCode' },
          { field: 'subscribe', header: 'Subscribe' },
          { field: 'roles', header: 'Roles', bodyTemplate: this.rolesTemplate }
        ];
      },
      (error) => {
        console.log('Error fetching users:', error);
      }
    );


    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.log('Error fetching products:', error);
      }
    );

    this.deleteMenuItems = [
      {
        label: 'Delete Selected',
        icon: 'pi pi-trash',
        command: () => this.deleteSelectedProducts()
      }
    ];

  }

  getSeverity(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'unknown';
    }
  }

  getRoleNames(roles: any[]): string {
    return roles.map(role => role.roleName).join(', ');
  }


  // selectProduct(product: Product) {
  //    this.selectedProduct = product;
  //  }

  onRowSelect(event: any) {
    this.selectedProduct = event.data; // Change property name to 'selectedProduct'
  }



  deleteSelectedProducts() {
    console.log('Selected product:', this.selectedProduct);
    //this.productService.delete(this.selectedProduct?.id);
  }

  // parcourir la liste des ids et supprimer un par un en fonction de lindex.
  /*
  public onDeleteProduct(ids: number[]): void {
    ids.forEach((id) => {
      this.deleteSelectedProducts(id);
      this.loadData();
    });
  }
  */


  onSaveChanges() {
    console.log("Enregistrement")
  }
  onCancelEdit() {
    console.log("Annulation")
  }

  openProductEditPopup(product: Product): void {
    this.selectedProduct = { ...product }; // Create a copy of the product
    this.displayDialog = true;
  }

  saveProduct(): void {
  }

  cancelEdit(): void {
  }



  openDialogCreateProduit() {
    console.log('creation produit');
    const dialogRef = this.dialog.open(ProductCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.openCreateForm = true;
  }


  logOut() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/products']);
  }
}