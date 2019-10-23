import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {openLoginForm} from "../page_objects/common";

  Given(/^As anonymous user I open GUCCI Portal$/, function () {openLoginForm()});