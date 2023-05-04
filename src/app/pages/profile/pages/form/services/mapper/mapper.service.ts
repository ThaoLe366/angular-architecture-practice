import {Injectable} from "@angular/core";
import {User} from "@app/models/backend";
import {ProfileForm} from "@app/pages/profile/pages/form/form.component";
import {EmployeeForm} from "@app/pages/profile/pages/form/components/professional/roles/employee/employee.component";
import {RecruiterForm} from "@app/pages/profile/pages/form/components/professional/roles/recruiter/recruiter.component";
import {Employee, Recruiter} from "@app/models/backend/user/roles";
import {Dictionaries} from "@app/store/dictionaries";
import {USerCreateRequest} from "@app/store/user";


@Injectable()
export class MapperService {
  constructor() {
  }
  userToForm(user: User): ProfileForm {
    return {
      personal: {
        name: user ? user.name : null,
        country: user ? user.country : null,
        photoURL: user ? user.photoURL : null,
      },
      professional: {
        about: user ? user.about : null,
        roleId: user ? user.roleId : null,
        role: user ? this.getFormRole(user) : null,
      }
    }
  }

  // @ts-ignore
  private getFormRole(user: User): EmployeeForm | RecruiterForm {
    if (user.roleId === 'employee') {
      const role = user.role as Employee;
      const formRole: EmployeeForm = {
        expectedSalary: role.expectedSalary,
        specialization: role.specialization.id,
        qualification: role.qualification.id,
        skills: role.skills.map(x => x.id),
        experiences: role.experiences
      }
      return formRole;
    }
    if (user.roleId === 'recruiter') {
      const role = user.role as Recruiter;
      const formRole: RecruiterForm = {
        companyName: role.companyName,
        employeesCount: role.employeesCount,
      };
      return formRole;
    }
  }

  formToUserCreate(form: ProfileForm, dictionaries: Dictionaries): USerCreateRequest {
    return {
      name: form.personal.name,
      photoURL: form.personal.photoURL,
      roleId: form.professional.roleId,
      country: form.personal.country,
      about: form.professional.about,
      role: this.getRole(form, dictionaries)
    }
  }
  formToUserUpdate(form: ProfileForm, user: User, dictionaries: Dictionaries): User {
    return {
      uid: user.uid,
      email: user.email,
      created: user.created,
      name: form.personal.name,
      photoURL: form.personal.photoURL,
      roleId: form.professional.roleId,
      country: form.personal.country,
      about: form.professional.about,
      role: this.getRole(form, dictionaries)
    };

  }
  //@ts-ignore
  private getRole(form: ProfileForm, dictionaries: Dictionaries): Employee | Recruiter {
    if (form.professional.roleId === 'employee') {
      const formRole = form.professional.role as EmployeeForm;
      const role: Employee = {
        expectedSalary: formRole.expectedSalary,
        specialization: dictionaries.specializations.items.find(x => x.id === formRole.specialization),
        qualification: dictionaries.qualifications.items.find(x => x.id === formRole.qualification),
        skills: formRole.skills.map(id => dictionaries.skills.items.find(x => x.id === id)),
        experiences: formRole.experiences
      };
      return role;
    }

    if (form.professional.roleId === 'recruiter') {
      const formRole = form.professional.role as RecruiterForm;
      const role: Recruiter = {
        companyName: formRole.companyName,
        employeesCount: formRole.employeesCount,
      }
      return role;
    }
  }

}
