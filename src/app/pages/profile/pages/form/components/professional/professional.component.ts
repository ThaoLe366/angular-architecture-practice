import { Component } from '@angular/core';


export interface ProfesstionalForm {
  about: string,
  roleId: string;
  role: RecruiterForm
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent {

}
