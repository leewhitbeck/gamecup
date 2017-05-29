import { AbstractControl } from "@angular/forms/src/model";
import { Observable } from "rxjs/Observable";

export const LOGIN_FORM_ERRORS = {
  'name': '',
  'email': '',
  'password': ''
};

export const VALIDATION_MESSAGES = {
  'name': {
    'required': 'Name is required.',
    'minlength': 'Name must be at least 4 characters long.',
    'maxlength': 'Name cannot be more than 24 characters long.',
    'forbiddenName': 'Someone named "Bob" cannot be a hero.'
  },
  'password': {
    'required': 'Password is required.',
    'minlength': 'Name must be at least 4 characters long.',
    'maxlength': 'Name cannot be more than 24 characters long.',
    'password': 'Password must be at least 6 characters long & have one special character',
  },
  'email': {
    'required': 'Email is required.',
    'email': 'Email is invalid. Please try again and ensure you entered a valid email address',
    'taken': 'We are sorry, but this email is already taken. '
  },
  'submit': ''
};


