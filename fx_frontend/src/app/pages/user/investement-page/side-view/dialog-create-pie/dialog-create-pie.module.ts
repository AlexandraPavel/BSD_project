import { NgModule } from '@angular/core'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule  } from "@angular/forms";
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { CreatePieListItemComponent } from './create-pie-list-item/create-pie-list-item.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({ 
//   declarations: [ExampleDialogComponent], 
//   entryComponents: [ExampleDialogComponent], 
  imports: [ 
    
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatSelectModule,
    
    MatButtonModule, 
    // MatCommonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSliderModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    
  ], declarations: [ ], 
}) 
export class DialogCreatePieModule {} 