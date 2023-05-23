
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Utilisateur } from '../utilisateur';
import { ProductsService } from '../products.service';
import { Product } from '../product.class';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
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


  //modification
  //selectedProduct: Product | null = null;

  //suppression

  selectedProduct: Product | undefined;



  //constructor
  constructor(private userService: UserService,
    private productService: ProductsService,
    private dialogService: DialogService) {

  }


  ngOnInit() {

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
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
                command: () => {
                  this.showUserTable = true; // Set the flag to show the table
                  this.showProductTable = false; // Set the flag to show the table
                },
              }
            ]
          }
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
            label: 'Delete',
            icon: PrimeIcons.TRASH,
            command: () => this.deleteSelectedProducts()
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
                command: () => {
                  this.showProductTable = true; // Set the flag to show the table
                  this.showUserTable = false;
                },
              }
            ]
          }
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
        icon: 'pi pi-fw pi-power-off'
      }
    ];


    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;

        console.log(users);
        this.showUserTable = true; // Set showUserTable to true after users are fetched

        console.log(this.showUserTable);

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
    console.log('Selected product:', this.selectedProduct); // Change property name to 'selectedProduct'
  }


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
    // Add save logic here
    //this.displayDialog = false; // Close the dialog
  }

  cancelEdit(): void {
    //this.displayDialog = false; // Close the dialog
  }

}