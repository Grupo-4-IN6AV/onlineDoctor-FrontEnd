import { Pipe, PipeTransform } from '@angular/core';
import { PrescriptionDoctorComponent } from 'src/app/components/doctor/prescription-doctor/prescription-doctor.component';
import { TypeLaboratoryRestService } from 'src/app/services/typeLaboratoryRest/type-laboratory-rest.service';

@Pipe({
  name: 'searchLaboratoryPrescription'
})
export class SearchLaboratoryPrescriptionPipe implements PipeTransform {

  typeLaboratories: any;

  constructor
  (
    private typeLaboratoryRest: TypeLaboratoryRestService,
    private prescriptionComponent: PrescriptionDoctorComponent,
  ){ }

  transform(laboratories:any, search:any){
    if(search == undefined){
      return laboratories;
    }else{
      return laboratories.filter( (laboratory:any) =>
      {
        let params = {name:search}
        this.typeLaboratoryRest.getTypeLaboratoryName(params).subscribe({
          next: (res: any) =>
          {
            this.typeLaboratories = res.typeLaboratories;
            if(this.typeLaboratories.length === 0)
            {
              this.prescriptionComponent.notFound = true;
            }
            else if(this.typeLaboratories.length !== 0)
            {
              this.prescriptionComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return laboratory.typeLaboratory.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
