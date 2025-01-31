import { Component, inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";


// @Component({
//   selector: '',
//   imports: [],
//   template: ''
// })
export class FormComponent {
    constructor() {
    }
    public fb = inject(FormBuilder);
    public form!: FormGroup;

    protected control(name: string): AbstractControl {
        return this.form.get(name)!;
    }
}