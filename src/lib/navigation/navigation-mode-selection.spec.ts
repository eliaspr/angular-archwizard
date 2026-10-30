import { Component, ViewChild } from '@angular/core';
import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { WizardComponent } from '../components/wizard.component';
import { BaseNavigationMode } from './base-navigation-mode.interface';
import {WizardStepComponent} from "../components/wizard-step.component";

class CustomNavigationMode extends BaseNavigationMode {
  public isNavigable(wizard: WizardComponent, destinationIndex: number): boolean {
    return true;
  }
}

@Component({
    selector: 'aw-test-wizard',
    template: `
    <aw-wizard>
      <aw-wizard-step stepTitle='Steptitle 1'>Step 1</aw-wizard-step>
      <aw-wizard-step stepTitle='Steptitle 2'>Step 2</aw-wizard-step>
      <aw-wizard-step stepTitle='Steptitle 3'>Step 3</aw-wizard-step>
    </aw-wizard>
  `,
    standalone: true,
  imports: [
    WizardComponent,
    WizardStepComponent
  ]
})
class WizardTestComponent {

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
}

@Component({
    selector: 'aw-wizard-with-custom-nav-mode',
    template: `
    <aw-wizard [awNavigationMode]="customNavigationMode">
      <aw-wizard-step stepTitle='Steptitle 1'>Step 1</aw-wizard-step>
      <aw-wizard-step stepTitle='Steptitle 2'>Step 2</aw-wizard-step>
      <aw-wizard-step stepTitle='Steptitle 3'>Step 3</aw-wizard-step>
    </aw-wizard>
  `,
    standalone: true,
  imports: [
    WizardStepComponent,
    WizardComponent
  ]
})
class WizardWithCustomNavigationModeComponent {

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;

  public customNavigationMode: CustomNavigationMode = new CustomNavigationMode();
}

describe('NavigationMode', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [WizardTestComponent, WizardWithCustomNavigationModeComponent]
}).compileComponents();
  }));

  it('can be created with an instance', fakeAsync(() => {
    const wizardTestFixture = TestBed.createComponent(WizardWithCustomNavigationModeComponent);
    wizardTestFixture.detectChanges();

    const wizard = wizardTestFixture.componentInstance.wizard;

    // wait a tick to ensure that the initialization has been completed
    tick();
    wizardTestFixture.detectChanges();

    expect(wizard.navigation).toEqual(jasmine.any(CustomNavigationMode));
  }));

  it('can be assigned with .navigation setter', fakeAsync(() => {
    const wizardTestFixture = TestBed.createComponent(WizardTestComponent);
    wizardTestFixture.detectChanges();

    const wizard = wizardTestFixture.componentInstance.wizard;

    // wait a tick to ensure that the initialization has been completed
    tick();
    wizardTestFixture.detectChanges();

    const navigationMode = new CustomNavigationMode();
    wizard.navigation = navigationMode;
    expect(wizard.navigation).toEqual(navigationMode);
  }));
});
